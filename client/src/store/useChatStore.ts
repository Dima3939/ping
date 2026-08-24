import { create } from 'zustand';
import { Workspace, Channel, User, Message, Attachment } from '../types';
import {
  CURRENT_USER,
  MOCK_USERS,
  MOCK_WORKSPACES,
  INITIAL_MESSAGES,
  INITIAL_THREADS,
} from '../data/mockData';
import { generateUUID } from '../lib/utils';
import { soundFX } from '../hooks/useSoundEffects';

export interface ActiveCallState {
  isActive: boolean;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  isChannelHuddle: boolean;
  duration: number;
  isMicMuted: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
}

interface ChatStore {
  // Theme & Settings
  isDarkMode: boolean;
  isMuted: boolean;
  toggleDarkMode: () => void;
  toggleMute: () => void;

  // Workspaces & Channels
  workspaces: Workspace[];
  activeWorkspaceId: string;
  activeChannelId: string;
  setActiveWorkspace: (id: string) => void;
  setActiveChannel: (id: string) => void;
  createWorkspace: (name: string, icon: string) => void;
  createChannel: (channel: Partial<Channel>) => void;
  startDirectMessage: (userId: string) => void;

  // Users & Presence
  currentUser: User;
  users: User[];
  typingUsers: Record<string, string[]>; // channelId -> array of user names typing
  setUserStatus: (status: User['status'], statusText?: string) => void;
  setTyping: (channelId: string, userName: string, isTyping: boolean) => void;

  // Messages & Threads
  messages: Record<string, Message[]>;
  threads: Record<string, Message[]>;
  activeThreadParentMessage: Message | null;
  openThread: (message: Message) => void;
  closeThread: () => void;

  // Message Operations (Optimistic updates)
  sendMessage: (channelId: string, content: string, attachments?: Attachment[]) => void;
  sendThreadReply: (parentMessageId: string, content: string) => void;
  toggleReaction: (messageId: string, emoji: string, isThreadReply?: boolean, parentId?: string) => void;
  deleteMessage: (messageId: string, channelId: string) => void;

  // Call / Huddle System
  activeCall: ActiveCallState | null;
  startCall: (targetUser?: User | null) => void;
  endCall: () => void;
  toggleCallMic: () => void;
  toggleCallVideo: () => void;
  toggleCallScreenShare: () => void;

  // UI Modals
  isSearchModalOpen: boolean;
  isCreateChannelModalOpen: boolean;
  isCreateWorkspaceModalOpen: boolean;
  selectedUserProfile: User | null;
  isMobileSidebarOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  setCreateChannelModalOpen: (open: boolean) => void;
  setCreateWorkspaceModalOpen: (open: boolean) => void;
  setSelectedUserProfile: (user: User | null) => void;
  setMobileSidebarOpen: (open: boolean) => void;

  // Simulated live event trigger for portfolio demo
  triggerSimulatedIncomingMessage: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => {
  // Initialize dark mode from localStorage or media query
  const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('ping_theme') : null;
  const initialDark = savedTheme === 'dark';

  return {
    isDarkMode: initialDark,
    isMuted: false,

    toggleDarkMode: () => {
      set((state) => {
        const nextDark = !state.isDarkMode;
        if (typeof window !== 'undefined') {
          localStorage.setItem('ping_theme', nextDark ? 'dark' : 'light');
          if (nextDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        soundFX.playClick();
        return { isDarkMode: nextDark };
      });
    },

    toggleMute: () => {
      set((state) => {
        const nextMuted = !state.isMuted;
        soundFX.isMuted = nextMuted;
        return { isMuted: nextMuted };
      });
    },

    // Workspaces & Channels
    workspaces: MOCK_WORKSPACES,
    activeWorkspaceId: MOCK_WORKSPACES[0].id,
    activeChannelId: MOCK_WORKSPACES[0].channels[0].id,

    setActiveWorkspace: (id: string) => {
      const ws = get().workspaces.find((w) => w.id === id);
      if (ws && ws.channels.length > 0) {
        soundFX.playClick();
        set({
          activeWorkspaceId: id,
          activeChannelId: ws.channels[0].id,
          activeThreadParentMessage: null,
          isMobileSidebarOpen: false,
        });
      }
    },

    setActiveChannel: (id: string) => {
      soundFX.playClick();
      set({
        activeChannelId: id,
        activeThreadParentMessage: null,
        isMobileSidebarOpen: false,
      });
    },

    startDirectMessage: (userId: string) => {
      const { users, workspaces, activeWorkspaceId, messages } = get();
      const targetUser = users.find((u) => u.id === userId);
      if (!targetUser) return;

      const dmChannelId = `dm_${targetUser.id}`;
      soundFX.playClick();

      // Check if DM channel already exists in current workspace
      const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId);
      const existingChannel = currentWorkspace?.channels.find((c) => c.id === dmChannelId);

      let updatedWorkspaces = workspaces;
      if (!existingChannel) {
        const newDmChannel: Channel = {
          id: dmChannelId,
          name: `@${targetUser.username}`,
          type: 'dm',
          topic: `Direct message with ${targetUser.name} (${targetUser.role})`,
          description: `Private 1-on-1 channel with @${targetUser.username}`,
          membersCount: 2,
          unreadCount: 0,
        };

        updatedWorkspaces = workspaces.map((ws) =>
          ws.id === activeWorkspaceId ? { ...ws, channels: [...ws.channels, newDmChannel] } : ws
        );
      }

      // Pre-seed demo message for this DM if empty
      let updatedMessages = messages;
      if (!messages[dmChannelId] || messages[dmChannelId].length === 0) {
        const welcomeDmMsg: Message = {
          id: `msg_dm_${generateUUID().slice(0, 8)}`,
          channelId: dmChannelId,
          userId: targetUser.id,
          content: `Hey Dmitry! 👋 Direct message channel opened. Let me know what you need help with on the ${targetUser.role} side!`,
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          status: 'read',
          reactions: [{ emoji: '🚀', count: 1, users: [targetUser.id] }],
          replyCount: 0,
        };
        updatedMessages = {
          ...messages,
          [dmChannelId]: [welcomeDmMsg],
        };
      }

      set({
        workspaces: updatedWorkspaces,
        messages: updatedMessages,
        activeChannelId: dmChannelId,
        selectedUserProfile: null,
        activeThreadParentMessage: null,
        isMobileSidebarOpen: false,
      });
    },

    createWorkspace: (name: string, icon: string) => {
      const { workspaces } = get();
      const wsId = `ws_${generateUUID().slice(0, 8)}`;
      const generalChannelId = `chn_${generateUUID().slice(0, 8)}`;

      const newWorkspace: Workspace = {
        id: wsId,
        name: name.trim() || 'New Workspace',
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        icon: icon || '⚡',
        badgeCount: 0,
        channels: [
          {
            id: generalChannelId,
            name: 'general',
            type: 'public',
            topic: `Welcome to ${name}! 🚀`,
            description: 'Company-wide town square',
            membersCount: 1,
            unreadCount: 0,
          },
        ],
      };

      const welcomeMsg: Message = {
        id: `msg_${generateUUID().slice(0, 8)}`,
        channelId: generalChannelId,
        userId: 'usr_current',
        content: `🎉 Workspace "${name}" created successfully! Invite teammates and start collaborating in real-time.`,
        createdAt: new Date().toISOString(),
        status: 'read',
        reactions: [{ emoji: '🚀', count: 1, users: ['usr_current'] }],
        replyCount: 0,
      };

      soundFX.playSent();

      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        activeWorkspaceId: wsId,
        activeChannelId: generalChannelId,
        messages: {
          ...state.messages,
          [generalChannelId]: [welcomeMsg],
        },
        isCreateWorkspaceModalOpen: false,
        isMobileSidebarOpen: false,
      }));
    },

    createChannel: (channelData) => {
      const { activeWorkspaceId, workspaces } = get();
      const newChannel: Channel = {
        id: `chn_${generateUUID().slice(0, 8)}`,
        name: channelData.name?.toLowerCase().replace(/\s+/g, '-') || 'new-channel',
        type: channelData.type || 'public',
        topic: channelData.topic || 'New project channel',
        description: channelData.description || 'Created via Ping dialog',
        membersCount: 1,
        unreadCount: 0,
      };

      const updatedWorkspaces = workspaces.map((ws) => {
        if (ws.id === activeWorkspaceId) {
          return {
            ...ws,
            channels: [...ws.channels, newChannel],
          };
        }
        return ws;
      });

      soundFX.playSent();
      set({
        workspaces: updatedWorkspaces,
        activeChannelId: newChannel.id,
        isCreateChannelModalOpen: false,
      });
    },

    // Users & Presence
    currentUser: CURRENT_USER,
    users: MOCK_USERS,
    typingUsers: {},

    setUserStatus: (status, statusText) => {
      set((state) => ({
        currentUser: {
          ...state.currentUser,
          status,
          statusText: statusText || state.currentUser.statusText,
        },
      }));
    },

    setTyping: (channelId, userName, isTyping) => {
      set((state) => {
        const currentList = state.typingUsers[channelId] || [];
        const updatedList = isTyping
          ? Array.from(new Set([...currentList, userName]))
          : currentList.filter((name) => name !== userName);

        return {
          typingUsers: {
            ...state.typingUsers,
            [channelId]: updatedList,
          },
        };
      });
    },

    // Messages & Threads
    messages: INITIAL_MESSAGES,
    threads: INITIAL_THREADS,
    activeThreadParentMessage: null,

    openThread: (message) => {
      soundFX.playClick();
      set({ activeThreadParentMessage: message });
    },

    closeThread: () => {
      soundFX.playClick();
      set({ activeThreadParentMessage: null });
    },

    sendMessage: (channelId, content, attachments) => {
      if (!content.trim() && (!attachments || attachments.length === 0)) return;

      const { currentUser, messages } = get();
      const tempId = `msg_temp_${generateUUID()}`;
      const nowIso = new Date().toISOString();

      const optimisticMsg: Message = {
        id: tempId,
        channelId,
        userId: currentUser.id,
        content,
        createdAt: nowIso,
        status: 'sending',
        attachments: attachments || [],
        reactions: [],
        replyCount: 0,
      };

      soundFX.playSent();

      const currentChannelMsgs = messages[channelId] || [];
      set({
        messages: {
          ...messages,
          [channelId]: [...currentChannelMsgs, optimisticMsg],
        },
      });

      setTimeout(() => {
        set((state) => {
          const currentMsgs = state.messages[channelId] || [];
          return {
            messages: {
              ...state.messages,
              [channelId]: currentMsgs.map((m) =>
                m.id === tempId ? { ...m, id: `msg_${generateUUID().slice(0, 8)}`, status: 'sent' } : m
              ),
            },
          };
        });
      }, 350);
    },

    sendThreadReply: (parentMessageId, content) => {
      if (!content.trim()) return;
      const { currentUser, threads, messages, activeChannelId } = get();
      const tempId = `th_reply_${generateUUID()}`;
      const nowIso = new Date().toISOString();

      const newReply: Message = {
        id: tempId,
        channelId: activeChannelId,
        userId: currentUser.id,
        content,
        createdAt: nowIso,
        parentId: parentMessageId,
        reactions: [],
      };

      soundFX.playSent();

      const existingReplies = threads[parentMessageId] || [];
      const updatedThreads = {
        ...threads,
        [parentMessageId]: [...existingReplies, newReply],
      };

      const updatedMessages = {
        ...messages,
        [activeChannelId]: (messages[activeChannelId] || []).map((m) =>
          m.id === parentMessageId
            ? { ...m, replyCount: (m.replyCount || 0) + 1, lastReplyAt: nowIso }
            : m
        ),
      };

      set({
        threads: updatedThreads,
        messages: updatedMessages,
      });
    },

    toggleReaction: (messageId, emoji, isThreadReply = false, parentId) => {
      const { currentUser, messages, threads, activeChannelId } = get();
      soundFX.playReaction();

      const updateReactionList = (msg: Message): Message => {
        const reactions = [...msg.reactions];
        const existingIdx = reactions.findIndex((r) => r.emoji === emoji);

        if (existingIdx >= 0) {
          const current = reactions[existingIdx];
          const hasUserReacted = current.users.includes(currentUser.id);

          if (hasUserReacted) {
            const newUsers = current.users.filter((u) => u !== currentUser.id);
            if (newUsers.length === 0) {
              reactions.splice(existingIdx, 1);
            } else {
              reactions[existingIdx] = { ...current, count: current.count - 1, users: newUsers };
            }
          } else {
            reactions[existingIdx] = {
              ...current,
              count: current.count + 1,
              users: [...current.users, currentUser.id],
            };
          }
        } else {
          reactions.push({ emoji, count: 1, users: [currentUser.id] });
        }

        return { ...msg, reactions };
      };

      if (isThreadReply && parentId) {
        const replies = threads[parentId] || [];
        set({
          threads: {
            ...threads,
            [parentId]: replies.map((r) => (r.id === messageId ? updateReactionList(r) : r)),
          },
        });
      } else {
        const chMsgs = messages[activeChannelId] || [];
        set({
          messages: {
            ...messages,
            [activeChannelId]: chMsgs.map((m) => (m.id === messageId ? updateReactionList(m) : m)),
          },
        });
      }
    },

    deleteMessage: (messageId, channelId) => {
      soundFX.playClick();
      const { messages } = get();
      set({
        messages: {
          ...messages,
          [channelId]: (messages[channelId] || []).filter((m) => m.id !== messageId),
        },
      });
    },

    // Call / Huddle System
    activeCall: null,

    startCall: (targetUser) => {
      const { workspaces, activeWorkspaceId, activeChannelId } = get();
      soundFX.playReaction();

      if (targetUser) {
        // Direct 1-on-1 Call with Teammate
        set({
          activeCall: {
            isActive: true,
            participantName: targetUser.name,
            participantAvatar: targetUser.avatar,
            participantRole: targetUser.role,
            isChannelHuddle: false,
            duration: 0,
            isMicMuted: false,
            isVideoEnabled: true,
            isScreenSharing: false,
          },
          selectedUserProfile: null,
        });
      } else {
        // Channel Huddle Call
        const currentWs = workspaces.find((w) => w.id === activeWorkspaceId);
        const currentCh = currentWs?.channels.find((c) => c.id === activeChannelId);

        set({
          activeCall: {
            isActive: true,
            participantName: `#${currentCh?.name || 'general'} Huddle`,
            participantAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            participantRole: 'Live Audio & Video Room',
            isChannelHuddle: true,
            duration: 0,
            isMicMuted: false,
            isVideoEnabled: true,
            isScreenSharing: false,
          },
        });
      }
    },

    endCall: () => {
      soundFX.playClick();
      set({ activeCall: null });
    },

    toggleCallMic: () => {
      soundFX.playClick();
      set((state) => (state.activeCall ? { activeCall: { ...state.activeCall, isMicMuted: !state.activeCall.isMicMuted } } : state));
    },

    toggleCallVideo: () => {
      soundFX.playClick();
      set((state) => (state.activeCall ? { activeCall: { ...state.activeCall, isVideoEnabled: !state.activeCall.isVideoEnabled } } : state));
    },

    toggleCallScreenShare: () => {
      soundFX.playClick();
      set((state) => (state.activeCall ? { activeCall: { ...state.activeCall, isScreenSharing: !state.activeCall.isScreenSharing } } : state));
    },

    // UI Modals
    isSearchModalOpen: false,
    isCreateChannelModalOpen: false,
    isCreateWorkspaceModalOpen: false,
    selectedUserProfile: null,
    isMobileSidebarOpen: false,

    setSearchModalOpen: (open) => set({ isSearchModalOpen: open }),
    setCreateChannelModalOpen: (open) => set({ isCreateChannelModalOpen: open }),
    setCreateWorkspaceModalOpen: (open) => set({ isCreateWorkspaceModalOpen: open }),
    setSelectedUserProfile: (user) => set({ selectedUserProfile: user }),
    setMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),

    // Simulated event for interactive portfolio demonstration
    triggerSimulatedIncomingMessage: () => {
      const { activeChannelId, messages } = get();
      const simulatedSenders = MOCK_USERS.filter((u) => u.id !== CURRENT_USER.id);
      const randomSender = simulatedSenders[Math.floor(Math.random() * simulatedSenders.length)];

      const sampleQuotes = [
        'Awesome progress! The WebSocket event latency is currently sitting at 2.4ms.',
        'Just reviewed the Neobrutalism UI components — the 4px hard shadow is pixel-perfect! 🎨',
        'Testing whisper typing events across channels. Everything synchronizes smoothly.',
        'Voice note rendering with Canvas Waveform completed. Let us prepare for staging release! 🚀',
      ];
      const randomQuote = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];

      get().setTyping(activeChannelId, randomSender.name, true);

      setTimeout(() => {
        get().setTyping(activeChannelId, randomSender.name, false);

        const newMsg: Message = {
          id: `msg_${generateUUID().slice(0, 8)}`,
          channelId: activeChannelId,
          userId: randomSender.id,
          content: randomQuote,
          createdAt: new Date().toISOString(),
          status: 'delivered',
          reactions: [{ emoji: '⚡', count: 1, users: [randomSender.id] }],
          replyCount: 0,
        };

        soundFX.playNotification();

        set((state) => ({
          messages: {
            ...state.messages,
            [activeChannelId]: [...(state.messages[activeChannelId] || []), newMsg],
          },
        }));
      }, 1500);
    },
  };
});
