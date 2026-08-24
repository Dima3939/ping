export type UserStatus = 'online' | 'away' | 'busy' | 'offline';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: string;
  roleColor?: string;
  status: UserStatus;
  statusText?: string;
  localTime?: string;
  email: string;
}

export type ChannelType = 'public' | 'private' | 'dm';

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  topic?: string;
  description?: string;
  unreadCount?: number;
  membersCount: number;
  icon?: string;
  isFavorite?: boolean;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[]; // User IDs who reacted
}

export interface Attachment {
  id: string;
  type: 'image' | 'audio' | 'file' | 'code';
  url: string;
  name: string;
  size?: string;
  duration?: string; // for audio voice notes: "0:38"
  waveform?: number[]; // Audio amplitude points (0..1)
  language?: string; // for code: 'typescript', 'php', 'sql', etc.
  codeContent?: string;
}

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  isEdited?: boolean;
  isPinned?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  attachments?: Attachment[];
  reactions: Reaction[];
  replyCount?: number;
  lastReplyAt?: string;
  parentId?: string | null; // For threads
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  icon: string;
  badgeCount?: number;
  channels: Channel[];
}

export interface Thread {
  parentMessage: Message;
  replies: Message[];
}
