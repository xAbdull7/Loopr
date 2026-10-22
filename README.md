<div align="center">

# ⚡ Loopr

**The Next-Generation, Client-Side Discord Quest Automation Engine**  
*Engineered for maximum stability, military-grade stealth, and zero client performance impact.*

[![Version](https://img.shields.io/badge/Version-2.4.0-10b981?style=for-the-badge&logo=git&logoColor=white)](https://github.com/xAbdull7/Loopr)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![BetterDiscord](https://img.shields.io/badge/Platform-BetterDiscord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://betterdiscord.app/)
[![Open Source](https://img.shields.io/badge/Open%20Source-100%25-success?style=for-the-badge&logo=github&logoColor=white)](https://github.com/xAbdull7/Loopr)
[![Architecture](https://img.shields.io/badge/Performance-Zero--Lag%20Async-brightgreen?style=for-the-badge&logo=speedtest&logoColor=white)](https://github.com/xAbdull7/Loopr)

</div>

---

## 📖 Overview

**Loopr** is a state-of-the-art client-side automation plugin for **BetterDiscord** that streamlines Discord Quest completion. Built with modern asynchronous JavaScript, Loopr mimics legitimate client activity by interfacing directly with Discord's internal Flux architecture—eliminating the need to download heavy games, broadcast live gameplay, or watch promotional videos manually.

Loopr is **100% Free and Open Source**, completely transparent, and crafted to deliver a seamless, native experience with zero lag, no memory leaks, and an ultra-sleek minimalist dashboard.

---

## ✨ Key Features

### 🎮 Comprehensive Quest Support
- **Game Playing Quests:** Injects authentic game activity into Discord's internal `RunningGameStore` and dispatches `LOCAL_ACTIVITY_UPDATE` packets.
- **GoLive Streaming Quests:** Automatically connects to active voice channels, derives valid stream keys, and announces spoofed `STREAM_START` broadcasts.
- **Video & Watch Quests:** Transmits validated, jitter-delayed progress pings directly to Discord's official video completion endpoints.

### 🛡️ Military-Grade Stealth Protocols
- **Asynchronous Process Binding (God Mode):** Silently maps running Windows processes (such as `explorer.exe`, `chrome.exe`, or `svchost.exe`) without freezing the Electron thread or triggering anti-cheat heuristics.
- **Dynamic Jitter Evasion:** Injects pseudo-random delays between heartbeat requests to defeat pattern detection algorithms.
- **Telemetry & Science Blocker:** Intercepts and drops outgoing telemetry requests targeting `sentry.io`, `/science`, and `/metrics` while the engine is running.
- **Smart Idle Protocol:** Automatically halts task progression when you are actively using your computer, resuming only when you enter an AFK state.
- **Adaptive Rate-Limit Failsafe:** Immediately disarms and halts the engine if an HTTP 429 status is detected to safeguard your account.

### ⚡ Ultra-Optimized Zero-Lag Architecture (v2.4)
- **100% Non-Blocking Execution:** Replaced synchronous system calls with non-blocking child process workers.
- **Leak-Free Event Lifecycle:** Managed drag-and-drop listener registry ensures zero memory retention across sessions.
- **Adaptive RAF Animation:** The Matrix canvas effect automatically suspends when concealed or running in Performance Mode.
- **Graceful Shutdown Engine:** Instant cancellation triggers interrupt pending delays the moment you hit stop.

### 🎨 State-of-the-Art Aesthetic & UX
- **Monochrome Glassmorphism UI:** Clean Vercel-inspired dark interface with Terminal Green accents.
- **Draggable Compact Console:** Features live tabs for **Overview**, real-time **Terminal logs**, and historical **Analytics**.
- **Interactive State Mascot:** Animated SVG mascot reflecting real-time system state (Idle, Active, Celebrating).
- **Web Audio Soundscape:** Synthesizes pleasant micro-tones for start and success events using the HTML5 Web Audio API.
- **Discord Webhook Alerts:** Sends rich embeds to your personal Discord server upon quest completion.

---

## 🛠️ Architecture & Under the Hood

```
                      ┌─────────────────────────────────────┐
                      │            Loopr Engine             │
                      │               v2.4.0                │
                      └──────────────────┬──────────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
┌─────────────────┐            ┌───────────────────┐            ┌──────────────────┐
│ Discord Flux    │            │ Asynchronous      │            │ Telemetry &      │
│ Interceptor     │            │ Stealth Matrix    │            │ Network Shield   │
├─────────────────┤            ├───────────────────┤            ├──────────────────┤
│• QuestsStore    │            │• Non-blocking PID │            │• Drops /science  │
│• Dispatcher     │            │• Dynamic Jitter   │            │• Drops sentry.io │
│• RunningGames   │            │• Smart Idle (AFK) │            │• Unified Auth    │
│• Stream Spoofer │            │• 429 Failsafe     │            │• Webhook Alerts  │
└─────────────────┘            └───────────────────┘            └──────────────────┘
```

---

## 🚀 Installation

### Prerequisites
- [Discord Desktop App](https://discord.com/) (Stable, PTB, or Canary)
- [BetterDiscord](https://betterdiscord.app/) installed and active

### Quick Install
1. Download the latest release of [`Loopr.plugin.js`](https://raw.githubusercontent.com/xAbdull7/Loopr/main/Loopr.plugin.js).
2. Open Discord and navigate to:
   **User Settings** (`⚙`) → **BetterDiscord** → **Plugins**
3. Click the **Open Plugins Folder** button at the top of the page.
4. Drag and drop `Loopr.plugin.js` into the plugins directory.
5. In Discord, toggle the switch next to **Loopr** to enable it.

---

## ⚙️ Configuration & Settings

Access the plugin configuration by navigating to **User Settings** → **Plugins** → **Loopr Settings** (`⚙`):

| Setting | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| **Performance Mode** | `Toggle` | `Disabled` | Disables glass blur and canvas animations for low-end systems. |
| **Auto-Queue Protocol**| `Toggle` | `Enabled` | Automatically begins subsequent quests upon task completion. |
| **Ghost Mode** | `Toggle` | `Disabled` | Suppresses on-screen toast notifications for complete background stealth. |
| **Smart Idle Farming** | `Toggle` | `Disabled` | Pauses automation while active, advancing only when AFK. |
| **Simulate Game Crashes**| `Toggle` | `Disabled` | Simulates rare, hyper-realistic game restarts with cooldown pauses. |
| **API Jitter Interval**| `Range` | `4s - 8s` | Defines the randomized duration between heartbeat progress packets. |
| **Discord Webhook URL**| `String` | `None` | Endpoint URL to receive remote notifications and completion embeds. |

---

## 📂 Repository Structure

```
Loopr/
├── Loopr.plugin.js    # Core production plugin script (v2.4.0)
├── README.md          # Project documentation and specifications
└── LICENSE            # MIT Open Source License
```

---

## 🌐 100% Free & Open Source

This project is proud to be **100% Free and Open Source** under the **[MIT License](LICENSE)**.

```
MIT License

Copyright (c) 2026 Abdullah Abdel Samie (M3ZA)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

Contributions, issue reports, and feature suggestions are always welcome! Feel free to open an issue or submit a pull request.

---

## ⚠️ Disclaimer

*Loopr is an experimental, client-side automation utility developed solely for educational and research purposes. Interacting with Discord's private APIs and modifying the client environment is contrary to the Discord Terms of Service. Use at your own discretion. The developer assumes no responsibility or liability for any moderation actions or account penalties.*

---

<div align="center">
Crafted with precision by <b><a href="https://github.com/xAbdull7">M3ZA (Abdullah Abdel Samie)</a></b>
</div>
