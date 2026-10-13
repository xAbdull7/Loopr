/**
 * @name Loopr
 * @author M3ZA
 * @description Advanced Discord Quest Automation featuring custom themes, performance mode, and stealth protocols.
 * @version 2.0.0
 * @source https://github.com/xAbdull7/Loopr
 * @website https://github.com/xAbdull7/Loopr
 */

// Unified Stealth Glass Design System
const StealthTokens = {
    base: "rgba(9, 9, 11, 0.75)",
    solid: "#09090b",
    border: "rgba(255, 255, 255, 0.08)",
    accent: "#10b981", // Terminal Green
    text: "#e4e4e7",
    textMuted: "#a1a1aa",
    backdrop: "blur(24px) saturate(180%)",
    shadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
    glow: "0 0 16px rgba(16, 185, 129, 0.2)"
};

// Raw stylesheet data string for injection
const pluginStyles = `
    @keyframes dashboardFade { from { opacity: 0; filter: blur(10px); transform: scale(0.98); } to { opacity: 1; filter: blur(0); transform: scale(1); } }
    @keyframes logSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulseText { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); color: #fff; } }
    @keyframes mascotHover { 0%, 100% { transform: translateY(0) translateX(-50%); } 50% { transform: translateY(-5px) translateX(-50%); } }
    @keyframes mascotBounce { 0%, 100% { transform: translateY(0) scale(1) translateX(-50%); } 50% { transform: translateY(-15px) scale(1.1) translateX(-50%); } }
    @keyframes zzz { 0% { opacity: 0; transform: translate(0, 0); } 50% { opacity: 1; transform: translate(5px, -5px); } 100% { opacity: 0; transform: translate(10px, -10px); } }
    @keyframes scaleFadeIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
    @keyframes pulseRingAnim { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
    @keyframes skeletonPulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
    @keyframes toastSlide {
        0% { opacity: 0; transform: translate(-50%, -20px) scale(0.95); }
        15% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        85% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -20px) scale(0.95); }
    }
    
    .vercel-tab-bar { display: flex; gap: 4px; padding: 0 16px; border-bottom: 1px solid #27272a; background: #0a0a0a; z-index: 1; position: relative; }
    .vercel-tab-btn { background: none; border: none; color: #888; padding: 12px 16px; font-size: 13px; font-weight: 500; cursor: pointer; transition: 0.2s; border-bottom: 2px solid transparent; outline: none; }
    .vercel-tab-btn:hover { color: #fff; }
    .vercel-tab-btn.active { color: #fff; border-bottom-color: #fff; }
    .vercel-tab-content { flex: 1; display: none; flex-direction: column; animation: logSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; position: relative; z-index: 1; background: transparent; }
    .vercel-tab-content.active { display: flex; }
    
    .vercel-skeleton-line { height: 12px; background: #27272a; border-radius: 4px; margin-bottom: 8px; animation: skeletonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    .vercel-goat-tooltip { position: absolute; bottom: 70px; right: 0; background: #0a0a0a; color: #fff; padding: 8px 12px; border-radius: 8px; font-size: 12px; white-space: nowrap; pointer-events: none; opacity: 0; transform: translateY(10px); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid #27272a; box-shadow: 0 8px 24px rgba(0,0,0,0.8); font-family: system-ui, -apple-system, sans-serif; }
    .vercel-goat-wrapper { position: fixed; bottom: 30px; right: 30px; width: 56px; height: 56px; z-index: 9999; user-select: none; }
    .vercel-goat-wrapper:hover .vercel-goat-tooltip { opacity: 1; transform: translateY(0); }
    .pulse-ring { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; border: 2px solid #4ade80; animation: pulseRingAnim 2s infinite cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; }
    
    #loopr-dashboard {
        position: absolute; top: 0; left: 72px; width: calc(100% - 72px); height: 100%;
        background: #000; z-index: 9999; color: #ededed;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex; flex-direction: column;
        animation: dashboardFade 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .vercel-header {
        height: 52px; border-bottom: 1px solid #27272a; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; flex-shrink: 0; user-select: none;
    }
    .vercel-title { font-size: 14px; font-weight: 600; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px; color: #fff; }
    .vercel-close-btn { 
        background: transparent; color: #a1a1aa; border: 1px solid #333; border-radius: 6px; padding: 4px 10px; font-size: 13px; cursor: pointer; transition: 0.15s; outline: none;
    }
    .vercel-close-btn:hover { background: #111; color: #fff; border-color: #666; }
    
    .vercel-content {
        flex: 1; padding: 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1200px; margin: 0 auto; width: 100%; overflow-y: auto;
    }
    
    .vercel-card {
        border: 1px solid #27272a; border-radius: 8px; background: #0a0a0a; padding: 20px; display: flex; flex-direction: column; height: 100%; max-height: 500px;
    }
    .vercel-card-title { font-size: 12px; color: #888; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #222; padding-bottom: 10px;}
    
    .vercel-primary-btn {
        background: #fff; color: #000; border: 1px solid #fff; border-radius: 6px; padding: 10px 20px; font-weight: 500; cursor: pointer; transition: 0.15s; width: 100%; font-size: 13px;
    }
    .vercel-primary-btn:hover { background: transparent; color: #fff; }
    .vercel-danger-btn {
        background: transparent; color: #ef4444; border: 1px solid #ef4444; border-radius: 6px; padding: 10px 20px; font-weight: 500; cursor: pointer; transition: 0.15s; width: 100%; font-size: 13px;
    }
    .vercel-danger-btn:hover { background: #ef4444; color: #fff; }
    
    .vercel-log-line {
        font-family: 'JetBrains Mono', 'Roboto Mono', monospace; font-size: 11px; color: #a1a1aa; padding: 6px 0; border-bottom: 1px solid #141414; display: flex; gap: 8px; line-height: 1.4; word-break: break-word;
        animation: logSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .vercel-stat-box { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 0; }
    .vercel-stat { font-size: 52px; font-weight: 700; letter-spacing: -0.04em; color: #fff; line-height: 1; }
    .vercel-stat-label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 10px; }
    
    .app-layer-switch { position: relative; display: inline-block; width: 34px; height: 20px; flex-shrink: 0; }
    .app-layer-switch input { opacity: 0; width: 0; height: 0; }
    .app-layer-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .25s; border-radius: 20px; border: 1px solid #444; }
    .app-layer-slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: #fff; transition: .25s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
    .app-layer-switch input:checked + .app-layer-slider { background-color: #10b981; border-color: #10b981; }
    .app-layer-switch input:checked + .app-layer-slider:before { transform: translateX(14px); background-color: #fff; }
    
    ::-webkit-scrollbar { width: 4px; } 
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; } 
    ::-webkit-scrollbar-track { background: transparent; }
`;

// Helper tool to generate DOM elements with assigned attributes and styling
const createElement = (tag, attributes = {}, styles = {}, innerHTML = "") => {
    const el = document.createElement(tag);
    Object.assign(el, attributes); 
    Object.assign(el.style, styles);
    if (innerHTML) {
        el.innerHTML = innerHTML;
    }
    return el;
};

// Cryptographic and process simulation methods for stealth mechanics
const stealthUtils = {
    randomDelay: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateWindowsPID: () => {
        return Math.floor(Math.random() * 16384) * 4 + 1024;
    },
    generateUUID: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

// Web Audio API for Stealth Sound Effects with clean lifecycle
const audioUtils = {
    ctx: null,
    init() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    },
    playTone(freq, type, duration, vol) {
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (_) {}
    },
    startSound() {
        this.playTone(800, 'sine', 0.1, 0.08);
        setTimeout(() => this.playTone(1200, 'sine', 0.2, 0.08), 100);
    },
    successSound() {
        this.playTone(400, 'sine', 0.1, 0.08);
        setTimeout(() => this.playTone(600, 'sine', 0.1, 0.08), 100);
        setTimeout(() => this.playTone(1000, 'sine', 0.35, 0.12), 200);
    },
    dispose() {
        if (this.ctx) {
            try { this.ctx.close(); } catch (_) {}
            this.ctx = null;
        }
    }
};

const mascotSVGs = {
    base: (eyeColor, eyeShape, zzz) => `<svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5))"><path d="M 22 20 Q 15 10 12 18 Q 15 25 24 25" fill="#52525b" stroke="#3f3f46" stroke-width="2"/><path d="M 42 20 Q 49 10 52 18 Q 49 25 40 25" fill="#52525b" stroke="#3f3f46" stroke-width="2"/><path d="M 20 28 Q 10 32 15 40 Q 20 35 22 32" fill="#71717a"/><path d="M 44 28 Q 54 32 49 40 Q 44 35 42 32" fill="#71717a"/><path d="M 24 25 L 40 25 L 44 45 L 32 55 L 20 45 Z" fill="#27272a"/><path d="M 22 25 L 42 25 L 43 32 L 21 32 Z" fill="#ef4444"/><path d="M 42 28 L 50 30 L 48 35 Z" fill="#ef4444"/><g fill="${eyeColor}">${eyeShape}</g>${zzz ? '<text x="45" y="20" fill="#a1a1aa" font-size="12" font-family="monospace" font-weight="bold" style="animation: zzz 2s infinite">Z</text><text x="52" y="12" fill="#a1a1aa" font-size="10" font-family="monospace" font-weight="bold" style="animation: zzz 2s infinite; animation-delay: 0.5s">z</text>' : ''}</svg>`
};

const getMascot = (state) => {
    if (state === 'sleep') return mascotSVGs.base('#333', '<rect x="25" y="28" width="6" height="2"/><rect x="33" y="28" width="6" height="2"/>', true);
    if (state === 'active') return mascotSVGs.base('#fff', '<circle cx="28" cy="28" r="2.5"/><circle cx="36" cy="28" r="2.5"/>', false);
    if (state === 'celebrate') return mascotSVGs.base('#fff', '<path d="M 25 29 Q 28 25 31 29"/><path d="M 33 29 Q 36 25 39 29" fill="none" stroke="#fff" stroke-width="2"/>', false);
};

module.exports = class Loopr {
    constructor() {
        this.DOM_IDS = { 
            button: "app-layer-btn", 
            console: "app-layer-con", 
            percentText: "app-layer-perc", 
            timerText: "app-layer-time", 
            logsArea: "app-layer-logs" 
        };
        
        this.intervals = { 
            timer: null, 
            transitionTimeout: null 
        };

        this.matrixState = {
            animId: null,
            timeoutId: null,
            isRunning: false
        };
        
        this.activeListeners = [];
        this.originalGetRunningGames = null; 
        
        this.settings = {
            theme: "oled",
            performanceMode: false,
            autoQueue: true,
            ghostMode: false,
            smartIdle: false,
            simulateCrashes: false,
            minJitter: 4,
            maxJitter: 8,
            webhookUrl: ""
        };

        this.stats = {
            totalQuests: 0,
            totalSecondsFarmed: 0
        };

        this.state = { 
            isRunning: false, 
            isCrashed: false,
            logs: [], 
            currentProgress: 0, 
            targetDuration: 900, 
            questQueue: [],
            activePid: null,
            activeSocketId: null,
            activeStreamKey: null,
            activeTab: 'Overview'
        };
    }

    start() { 
        this.loadSettings();
        this.loadStats();
        BdApi.DOM.addStyle("app-layer-styles", pluginStyles);
        this.renderFloatingGoat();  
        this.setupTelemetryBlocker();
    }
    
    stop() { 
        this.stopEngineAndCleanup(); 
        this.cleanAllListeners();
        this.stopMatrixAnimation();
        this.removeElement(this.DOM_IDS.console);
        this.removeElement(this.DOM_IDS.button);
        this.removeElement("app-layer-toast");
        BdApi.DOM.removeStyle("app-layer-styles");
        this.teardownTelemetryBlocker();
        audioUtils.dispose();
    }

    // Unified Authentication & Header Resolver
    getAuthToken() {
        try {
            const { Webpack } = BdApi;
            const authStore = Webpack.getStore("AuthenticationStore");
            if (authStore && typeof authStore.getToken === 'function') {
                const token = authStore.getToken();
                if (token) return token;
            }
            const tokenModule = Webpack.getModule(m => m && typeof m.getToken === 'function' && !m.getLocale, { searchExports: true });
            if (tokenModule) {
                return tokenModule.getToken();
            }
        } catch (_) {}
        return null;
    }

    getSuperProperties() {
        try {
            const { Webpack } = BdApi;
            const superPropsMod = Webpack.getModule(m => m && typeof m.getSuperPropertiesBase64 === 'function', { searchExports: true });
            if (superPropsMod) {
                return superPropsMod.getSuperPropertiesBase64() || "";
            }
        } catch (_) {}
        return "";
    }

    getAuthHeaders() {
        const token = this.getAuthToken();
        return {
            "Authorization": token || "",
            "Content-Type": "application/json",
            "x-super-properties": this.getSuperProperties(),
            "x-discord-locale": document.documentElement?.lang || "en-US"
        };
    }

    // Cancellable asynchronous delay
    async waitDelay(ms) {
        let timer;
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (!this.state.isRunning) {
                    clearInterval(checkInterval);
                    clearTimeout(timer);
                    resolve(false);
                }
            }, 150);

            timer = setTimeout(() => {
                clearInterval(checkInterval);
                resolve(this.state.isRunning);
            }, ms);
        });
    }

    // Non-blocking Asynchronous Process Spoofer
    async resolveSpoofedProcess(applicationName) {
        let processId = stealthUtils.generateWindowsPID();
        let exePath = `C:\\Program Files\\${applicationName}\\${applicationName}.exe`;
        
        try {
            const cp = require('child_process');
            const targetNames = ['explorer.exe', 'discord.exe', 'chrome.exe', 'msedge.exe', 'taskmgr.exe', 'svchost.exe'];
            
            const discovered = await new Promise((resolve) => {
                cp.exec('tasklist /FO CSV /NH', { timeout: 3000 }, (err, stdout) => {
                    if (err || !stdout) return resolve(null);
                    const lines = stdout.toString().split('\n');
                    const valid = lines.filter(l => targetNames.some(t => l.toLowerCase().includes(t)));
                    if (valid.length === 0) return resolve(null);
                    const picked = valid[Math.floor(Math.random() * valid.length)].split('","');
                    if (picked.length > 1) {
                        const parsedPid = parseInt(picked[1].replace('"', ''));
                        const parsedName = picked[0].replace('"', '').trim();
                        if (!isNaN(parsedPid) && parsedPid > 0) {
                            return resolve({ pid: parsedPid, name: parsedName });
                        }
                    }
                    resolve(null);
                });
            });

            if (discovered) {
                processId = discovered.pid;
                exePath = `C:\\Windows\\System32\\${discovered.name}`;
                this.logMessage(`[Stealth Engine] Bound Process: ${discovered.name} (PID: ${processId})`, "success");
            }
        } catch (_) {
            // Clean fallback without freezing
        }

        return { processId, exePath };
    }

    // Telemetry and Tracking Shield
    setupTelemetryBlocker() {
        if (this.originalFetch) return;
        this.originalFetch = window.fetch;
        const self = this;
        
        window.fetch = async function(...args) {
            const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
            if (self.state.isRunning && (url.includes('sentry.io') || url.includes('/science') || url.includes('/metrics'))) {
                return new Response(null, { status: 200 }); 
            }
            return self.originalFetch.apply(this, args);
        };

        const originalXHR = window.XMLHttpRequest.prototype.open;
        this.originalXHR = originalXHR;
        window.XMLHttpRequest.prototype.open = function(method, url, ...rest) {
            this._url = url;
            return originalXHR.apply(this, [method, url, ...rest]);
        };

        const originalXHRSend = window.XMLHttpRequest.prototype.send;
        this.originalXHRSend = originalXHRSend;
        window.XMLHttpRequest.prototype.send = function(...rest) {
            if (self.state.isRunning && this._url && (this._url.includes('sentry.io') || this._url.includes('/science') || this._url.includes('/metrics'))) {
                return;
            }
            return originalXHRSend.apply(this, rest);
        };
        this.logMessage("Telemetry Blocker Active", "success");
    }

    teardownTelemetryBlocker() {
        if (this.originalFetch) {
            window.fetch = this.originalFetch;
            this.originalFetch = null;
        }
        if (this.originalXHR) {
            window.XMLHttpRequest.prototype.open = this.originalXHR;
            this.originalXHR = null;
        }
        if (this.originalXHRSend) {
            window.XMLHttpRequest.prototype.send = this.originalXHRSend;
            this.originalXHRSend = null;
        }
    }

    // Managed Event Listeners (Leak Prevention)
    addListener(target, type, listener, options) {
        target.addEventListener(type, listener, options);
        this.activeListeners.push({ target, type, listener, options });
    }

    cleanAllListeners() {
        for (const entry of this.activeListeners) {
            try {
                entry.target.removeEventListener(entry.type, entry.listener, entry.options);
            } catch (_) {}
        }
        this.activeListeners = [];
    }

    // Drag-and-drop handler with auto-cleanup
    setupDraggable(handleElement, targetElement, onEndCallback) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        const onMouseMove = (e) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                isDragging = true;
                targetElement.style.left = (initialX + dx) + "px";
                targetElement.style.top = (initialY + dy) + "px";
                targetElement.style.right = "auto";
                targetElement.style.bottom = "auto";
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            if (onEndCallback) onEndCallback(isDragging);
        };

        const onMouseDown = (e) => {
            if (e.button !== 0) return;
            isDragging = false;
            startX = e.clientX;
            startY = e.clientY;
            initialX = targetElement.offsetLeft;
            initialY = targetElement.offsetTop;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        handleElement.addEventListener('mousedown', onMouseDown);
        this.activeListeners.push({ target: handleElement, type: 'mousedown', listener: onMouseDown });
    }

    // Matrix Canvas Animation with proper RAF lifecycle
    startMatrixAnimation(canvas) {
        this.stopMatrixAnimation();
        if (this.settings.performanceMode || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
        const fontSize = 10;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;

        this.matrixState.isRunning = true;

        const draw = () => {
            if (!this.matrixState.isRunning || !document.getElementById(this.DOM_IDS.console)) {
                this.stopMatrixAnimation();
                return;
            }

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#10b981';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }

            this.matrixState.timeoutId = setTimeout(() => {
                this.matrixState.animId = requestAnimationFrame(draw);
            }, 60);
        };

        draw();
    }

    stopMatrixAnimation() {
        this.matrixState.isRunning = false;
        if (this.matrixState.timeoutId) {
            clearTimeout(this.matrixState.timeoutId);
            this.matrixState.timeoutId = null;
        }
        if (this.matrixState.animId) {
            cancelAnimationFrame(this.matrixState.animId);
            this.matrixState.animId = null;
        }
    }

    // Settings Configuration Panel Constructor
    getSettingsPanel() {
        const panel = document.createElement("div");
        panel.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        panel.style.color = "#dcddde"; 
        panel.style.padding = "24px"; 
        panel.style.maxWidth = "600px";

        panel.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                <h2 style="color: #10b981; margin: 0; font-weight: 700; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">Loopr Configuration</h2>
                <span style="background: #27272a; color: #a1a1aa; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">v2.0.0</span>
            </div>
            
            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 16px 0; font-size: 11px; color: #8e9297; text-transform: uppercase; letter-spacing: 1px;">Visuals & Performance</h3>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #fff; margin-bottom: 4px;">Performance Mode</div>
                        <div style="font-size: 12px; color: #b9bbbe;">Disables glass blur and matrix canvas animation for low-end PCs.</div>
                    </div>
                    <label class="app-layer-switch">
                        <input type="checkbox" id="lpr-perf" ${this.settings.performanceMode ? 'checked' : ''}>
                        <span class="app-layer-slider"></span>
                    </label>
                </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 16px 0; font-size: 11px; color: #8e9297; text-transform: uppercase; letter-spacing: 1px;">Automation & Stealth</h3>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #fff; margin-bottom: 4px;">Auto-Queue Protocol</div>
                        <div style="font-size: 12px; color: #b9bbbe;">Automatically starts the next available quest upon completion.</div>
                    </div>
                    <label class="app-layer-switch">
                        <input type="checkbox" id="lpr-auto" ${this.settings.autoQueue ? 'checked' : ''}>
                        <span class="app-layer-slider"></span>
                    </label>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #fff; margin-bottom: 4px;">Ghost Mode (Silent UI)</div>
                        <div style="font-size: 12px; color: #b9bbbe;">Disables toast notifications for pure stealth background execution.</div>
                    </div>
                    <label class="app-layer-switch">
                        <input type="checkbox" id="lpr-ghost" ${this.settings.ghostMode ? 'checked' : ''}>
                        <span class="app-layer-slider"></span>
                    </label>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #fff; margin-bottom: 4px;">Smart Idle Farming</div>
                        <div style="font-size: 12px; color: #b9bbbe;">Pauses farming when active; automatically resumes when AFK.</div>
                    </div>
                    <label class="app-layer-switch">
                        <input type="checkbox" id="lpr-idle" ${this.settings.smartIdle ? 'checked' : ''}>
                        <span class="app-layer-slider"></span>
                    </label>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #fff; margin-bottom: 4px;">Simulate Game Crashes</div>
                        <div style="font-size: 12px; color: #b9bbbe;">Optional hyper-realistic simulation of rare random game restarts.</div>
                    </div>
                    <label class="app-layer-switch">
                        <input type="checkbox" id="lpr-crash" ${this.settings.simulateCrashes ? 'checked' : ''}>
                        <span class="app-layer-slider"></span>
                    </label>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #fff; margin-bottom: 4px;">API Jitter Evasion (Seconds)</div>
                        <div style="font-size: 12px; color: #b9bbbe;">Randomized delay interval between heartbeat requests.</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="number" id="lpr-min" value="${this.settings.minJitter}" min="2" max="10" style="width: 48px; background: #202225; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 6px; border-radius: 6px; text-align: center; outline: none;">
                        <span style="font-size: 12px; color: #b9bbbe;">to</span>
                        <input type="number" id="lpr-max" value="${this.settings.maxJitter}" min="3" max="15" style="width: 48px; background: #202225; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 6px; border-radius: 6px; text-align: center; outline: none;">
                    </div>
                </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px;">
                <h3 style="margin: 0 0 16px 0; font-size: 11px; color: #8e9297; text-transform: uppercase; letter-spacing: 1px;">Integrations</h3>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1; padding-right: 16px;">
                        <div style="font-weight: 600; font-size: 14px; color: #fff; margin-bottom: 4px;">Discord Webhook URL</div>
                        <div style="font-size: 12px; color: #b9bbbe;">Get notifications on your server when quests complete.</div>
                    </div>
                    <input type="text" id="lpr-web" placeholder="https://discord.com/api/webhooks/..." value="${this.settings.webhookUrl || ''}" style="flex: 1; background: #202225; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 8px 12px; border-radius: 8px; outline: none; font-size: 12px;">
                </div>
            </div>
        `;

        setTimeout(() => {
            const bind = (id, key, isCheckbox = false, isInt = false, needsRefresh = false) => {
                const el = panel.querySelector(`#${id}`); 
                if (!el) return;
                el.onchange = (e) => {
                    let val = isCheckbox ? e.target.checked : e.target.value;
                    if (isInt) {
                        val = parseInt(val) || 4;
                    }
                    this.settings[key] = val;
                    if (key === 'minJitter' || key === 'maxJitter') {
                        if (this.settings.minJitter >= this.settings.maxJitter) {
                            this.settings.maxJitter = this.settings.minJitter + 1;
                        }
                        const maxEl = panel.querySelector('#lpr-max');
                        if (maxEl) maxEl.value = this.settings.maxJitter;
                    }
                    this.saveSettings();
                    if (needsRefresh) {
                        this.refreshLiveUI();
                    }
                };
            };

            bind('lpr-perf', 'performanceMode', true, false, true);
            bind('lpr-auto', 'autoQueue', true);
            bind('lpr-ghost', 'ghostMode', true);
            bind('lpr-idle', 'smartIdle', true);
            bind('lpr-crash', 'simulateCrashes', true);
            bind('lpr-min', 'minJitter', false, true);
            bind('lpr-max', 'maxJitter', false, true);
            bind('lpr-web', 'webhookUrl');
        }, 80);

        return panel;
    }

    loadSettings() {
        const saved = BdApi.Data.load("Loopr", "settings");
        if (saved) {
            this.settings = { ...this.settings, ...saved };
        }
    }

    saveSettings() { 
        BdApi.Data.save("Loopr", "settings", this.settings); 
    }
    
    loadStats() {
        const savedStats = BdApi.Data.load("Loopr", "stats");
        if (savedStats) {
            this.stats = { ...this.stats, ...savedStats };
        }
    }

    saveStats() { 
        BdApi.Data.save("Loopr", "stats", this.stats);
    }
    
    getTheme() { 
        return StealthTokens;
    }

    refreshLiveUI() {
        const t = this.getTheme();
        const bg = this.settings.performanceMode ? t.solid : t.base;
        const filter = this.settings.performanceMode ? "none" : t.backdrop;

        const btn = document.getElementById(this.DOM_IDS.button);
        if (btn) {
            btn.style.background = bg; 
            btn.style.backdropFilter = filter; 
            btn.style.borderColor = t.border;
            btn.style.boxShadow = this.state.isRunning ? t.glow : t.shadow;
        }

        const con = document.getElementById(this.DOM_IDS.console);
        if (con) {
            con.style.background = bg; 
            con.style.backdropFilter = filter; 
            con.style.borderColor = t.border;
            
            const matrixCanvas = document.getElementById("loopr-matrix-bg");
            if (matrixCanvas) {
                if (this.settings.performanceMode) {
                    this.stopMatrixAnimation();
                    matrixCanvas.style.display = "none";
                } else {
                    matrixCanvas.style.display = "block";
                    this.startMatrixAnimation(matrixCanvas);
                }
            }
        }
    }

    async sendWebhookNotification(title, message, colorCode) {
        if (!this.settings.webhookUrl || !this.settings.webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
            return;
        }
        try {
            await fetch(this.settings.webhookUrl, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: "Loopr Engine", 
                    avatar_url: "https://i.imgur.com/GNO2H3H.png", 
                    embeds: [{ 
                        title: title, 
                        description: message, 
                        color: colorCode, 
                        footer: { text: "Loopr Automation v2.0.0 by M3ZA" }, 
                        timestamp: new Date().toISOString() 
                    }] 
                })
            });
        } catch (_) { 
            this.logMessage("Failed to send webhook notification.", "warn"); 
        }
    }

    renderFloatingGoat() {
        if (document.getElementById(this.DOM_IDS.button)) return;
        
        const wrapper = createElement("div", { id: this.DOM_IDS.button, className: "vercel-goat-wrapper" }, {});
        const isRunning = this.state.isRunning;
        
        if (isRunning) {
            const pulse = createElement("div", { className: "pulse-ring" }, {});
            wrapper.appendChild(pulse);
        }
        
        const floatingBtn = createElement("div", { className: "vercel-floating-goat" }, { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#09090b", border: "1px solid #27272a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.5)", transition: "all 0.2s ease" });
        floatingBtn.innerHTML = getMascot(isRunning ? 'active' : 'sleep');
        wrapper.appendChild(floatingBtn);
        
        const tooltip = createElement("div", { className: "vercel-goat-tooltip" }, {}, isRunning ? `Time Left: ${this.formatTime(this.state.targetDuration - this.state.currentProgress)}` : "System Idle");
        wrapper.appendChild(tooltip);
        
        this.setupDraggable(floatingBtn, wrapper, (didDrag) => {
            if (!didDrag) {
                if (!this.state.isRunning) {
                    this.state.logs = []; 
                    this.state.currentProgress = 0;
                    audioUtils.startSound();
                    this.startEngine();
                }
                if (!document.getElementById(this.DOM_IDS.console)) {
                    this.renderCompactConsole();
                }
            }
        });
        
        floatingBtn.onmouseenter = () => { floatingBtn.style.transform = "scale(1.08)"; floatingBtn.style.borderColor = "#52525b"; };
        floatingBtn.onmouseleave = () => { floatingBtn.style.transform = "scale(1)"; floatingBtn.style.borderColor = "#27272a"; };

        document.body.appendChild(wrapper);
    }

    renderCompactConsole() {
        if (document.getElementById(this.DOM_IDS.console)) return;
        
        const consoleContainer = createElement("div", { id: this.DOM_IDS.console }, { position: "fixed", bottom: "100px", right: "30px", width: "340px", height: "450px", background: "#000", border: "1px solid #27272a", borderRadius: "12px", zIndex: "9999", display: "flex", flexDirection: "column", boxShadow: "0 12px 32px rgba(0,0,0,0.9)", overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif", color: "#fff", animation: "scaleFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" });
        
        const matrixCanvas = createElement("canvas", { id: "loopr-matrix-bg", width: 340, height: 450 }, { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.15, pointerEvents: "none" });
        consoleContainer.appendChild(matrixCanvas);
        
        if (!this.settings.performanceMode) {
            this.startMatrixAnimation(matrixCanvas);
        } else {
            matrixCanvas.style.display = "none";
        }
        
        const header = createElement("div", { className: "vercel-header" }, { cursor: "grab", background: "#0a0a0a", zIndex: 1, position: "relative" }, `
            <div class="vercel-title">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                Loopr OS
            </div>
        `);
        const headerActions = createElement("div", {}, { display: "flex", gap: "6px" });
        
        const minBtn = createElement("button", { className: "vercel-close-btn" }, {}, "—");
        minBtn.onclick = () => {
            this.stopMatrixAnimation();
            this.removeElement(this.DOM_IDS.console);
        };
        
        const closeBtn = createElement("button", { className: "vercel-close-btn" }, { color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }, "✕");
        closeBtn.onclick = () => {
            if (this.state.isRunning) {
                this.stopEngineAndCleanup();
            }
            this.stopMatrixAnimation();
            this.removeElement(this.DOM_IDS.console);
        };
        
        headerActions.appendChild(minBtn);
        headerActions.appendChild(closeBtn);
        header.appendChild(headerActions);
        consoleContainer.appendChild(header);

        // Tab Bar
        const tabBar = createElement("div", { className: "vercel-tab-bar" }, {});
        const tabs = ['Overview', 'Terminal', 'Analytics'];
        const tabBtns = {};
        const tabContents = {};
        
        tabs.forEach((tab, i) => {
            const btn = createElement("button", { className: `vercel-tab-btn ${i === 0 ? 'active' : ''}` }, {}, tab);
            tabBar.appendChild(btn);
            tabBtns[tab] = btn;
            
            const content = createElement("div", { className: `vercel-tab-content ${i === 0 ? 'active' : ''}` }, { padding: "16px", overflowY: "auto" });
            tabContents[tab] = content;
            
            btn.onclick = () => {
                Object.values(tabBtns).forEach(b => b.classList.remove('active'));
                Object.values(tabContents).forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                content.classList.add('active');
                this.state.activeTab = tab;
            };
        });
        consoleContainer.appendChild(tabBar);
        
        const isRunning = this.state.isRunning;
        
        // Overview Tab
        tabContents['Overview'].innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 20px; padding-top: 16px;">
                <div style="color: #888; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">Status: <span style="font-weight: 700; color: ${isRunning ? '#10b981' : '#ef4444'}">${isRunning ? 'ACTIVE' : 'IDLE'}</span></div>
                <div id="${this.DOM_IDS.percentText}" style="font-size: 46px; font-weight: 700; color: #fff; line-height: 1; margin: 12px 0;">${isRunning && this.state.targetDuration > 0 ? Math.floor((this.state.currentProgress / this.state.targetDuration) * 100) + '%' : '0%'}</div>
                <div id="${this.DOM_IDS.timerText}" style="font-size: 12px; color: #a1a1aa; font-family: 'JetBrains Mono', monospace; background: #111; padding: 4px 12px; border-radius: 12px; border: 1px solid #222;">00:00 / 00:00</div>
            </div>
        `;
        
        const ghostToggleContainer = createElement("div", {}, { marginTop: "auto", padding: "12px 16px", border: "1px solid #27272a", background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "8px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" });
        ghostToggleContainer.innerHTML = `<span style="font-size: 13px; font-weight: 500; color: #fff;">Ghost Mode (Stealth)</span>`;
        
        const ghostToggle = createElement("label", { className: "app-layer-switch" }, {}, `
            <input type="checkbox" id="ghost-toggle-btn" ${this.settings.ghostMode ? 'checked' : ''}>
            <span class="app-layer-slider"></span>
        `);
        ghostToggle.querySelector('input').onchange = (e) => {
            this.settings.ghostMode = e.target.checked;
            this.saveSettings();
            this.displayToastNotification(this.settings.ghostMode ? "Ghost Mode: Enabled" : "Ghost Mode: Disabled");
        };
        ghostToggleContainer.appendChild(ghostToggle);
        tabContents['Overview'].appendChild(ghostToggleContainer);
        
        // Terminal Tab
        tabContents['Terminal'].style.padding = "0";
        const logsArea = createElement("div", { id: this.DOM_IDS.logsArea }, { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column-reverse", padding: "12px", background: "rgba(5,5,5,0.7)" });
        tabContents['Terminal'].appendChild(logsArea);
        
        // Analytics Tab
        const hrs = Math.floor(this.stats.totalSecondsFarmed / 3600);
        const mins = Math.floor((this.stats.totalSecondsFarmed % 3600) / 60);
        tabContents['Analytics'].innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
                <div style="background: #0a0a0a; border: 1px solid #27272a; padding: 20px 12px; border-radius: 8px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-size: 28px; font-weight: 700; color: #fff;">${this.stats.totalQuests}</div>
                    <div style="font-size: 10px; color: #888; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.05em;">Quests Done</div>
                </div>
                <div style="background: #0a0a0a; border: 1px solid #27272a; padding: 20px 12px; border-radius: 8px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-size: 28px; font-weight: 700; color: #fff;">${hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`}</div>
                    <div style="font-size: 10px; color: #888; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.05em;">Total Time</div>
                </div>
            </div>
        `;
        
        consoleContainer.appendChild(tabContents['Overview']);
        consoleContainer.appendChild(tabContents['Terminal']);
        consoleContainer.appendChild(tabContents['Analytics']);
        
        this.setupDraggable(header, consoleContainer);
        
        document.body.appendChild(consoleContainer);
        this.renderStoredLogs();
        this.updateHUDDisplay();
    }

    displayToastNotification(message) {
        if (this.settings.ghostMode) return; 
        
        this.removeElement("app-layer-toast");
        const t = this.getTheme();
        const bg = this.settings.performanceMode ? t.solid : t.base;
        const filter = this.settings.performanceMode ? "none" : t.backdrop;
        const toastHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${t.accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> <span>${message}</span>`;
        
        const toast = createElement("div", { id: "app-layer-toast" }, { position: "fixed", top: "24px", left: "50%", transform: "translate(-50%, -20px)", background: bg, backdropFilter: filter, border: `1px solid ${t.border}`, borderRadius: "30px", color: "#fff", padding: "10px 20px", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px", zIndex: "99999", boxShadow: this.settings.performanceMode ? "none" : `0 10px 40px ${t.accent}33`, animation: "toastSlide 4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }, toastHTML);
        document.body.appendChild(toast);
        setTimeout(() => {
            this.removeElement("app-layer-toast");
        }, 4200);
    }

    removeElement(id) { 
        const el = document.getElementById(id); 
        if (el) el.remove(); 
    }
    
    formatTime(seconds) { 
        if (!seconds || isNaN(seconds) || seconds < 0) return "00:00";
        const minStr = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secStr = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minStr}:${secStr}`;
    }

    updateHUDDisplay() {
        const percEl = document.getElementById(this.DOM_IDS.percentText);
        if (percEl) {
            const perc = this.state.targetDuration > 0 ? Math.floor((this.state.currentProgress / this.state.targetDuration) * 100) : 0;
            percEl.innerText = `${Math.min(perc, 100)}%`;
        }
        
        const timeEl = document.getElementById(this.DOM_IDS.timerText);
        if (timeEl) {
            timeEl.innerText = `${this.formatTime(this.state.currentProgress)} / ${this.formatTime(this.state.targetDuration)}`;
        }

        const tooltip = document.querySelector('.vercel-goat-tooltip');
        if (tooltip && this.state.isRunning) {
            const remaining = Math.max(0, this.state.targetDuration - this.state.currentProgress);
            tooltip.innerText = `Time Left: ${this.formatTime(remaining)}`;
        }
    }

    updateMascot(state) {
        const wrapper = document.getElementById(this.DOM_IDS.button);
        if (wrapper) {
            const mascotEl = wrapper.querySelector('.vercel-floating-goat');
            if (mascotEl) {
                mascotEl.innerHTML = getMascot(state);
                mascotEl.style.animation = "none";
                mascotEl.offsetHeight;
                if (state === 'celebrate') {
                    mascotEl.style.animation = "mascotBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 3";
                }
            }
            const existingPulse = wrapper.querySelector('.pulse-ring');
            if (state === 'active' && !existingPulse) {
                const pulse = createElement("div", { className: "pulse-ring" }, {});
                wrapper.insertBefore(pulse, wrapper.firstChild);
            } else if (state !== 'active' && existingPulse) {
                existingPulse.remove();
            }
            const tooltip = wrapper.querySelector('.vercel-goat-tooltip');
            if (tooltip) {
                tooltip.innerText = state === 'active' ? "System Active" : "System Idle";
            }
        }
    }

    logMessage(message, type = "info") { 
        this.state.logs.push({ message, type, time: Date.now() }); 
        if (this.state.logs.length > 150) {
            this.state.logs.shift();
        }
        this.appendLogToUI(message, type); 
    }

    appendLogToUI(message, type) {
        const container = document.getElementById(this.DOM_IDS.logsArea); 
        if (!container) return;
        
        const skeleton = container.querySelector('.vercel-skeleton-line');
        if (skeleton) container.innerHTML = "";
        
        let textColor = "#a1a1aa";
        let badge = "[INF]";
        
        if (type === "err") { textColor = "#ef4444"; badge = "[ERR]"; } 
        else if (type === "warn") { textColor = "#f59e0b"; badge = "[WRN]"; } 
        else if (type === "success") { textColor = "#10b981"; badge = "[OK]"; }
        
        const timeStr = new Date().toLocaleTimeString([], { hour12: false });
        const logLine = createElement("div", { className: "vercel-log-line" }, {}, `<span style="color: #555; min-width: 58px;">${timeStr}</span><span style="color: ${textColor}; font-weight: 700; min-width: 42px;">${badge}</span><span style="color: ${textColor}">${message}</span>`);
        
        if (container.childNodes.length > 0) {
            container.insertBefore(logLine, container.childNodes[0]);
        } else {
            container.appendChild(logLine);
        }
    }

    renderStoredLogs() {
        const container = document.getElementById(this.DOM_IDS.logsArea); 
        if (!container) return;
        
        if (this.state.logs.length === 0) {
            container.innerHTML = `
                <div class="vercel-skeleton-line" style="width: 100%;"></div>
                <div class="vercel-skeleton-line" style="width: 80%; animation-delay: 0.1s;"></div>
                <div class="vercel-skeleton-line" style="width: 90%; animation-delay: 0.2s;"></div>
                <div style="text-align: center; color: #555; font-size: 11px; margin-top: 16px; font-family: 'JetBrains Mono', monospace;">Waiting for activity stream...</div>
            `;
            return;
        }
        
        container.innerHTML = "";
        const logSnapshot = [...this.state.logs].reverse();
        logSnapshot.forEach(log => {
            let textColor = "#a1a1aa";
            let badge = "[INF]";
            if (log.type === "err") { textColor = "#ef4444"; badge = "[ERR]"; } 
            else if (log.type === "warn") { textColor = "#f59e0b"; badge = "[WRN]"; } 
            else if (log.type === "success") { textColor = "#10b981"; badge = "[OK]"; }
            
            const timeStr = new Date(log.time || Date.now()).toLocaleTimeString([], { hour12: false });
            const logLine = createElement("div", { className: "vercel-log-line" }, {}, `<span style="color: #555; min-width: 58px;">${timeStr}</span><span style="color: ${textColor}; font-weight: 700; min-width: 42px;">${badge}</span><span style="color: ${textColor}">${log.message}</span>`);
            container.appendChild(logLine);
        }); 
    }

    getDiscordDispatcher(Webpack) {
        return Webpack.getModule(m => m && m.dispatch && m.subscribe, { searchExports: true });
    }

    async startEngine() {
        this.state.isRunning = true; 
        this.state.isCrashed = false;
        this.state.questQueue = [];
        
        if (this.intervals.timer) {
            clearInterval(this.intervals.timer);
        }

        this.intervals.timer = setInterval(() => {
            if (this.state.isCrashed || !this.state.isRunning) return;

            if (this.state.targetDuration > 0 && this.state.currentProgress < this.state.targetDuration) {
                // Optional crash simulation
                if (this.settings.simulateCrashes && Math.random() < 0.0015) {
                    this.state.isCrashed = true;
                    this.logMessage("Simulated Game Restart triggered. Pausing...", "warn");
                    this.updateMascot('sleep');
                    setTimeout(() => {
                        if (this.state.isRunning) {
                            this.state.isCrashed = false;
                            this.logMessage("Simulated Game Restart complete. Resuming.", "info");
                            this.updateMascot('active');
                        }
                    }, stealthUtils.randomDelay(15000, 30000));
                    return;
                }

                this.state.currentProgress += 1; 
                this.stats.totalSecondsFarmed += 1;
                
                if (this.stats.totalSecondsFarmed % 60 === 0) {
                    this.saveStats();
                }
                this.updateHUDDisplay();
            }
        }, 1000);

        this.updateMascot('active');
        this.logMessage("Security Engine Initialized...", "success");

        try {
            const { Webpack } = BdApi;
            const discordModules = {
                QuestsStore: Webpack.getStore("QuestsStore") || Webpack.getModule(m => m && m.getQuest, { searchExports: true }),
                RunningGameStore: Webpack.getStore("RunningGameStore"),
                FluxDispatcher: this.getDiscordDispatcher(Webpack)
            };

            if (!discordModules.QuestsStore || !discordModules.FluxDispatcher) {
                throw new Error("Unable to locate Discord Quests or Flux dispatcher modules.");
            }

            const rawQuestsData = discordModules.QuestsStore.getQuests ? discordModules.QuestsStore.getQuests() : discordModules.QuestsStore.quests;
            let questsArray = [];
            if (rawQuestsData instanceof Map) {
                questsArray = [...rawQuestsData.values()];
            } else if (rawQuestsData && typeof rawQuestsData === 'object') {
                questsArray = Object.values(rawQuestsData);
            }
            
            const activeQuests = questsArray.filter(quest => quest.userStatus?.enrolledAt && !quest.userStatus?.completedAt && new Date(quest.config.expiresAt).getTime() > Date.now());
            const unenrolledQuests = questsArray.filter(quest => !quest.userStatus?.enrolledAt && new Date(quest.config.expiresAt).getTime() > Date.now());

            if (unenrolledQuests.length > 0) {
                this.logMessage(`Found ${unenrolledQuests.length} available quest(s). Auto-enrolling...`, "info");
                try {
                    const headers = this.getAuthHeaders();
                    if (headers.Authorization) {
                        const fetchReq = this.originalFetch || window.fetch;
                        for (const q of unenrolledQuests) {
                            if (!this.state.isRunning) break;
                            const res = await fetchReq(`https://discord.com/api/v9/quests/${q.id}/enroll`, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify({ location: 2 })
                            });
                            if (res.ok) {
                                this.logMessage(`Enrolled: ${q.config.messages.questName}`, "success");
                            }
                            await this.waitDelay(1200);
                        }
                        if (discordModules.QuestsStore.fetchCurrentQuests) {
                            await discordModules.QuestsStore.fetchCurrentQuests();
                        }
                    }
                } catch (_) {
                    this.logMessage("Auto-enrollment encountered network warning.", "warn");
                }
            }

            // Refresh list after auto-enrollment
            const recheckRaw = discordModules.QuestsStore.getQuests ? discordModules.QuestsStore.getQuests() : discordModules.QuestsStore.quests;
            const recheckArray = (recheckRaw instanceof Map) ? [...recheckRaw.values()] : Object.values(recheckRaw || {});
            const allPlayableQuests = recheckArray.filter(quest => quest.userStatus?.enrolledAt && !quest.userStatus?.completedAt && new Date(quest.config.expiresAt).getTime() > Date.now());

            if (allPlayableQuests.length === 0) { 
                this.logMessage("No active quests found to automate.", "warn"); 
                this.sendWebhookNotification("⚠️ Loopr Status", "No active quests found. Engine idling.", 0xffcc00);
                this.stopEngineAndCleanup(); 
                return; 
            }

            for (const currentQuest of allPlayableQuests) {
                const taskConfig = currentQuest.config?.taskConfig || currentQuest.config?.taskConfigV2;
                if (!taskConfig || !taskConfig.tasks) continue;
                
                for (const key of Object.keys(taskConfig.tasks)) {
                    if (typeof taskConfig.tasks[key]?.target === 'number' && taskConfig.tasks[key].target > 0) {
                        this.state.questQueue.push({ quest: currentQuest, taskKey: key, target: taskConfig.tasks[key].target }); 
                        break;
                    }
                }
            }

            if (this.state.questQueue.length === 0) {
                throw new Error("No valid quest target targets identified.");
            }
            
            this.logMessage(`Loaded ${this.state.questQueue.length} quest task(s) into automation queue.`, "success");
            this.processNextQuestInQueue(discordModules);

        } catch(e) { 
            this.logMessage(e.message, "err"); 
            this.sendWebhookNotification("🚨 Engine Error", `Error: ${e.message}`, 0xff5555);
            this.stopEngineAndCleanup(); 
        }
    }

    async processNextQuestInQueue(discordModules) {
        if (!this.state.isRunning || this.state.questQueue.length === 0) { 
            this.stopEngineAndCleanup(); 
            return; 
        }

        const currentTask = this.state.questQueue.shift();
        let applicationName = currentTask.quest.config.messages.gameTitle || currentTask.quest.config.messages.questName;
        
        let initialProgress = 0;
        if (currentTask.quest.userStatus?.progress) {
            for (const p of Object.values(currentTask.quest.userStatus.progress)) {
                if (typeof p.value === 'number' && p.value > initialProgress) {
                    initialProgress = p.value;
                }
            }
        }

        this.state.currentProgress = initialProgress; 
        this.state.targetDuration = currentTask.target; 
        this.updateHUDDisplay();
        this.logMessage(`[Queue] Locked onto: ${applicationName}`, "info");

        const isVideoTask = currentTask.taskKey.includes("WATCH") || (!currentTask.taskKey.includes("PLAY") && !currentTask.quest.config.application?.id);
        const isStreamTask = currentTask.taskKey.includes("STREAM") || currentTask.taskKey.includes("BROADCAST");
        
        if (isVideoTask) {
            await this.executeVideoProtocol(currentTask.quest.id, currentTask.target, discordModules);
        } else {
            await this.executeGameProtocol(discordModules, currentTask.quest.config.application?.id, applicationName, currentTask.target, currentTask.quest.id, currentTask.taskKey, isStreamTask);
        }
    }

    async executeVideoProtocol(questId, targetDuration, discordModules) {
        this.logMessage(`Video Protocol Active: Jitter [${this.settings.minJitter}s-${this.settings.maxJitter}s]`, "info");
        
        let wasActive = false;
        while (this.state.isRunning && this.state.currentProgress < targetDuration) {
            if (this.settings.smartIdle) {
                const IdleStore = BdApi.Webpack.getStore("IdleStore");
                const isUserIdle = IdleStore ? (typeof IdleStore.isIdle === 'function' ? IdleStore.isIdle() : IdleStore.getIdleSince() !== null) : false;
                if (!isUserIdle) {
                    if (!wasActive) {
                        this.logMessage("Smart Idle: Paused until AFK.", "warn");
                        wasActive = true;
                    }
                    const canContinue = await this.waitDelay(4000);
                    if (!canContinue) break;
                    continue;
                }
                if (wasActive) {
                    this.logMessage("Smart Idle: Resuming, user is AFK.", "success");
                    wasActive = false;
                }
            }
            
            const waitTime = stealthUtils.randomDelay(this.settings.minJitter * 1000, this.settings.maxJitter * 1000);
            const canContinue = await this.waitDelay(waitTime);
            if (!canContinue) break;
            
            this.state.currentProgress = Math.min(this.state.currentProgress + Math.floor(waitTime / 1000), targetDuration);
            
            try {
                const headers = this.getAuthHeaders();
                const fetchReq = this.originalFetch || window.fetch;
                const res = await fetchReq(`https://discord.com/api/v9/quests/${questId}/video-progress`, {
                    method: "POST", 
                    headers: headers,
                    body: JSON.stringify({ timestamp: this.state.currentProgress })
                });
                
                if (res.status === 429) {
                    this.logMessage("Failsafe: Rate-Limit (429) detected! Aborting to protect account.", "err");
                    this.sendWebhookNotification("🚨 Failsafe Triggered", "API Rate-Limit detected (429). Engine halted.", 0xff5555);
                    this.stopEngineAndCleanup(); 
                    return;
                } else if (!res.ok && res.status >= 400) {
                    this.logMessage(`Video Progress API responded with status ${res.status}`, "warn");
                }
            } catch (_) {
                this.logMessage("Video Progress ping network warning.", "warn");
            }
            
            if (this.state.currentProgress >= targetDuration) {
                this.finalizeQuestCompletion(discordModules, questId);
                break;
            }
        }
    }

    async executeGameProtocol(discordModules, applicationId, applicationName, targetDuration, questId, taskKeyName, isStreamTask = false) {
        this.logMessage(`Spoofing Active: Jitter [${this.settings.minJitter}s-${this.settings.maxJitter}s]`, "info");
        
        let executableName = `${applicationName}.exe`;
        try {
            if (applicationId) {
                const headers = this.getAuthHeaders();
                const fetchReq = this.originalFetch || window.fetch;
                const response = await fetchReq(`https://discord.com/api/v9/applications/public?application_ids=${applicationId}`, { 
                    headers: headers 
                });
                if (response.status === 429) { 
                    this.logMessage("Failsafe: Rate-Limit on application metadata.", "err"); 
                    this.stopEngineAndCleanup(); 
                    return; 
                }
                if (response.ok) {
                    const appData = await response.json();
                    const windowsExecutable = appData?.[0]?.executables?.find(exe => exe.os === "win32");
                    if (windowsExecutable) {
                        executableName = windowsExecutable.name.replace(">", "");
                    }
                }
            }
        } catch (_) {}

        // Non-blocking process resolution
        const { processId, exePath } = await this.resolveSpoofedProcess(applicationName);

        this.state.activePid = processId;
        this.state.activeSocketId = stealthUtils.generateUUID();
        
        const simulatedGame = { 
            cmdLine: exePath, 
            exeName: executableName, 
            exePath: exePath, 
            hidden: false, 
            isLauncher: false, 
            id: applicationId || "0", 
            name: applicationName, 
            pid: processId, 
            pidPath: [processId], 
            processName: applicationName, 
            start: Date.now() 
        };

        this.originalGetRunningGames = discordModules.RunningGameStore.getRunningGames;
        discordModules.RunningGameStore.getRunningGames = () => [simulatedGame];
        discordModules.RunningGameStore.getGameForPID = (pid) => (pid === processId ? simulatedGame : null);
        
        discordModules.FluxDispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", removed: [], added: [simulatedGame], games: [simulatedGame] });
        discordModules.FluxDispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            socketId: this.state.activeSocketId,
            pid: processId,
            activity: {
                application_id: applicationId || "0",
                name: applicationName,
                type: 0,
                session_id: BdApi.Webpack.getStore("SessionStore")?.getSessionId() || "default",
                created_at: Date.now(),
                timestamps: { start: Date.now() },
                flags: 0
            }
        });

        if (isStreamTask) {
            const SelectedChannelStore = BdApi.Webpack.getStore("SelectedChannelStore");
            const voiceChannelId = SelectedChannelStore ? SelectedChannelStore.getVoiceChannelId() : null;
            if (!voiceChannelId) {
                this.logMessage("⚠️ Stream Quest requires an active Voice Channel!", "err");
                this.sendWebhookNotification("⚠️ Stream Quest Error", "Join a voice channel to spoof live stream.", 0xffcc00);
                this.stopEngineAndCleanup();
                return;
            }
            const ChannelStore = BdApi.Webpack.getStore("ChannelStore");
            const channel = ChannelStore ? ChannelStore.getChannel(voiceChannelId) : null;
            const guildId = channel ? channel.guild_id : null;
            const userId = BdApi.Webpack.getStore("UserStore")?.getCurrentUser()?.id || "0";
            
            this.state.activeStreamKey = guildId ? `guild:${guildId}:${voiceChannelId}:${userId}` : `call:${voiceChannelId}:${userId}`;
            
            this.logMessage(`GoLive Spoofer active in voice channel.`, "info");
            discordModules.FluxDispatcher.dispatch({
                type: "STREAM_START",
                streamType: guildId ? "guild" : "call",
                guildId: guildId,
                channelId: voiceChannelId,
                pid: processId
            });
        }

        let wasActive = false;
        while (this.state.isRunning) {
            if (this.settings.smartIdle) {
                const IdleStore = BdApi.Webpack.getStore("IdleStore");
                const isUserIdle = IdleStore ? (typeof IdleStore.isIdle === 'function' ? IdleStore.isIdle() : IdleStore.getIdleSince() !== null) : false;
                if (!isUserIdle) {
                    if (!wasActive) {
                        this.logMessage("Smart Idle: Paused until you are AFK.", "warn");
                        wasActive = true;
                    }
                    const canContinue = await this.waitDelay(4000);
                    if (!canContinue) break;
                    continue;
                }
                if (wasActive) {
                    this.logMessage("Smart Idle: Resuming, user is AFK.", "success");
                    wasActive = false;
                }
            }

            const pollingDelay = stealthUtils.randomDelay(this.settings.minJitter * 1000, this.settings.maxJitter * 1000);
            const canContinue = await this.waitDelay(pollingDelay);
            if (!canContinue) break;
            
            try {
                const headers = this.getAuthHeaders();
                const fetchReq = this.originalFetch || window.fetch;
                const heartbeatRes = await fetchReq(`https://discord.com/api/v9/quests/${questId}/heartbeat`, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ 
                        application_id: applicationId,
                        terminal: false,
                        stream_key: this.state.activeStreamKey || undefined
                    })
                });

                if (heartbeatRes.status === 429) {
                    this.logMessage("Failsafe: Rate-Limit (429) on heartbeat! Stopping engine.", "err");
                    this.stopEngineAndCleanup();
                    return;
                }
            } catch (_) {
                this.logMessage("Heartbeat network warning.", "warn");
            }
            
            const rawQuestsData = discordModules.QuestsStore.getQuests ? discordModules.QuestsStore.getQuests() : discordModules.QuestsStore.quests;
            let questsArray = [];
            if (rawQuestsData instanceof Map) {
                questsArray = [...rawQuestsData.values()];
            } else if (rawQuestsData && typeof rawQuestsData === 'object') {
                questsArray = Object.values(rawQuestsData);
            }
            const currentQuestData = questsArray.find(q => q.id === questId);
            
            if (!currentQuestData) break;
            
            const realServerProgress = currentQuestData.userStatus?.progress?.[taskKeyName]?.value || 0;
            if (realServerProgress > this.state.currentProgress) {
                this.state.currentProgress = realServerProgress;
            }
            this.updateHUDDisplay();
            
            if (realServerProgress >= targetDuration) { 
                this.finalizeQuestCompletion(discordModules, questId); 
                break; 
            }
        }
    }

    finalizeQuestCompletion(discordModules, questId) {
        this.state.currentProgress = this.state.targetDuration; 
        
        this.stats.totalQuests += 1;
        this.saveStats();
        audioUtils.successSound();
        this.updateMascot('celebrate');
        setTimeout(() => { if (this.state.isRunning) this.updateMascot('active'); }, 3000);
        
        this.updateHUDDisplay();
        this.displayToastNotification("Loopr: Quest Completed Successfully!");
        
        if (questId) {
            try {
                const headers = this.getAuthHeaders();
                if (headers.Authorization) {
                    const fetchReq = this.originalFetch || window.fetch;
                    fetchReq(`https://discord.com/api/v9/quests/${questId}/claim`, {
                        method: 'POST',
                        headers: headers
                    }).then(res => {
                        if (res.ok) this.logMessage(`Rewards claimed automatically!`, "success");
                    }).catch(() => {});
                }
            } catch (_) {}
        }
        
        if (this.settings.autoQueue && this.state.questQueue.length > 0) {
            this.logMessage(`Mission complete. Next quest in queue starting shortly...`, "success");
            const humanDelay = stealthUtils.randomDelay(7000, 11000);
            this.intervals.transitionTimeout = setTimeout(() => { 
                if (this.state.isRunning) {
                    this.processNextQuestInQueue(discordModules); 
                }
            }, humanDelay);
        } else {
            const finalMsg = this.settings.autoQueue ? "All Auto-Queue tasks completed!" : "Quest completed. Auto-Queue is OFF.";
            this.logMessage(finalMsg, "success");
            this.sendWebhookNotification("✅ Automation Complete", finalMsg, 0x10b981);
            setTimeout(() => {
                this.stopEngineAndCleanup();
            }, 3000);
        }
    }

    stopEngineAndCleanup() {
        this.state.isRunning = false; 
        this.state.isCrashed = false;
        this.updateMascot('sleep');
        
        if (this.intervals.timer) {
            clearInterval(this.intervals.timer);
            this.intervals.timer = null;
        }
        if (this.intervals.transitionTimeout) {
            clearTimeout(this.intervals.transitionTimeout);
            this.intervals.transitionTimeout = null;
        }
        
        if (this.originalGetRunningGames) {
            try {
                const { Webpack } = BdApi; 
                const RunningGameStore = Webpack.getStore("RunningGameStore"); 
                const Dispatcher = this.getDiscordDispatcher(Webpack);
                if (RunningGameStore) {
                    RunningGameStore.getRunningGames = this.originalGetRunningGames;
                }
                if (Dispatcher) {
                    Dispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", games: [], added: [], removed: [] });
                    if (this.state.activeSocketId) {
                        Dispatcher.dispatch({
                            type: "LOCAL_ACTIVITY_UPDATE",
                            socketId: this.state.activeSocketId,
                            pid: this.state.activePid,
                            activity: null
                        });
                        this.state.activeSocketId = null;
                        this.state.activePid = null;
                    }
                    if (this.state.activeStreamKey) {
                        Dispatcher.dispatch({
                            type: "STREAM_STOP",
                            streamKey: this.state.activeStreamKey
                        });
                        this.state.activeStreamKey = null;
                    }
                }
            } catch (_) {}
            this.originalGetRunningGames = null;
        }
    }
};
