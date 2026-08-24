# 💬 Ping — Real-Time Team Messenger & Collaboration OS

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Laravel Reverb](https://img.shields.io/badge/Laravel_Reverb-11.0-FF2D20?logo=laravel&logoColor=white&style=flat-square)](https://laravel.com/docs/11.x/reverb)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

> A high-velocity, zero-latency **Real-Time Team Messenger** built with **React 19, TypeScript, Tailwind CSS, and Laravel 11 Reverb WebSockets**. Featuring an authentic **Neobrutalism design system**, instant optimistic updates, voice notes with canvas waveforms, threaded discussions, and live presence telemetry.

---

## ⚡ Key Highlights & Architecture

- **Zero-Latency Optimistic UI**: Messages, reactions, and thread replies appear instantly with client-generated `UUIDv4` identifiers, seamlessly transitioning to confirmed state.
- **Laravel Reverb WebSocket Protocol**: Multi-channel broadcasting (`private-chat.channel.{id}`, `presence-chat.workspace`, `whisper:typing`) with reconnection backoff and offline queueing.
- **Interactive Voice Notes**: In-browser audio recording simulator with HTML5 Canvas audio waveforms, scrubbing, and duration counters.
- **Neobrutalism Design System**: Bold 2.5px solid black borders, 4px/6px solid offset shadows, vibrant pop colors, warm paper canvas (`#FFFDF5`), and tactile click animations.
- **Threaded Discussions**: Side-drawer threads to keep conversations focused and reduce channel noise.
- **Spotlight Search (`Cmd/Ctrl + K`)**: Instant keyboard-driven fuzzy search across all messages, channels, and team members.
- **Synthesized Audio Telemetry**: Subtle tactile audio clicks and pops generated via Web Audio API (with instant mute toggle).
- **Light & Dark Neobrutalism**: Instant switching between warm cream `#FFFDF5` and midnight `#18181B` with local storage persistence.

---

## 📁 Repository Structure

```
ping/
├── client/                                # React 19 + TypeScript + Vite SPA
│   ├── src/
│   │   ├── app/                           # App root & entry point
│   │   ├── components/
│   │   │   ├── ui/                        # Reusable Neobrutalism UI Kit
│   │   │   ├── layout/                    # Workspace, Channel & Thread sidebars
│   │   │   ├── chat/                      # MessageFeed, VoicePlayer, CodeBlocks
│   │   │   └── modals/                    # Search, CreateChannel, UserProfile
│   │   ├── store/                         # Zustand global state store
│   │   ├── hooks/                         # Sound FX, keyboard listeners, optimistic send
│   │   ├── data/                          # Realistic development demo datasets
│   │   ├── types/                         # Strict TypeScript domain interfaces
│   │   └── lib/                           # Laravel Echo client & utilities
│   └── package.json
│
├── server/                                # Laravel 11 + Reverb WebSocket Backend
│   ├── app/
│   │   ├── Http/Controllers/              # REST API Controllers (Sanctum, Messages, Channels)
│   │   ├── Events/                        # WebSocket Broadcast Events
│   │   └── Models/                        # Eloquent Models
│   ├── routes/                            # api.php & channels.php
│   └── config/                            # reverb.php & broadcasting.php
│
└── .github/workflows/                     # GitHub Actions CI/CD for GitHub Pages
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js**: v18.0.0+ (v20+ recommended)
- **npm** or **pnpm**

### Client Setup
```bash
# Navigate to frontend directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be running at `http://localhost:5173`.

### Production Build
```bash
cd client
npm run build
```

---

## 📄 License
MIT License. Built for portfolio demonstration of advanced frontend engineering and real-time systems.
