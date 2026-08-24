import { Workspace, User, Message } from '../types';

export const CURRENT_USER: User = {
  id: 'usr_current',
  name: 'You (Dmitry)',
  username: 'dmitry',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  role: 'Lead Full-Stack Engineer',
  roleColor: '#FF5A36',
  status: 'online',
  statusText: '⚡ Shipping Ping v1.0',
  localTime: '3:00 PM',
  email: 'dmitry@ping.dev',
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'usr_donald',
    name: 'Donald Vance',
    username: 'donald.v',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'Principal Architect',
    roleColor: '#3B82F6',
    status: 'online',
    statusText: 'Reviewing Laravel Reverb cluster PR',
    localTime: '2:45 PM',
    email: 'donald@ping.dev',
  },
  {
    id: 'usr_sarah',
    name: 'Sarah Kim',
    username: 'sarah.k',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Head of Product Design',
    roleColor: '#00D2B4',
    status: 'online',
    statusText: 'Tweaking Neobrutalism border radii',
    localTime: '11:45 PM',
    email: 'sarah@ping.dev',
  },
  {
    id: 'usr_ben',
    name: 'Ben Carter',
    username: 'ben.carter',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    role: 'Senior React Engineer',
    roleColor: '#FFD13B',
    status: 'online',
    statusText: 'Refactoring TanStack Virtualizer',
    localTime: '7:45 AM',
    email: 'ben@ping.dev',
  },
  {
    id: 'usr_maya',
    name: 'Maya Patel',
    username: 'maya.devops',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Security & DevOps',
    roleColor: '#C4B5FD',
    status: 'away',
    statusText: 'Deploying Redis Cluster',
    localTime: '6:15 PM',
    email: 'maya@ping.dev',
  },
  {
    id: 'usr_alex',
    name: 'Alex Rivera',
    username: 'alex.r',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Backend Core Developer',
    roleColor: '#F472B6',
    status: 'offline',
    statusText: 'AFK — grabbing a double espresso ☕',
    localTime: '1:15 PM',
    email: 'alex@ping.dev',
  },
];

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: 'ws_ping_core',
    name: 'Ping Engineering',
    slug: 'ping-core',
    icon: '⚡',
    badgeCount: 3,
    channels: [
      {
        id: 'chn_general',
        name: 'general',
        type: 'public',
        topic: 'Company-wide announcements & high-velocity syncs 🚀',
        description: 'The town square for all engineering, design, and roadmap updates.',
        membersCount: 24,
        unreadCount: 1,
        isFavorite: true,
      },
      {
        id: 'chn_development',
        name: 'development',
        type: 'public',
        topic: 'React 19 + Laravel Reverb Architecture & PR Reviews',
        description: 'Code snippets, performance benchmarks, and deployment logs.',
        membersCount: 18,
        unreadCount: 2,
        isFavorite: true,
      },
      {
        id: 'chn_design_system',
        name: 'design-system',
        type: 'public',
        topic: 'Neobrutalism Tokens, Shadows, and Micro-interactions',
        description: 'Figma specs, brutalist components, and design reviews.',
        membersCount: 12,
        unreadCount: 0,
        isFavorite: true,
      },
      {
        id: 'chn_product_launches',
        name: 'product-launches',
        type: 'public',
        topic: 'Telemetry metrics, conversion rates, and client feedback',
        description: 'Weekly release notes, uptime dashboards, and user growth charts.',
        membersCount: 20,
        unreadCount: 0,
      },
      {
        id: 'chn_security_vault',
        name: 'security-vault',
        type: 'private',
        topic: 'End-to-End Key Rotation & Sanctum Token Policies',
        description: 'Confidential infrastructure discussions.',
        membersCount: 5,
        unreadCount: 0,
      },
    ],
  },
  {
    id: 'ws_luminary_labs',
    name: 'Luminary Labs',
    slug: 'luminary-labs',
    icon: '💎',
    badgeCount: 0,
    channels: [
      {
        id: 'chn_lum_general',
        name: 'general',
        type: 'public',
        topic: 'Vector DB & AI Embeddings Infrastructure',
        membersCount: 14,
      },
    ],
  },
  {
    id: 'ws_nexus_hq',
    name: 'Nexus Multiplayer',
    slug: 'nexus-hq',
    icon: '🟣',
    badgeCount: 1,
    channels: [
      {
        id: 'chn_nex_general',
        name: 'general',
        type: 'public',
        topic: 'CRDT Canvas Engine & Spatial WebAssembly',
        membersCount: 16,
      },
    ],
  },
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  chn_general: [
    {
      id: 'msg_gen_1',
      channelId: 'chn_general',
      userId: 'usr_donald',
      content: 'Good morning team! ☀️ Laravel Reverb WebSocket benchmark tests just finished on staging. Zero packet drops at **15,000 concurrent socket connections** with sub-4ms broadcast latency!',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      status: 'read',
      reactions: [
        { emoji: '🔥', count: 7, users: ['usr_current', 'usr_sarah', 'usr_ben'] },
        { emoji: '🚀', count: 9, users: ['usr_sarah', 'usr_maya', 'usr_alex'] },
        { emoji: '👏', count: 4, users: ['usr_current'] },
      ],
      replyCount: 3,
      lastReplyAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'msg_gen_2',
      channelId: 'chn_general',
      userId: 'usr_sarah',
      content: 'Here is the voice note with the creative review for the new Neobrutalism interactive buttons. Make sure to check the tactile 4px offset shadow physics! 👇',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      status: 'read',
      attachments: [
        {
          id: 'att_audio_1',
          type: 'audio',
          url: 'voice_note_1.mp3',
          name: 'Voice Note: Tactile Neobrutalism UI Specs',
          duration: '0:42',
          waveform: [0.15, 0.35, 0.65, 0.85, 0.95, 0.6, 0.4, 0.8, 0.9, 0.75, 0.45, 0.3, 0.65, 0.9, 0.7, 0.4, 0.25, 0.5, 0.85, 0.95, 0.6, 0.3, 0.4, 0.75, 0.9, 0.65, 0.35, 0.2],
        },
      ],
      reactions: [
        { emoji: '❤️', count: 5, users: ['usr_current', 'usr_donald'] },
        { emoji: '💡', count: 3, users: ['usr_ben'] },
      ],
      replyCount: 0,
    },
    {
      id: 'msg_gen_3',
      channelId: 'chn_general',
      userId: 'usr_ben',
      content: 'Implemented optimistic cache mutations for instant send feedback. When a user presses `Enter`, the message appears immediately with a temporary UUIDv4 and updates smoothly without any UI flickers.',
      createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      status: 'read',
      reactions: [
        { emoji: '⚡', count: 6, users: ['usr_current', 'usr_donald', 'usr_sarah'] },
      ],
      replyCount: 2,
    },
  ],
  chn_development: [
    {
      id: 'msg_dev_1',
      channelId: 'chn_development',
      userId: 'usr_donald',
      content: 'Here is the core Laravel 11 Reverb broadcasting event configuration we are shipping in `app/Events/MessageSent.php`. It leverages Redis pub/sub backplane:',
      createdAt: new Date(Date.now() - 3600000 * 2.5).toISOString(),
      status: 'read',
      attachments: [
        {
          id: 'att_code_1',
          type: 'code',
          url: 'MessageSent.php',
          name: 'MessageSent.php',
          language: 'php',
          codeContent: `<?php

namespace App\\Events;

use App\\Models\\Message;
use Illuminate\\Broadcasting\\PrivateChannel;
use Illuminate\\Contracts\\Broadcasting\\ShouldBroadcastNow;

class MessageSent implements ShouldBroadcastNow
{
    public function __construct(public Message $message) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("chat.channel.{$this->message->channel_id}")
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'content' => $this->message->content,
            'user_id' => $this->message->user_id,
            'created_at' => $this->message->created_at->toIso8601String(),
        ];
    }
}`,
        },
      ],
      reactions: [
        { emoji: '🔥', count: 8, users: ['usr_current', 'usr_maya', 'usr_ben'] },
        { emoji: '🚀', count: 5, users: ['usr_alex'] },
      ],
      replyCount: 4,
      lastReplyAt: new Date(Date.now() - 3600000 * 1.2).toISOString(),
    },
    {
      id: 'msg_dev_2',
      channelId: 'chn_development',
      userId: 'usr_maya',
      content: 'Sanctum cookie CSRF verification and rate-limiting middleware (`throttle:messages,60,1`) are active on all `/api/v1/messages` endpoints. Memory footprint is strictly under 18MB per worker thread! 🛡️',
      createdAt: new Date(Date.now() - 3600000 * 0.8).toISOString(),
      status: 'read',
      reactions: [
        { emoji: '👏', count: 6, users: ['usr_current', 'usr_donald'] },
        { emoji: '💯', count: 4, users: ['usr_sarah'] },
      ],
      replyCount: 0,
    },
  ],
  chn_design_system: [
    {
      id: 'msg_des_1',
      channelId: 'chn_design_system',
      userId: 'usr_sarah',
      content: 'Welcome to `#design-system`! Here are the official **Neobrutalism Design Tokens** for Ping:\n\n- Canvas Background: `#FFFDF5` (Warm Almond Paper)\n- Heavy Borders: `2.5px solid #121212`\n- Hard Offset Shadows: `4px 4px 0px #121212`\n- Accent Palette: Cyber Coral (`#FF5A36`), Electric Mint (`#00D2B4`), Radiant Yellow (`#FFD13B`)',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      status: 'read',
      reactions: [
        { emoji: '🎨', count: 11, users: ['usr_current', 'usr_donald', 'usr_ben'] },
        { emoji: '❤️', count: 8, users: ['usr_maya'] },
      ],
      replyCount: 1,
    },
  ],
  chn_product_launches: [
    {
      id: 'msg_prod_1',
      channelId: 'chn_product_launches',
      userId: 'usr_donald',
      content: 'Ping v1.0 Launch Checklist:\n- [x] React 19 Frontend with Zustand state store\n- [x] Laravel Reverb WebSockets with Whisper typing\n- [x] Audio Voice Notes with Canvas Waveform\n- [x] Neobrutalism tactile UI with 60 FPS animations\n- [x] GitHub Pages CI/CD automated deployment',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: 'read',
      reactions: [
        { emoji: '🚀', count: 12, users: ['usr_current', 'usr_sarah', 'usr_ben', 'usr_maya'] },
        { emoji: '🎉', count: 10, users: ['usr_donald', 'usr_alex'] },
      ],
      replyCount: 0,
    },
  ],
  chn_security_vault: [
    {
      id: 'msg_sec_1',
      channelId: 'chn_security_vault',
      userId: 'usr_maya',
      content: 'Private channel active. Automated SSL cert rotation and Redis socket authentication tokens configured for zero-leakage enterprise deployment.',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      status: 'read',
      reactions: [
        { emoji: '🔒', count: 4, users: ['usr_current', 'usr_donald'] },
      ],
      replyCount: 0,
    },
  ],
};

export const INITIAL_THREADS: Record<string, Message[]> = {
  msg_gen_1: [
    {
      id: 'th_reply_1',
      channelId: 'chn_general',
      userId: 'usr_sarah',
      content: 'That is incredible latency! Did you test with high payload sizes like audio chunks?',
      createdAt: new Date(Date.now() - 3600000 * 3.8).toISOString(),
      parentId: 'msg_gen_1',
      reactions: [{ emoji: '👍', count: 2, users: ['usr_donald'] }],
    },
    {
      id: 'th_reply_2',
      channelId: 'chn_general',
      userId: 'usr_donald',
      content: 'Yes! Audio waveforms and multipart files are uploaded directly to presigned storage, and only metadata & real-time telemetry stream through Reverb. Keeps WS memory negligible!',
      createdAt: new Date(Date.now() - 3600000 * 3.5).toISOString(),
      parentId: 'msg_gen_1',
      reactions: [{ emoji: '🔥', count: 4, users: ['usr_current', 'usr_sarah'] }],
    },
  ],
  msg_dev_1: [
    {
      id: 'th_dev_1',
      channelId: 'chn_development',
      userId: 'usr_ben',
      content: 'Love using `ShouldBroadcastNow` for critical user messages to bypass worker delay!',
      createdAt: new Date(Date.now() - 3600000 * 2.2).toISOString(),
      parentId: 'msg_dev_1',
      reactions: [{ emoji: '⚡', count: 3, users: ['usr_donald'] }],
    },
  ],
};
