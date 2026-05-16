/**
 * @name Loopr
 * @author M3ZA
 * @version 1.0.0
 * @description A sleek, automated Discord Quest completion tool with a modern HUD and smart synchronization.
 * @source https://github.com/M3ZA/Loopr
 */

const Theme = {
    glass: "rgba(10, 10, 15, 0.85)", 
    border: "rgba(0, 191, 255, 0.3)", 
    accent: "#00BFFF", 
    text: "#ffffff",
    font: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
};

const injectGlobalStyles = () => {
    if (document.getElementById("loopr-styles")) return;
    const styleTag = document.createElement("style");
    styleTag.id = "loopr-styles";
    styleTag.innerHTML = `
        @keyframes looprPop { 
            0% { transform: scale(0.8) translateY(30px); opacity: 0; } 
            60% { transform: scale(1.02) translateY(-5px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; } 
        }
        @keyframes toastSlide {
            0% { transform: translate(-50%, -100%); opacity: 0; }
            10% { transform: translate(-50%, 20px); opacity: 1; }
            90% { transform: translate(-50%, 20px); opacity: 1; }
            100% { transform: translate(-50%, -100%); opacity: 0; }
        }
        .loopr-log { margin-bottom: 6px; padding: 4px 8px; border-radius: 6px; transition: all 0.3s ease; display: flex; align-items: center; }
        #loopr-logs > .loopr-log:nth-child(1) { opacity: 1; }
        #loopr-logs > .loopr-log:nth-child(2) { opacity: 0.8; }
        #loopr-logs > .loopr-log:nth-child(3) { opacity: 0.5; }
        #loopr-logs > .loopr-log:nth-child(n+4) { opacity: 0.3; }
        #loopr-logs > .loopr-log:hover { opacity: 1 !important; background: rgba(0,191,255,0.1); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,191,255,0.5); border-radius: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
    `;
    document.head.appendChild(styleTag);
};

const createElement = (tag, attributes = {}, styles = {}, innerHTML = "") => {
    const element = document.createElement(tag);
    Object.assign(element, attributes);
    Object.assign(element.style, styles);
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
};

module.exports = class Loopr {
    constructor() {
        this.DOM_IDS = { 
            button: "loopr-btn", 
            console: "loopr-con", 
            percentText: "loopr-perc", 
            timerText: "loopr-time", 
            islandText: "loopr-island-txt",
            logsArea: "loopr-logs"
        };
        
        this.state = {
            isRunning: false,
            logs: [],
            currentProgress: 0,
            targetDuration: 900
        };

        this.intervals = { timer: null };
        this.originalGetRunningGames = null; 
        this.dragState = { isDragging: false, offsetX: 0, offsetY: 0 };
    }

    start() { 
        injectGlobalStyles();
        this.renderFloatingButton(); 
    }
    
    stop() { 
        this.stopEngineAndCleanup(); 
        this.removeElement(this.DOM_IDS.console);
        this.removeElement(this.DOM_IDS.button);
    }
    
    renderFloatingButton() {
        if (document.getElementById(this.DOM_IDS.button)) return;

        const buttonStyle = {
            position: "fixed", bottom: "90px", right: "20px", height: "55px", minWidth: "55px",
            background: "rgba(0,0,0,0.8)", backdropFilter: "blur(15px)",
            borderRadius: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)", 
            display: "flex", alignItems: "center", justifyContent: "center", padding: "0",
            cursor: "pointer", zIndex: "9999", border: `1px solid ${Theme.border}`,
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            overflow: "hidden", whiteSpace: "nowrap"
        };

        const buttonHTML = `
            <div style="display:flex; align-items:center; justify-content:center; width:55px; height:55px; flex-shrink:0;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#00BFFF" style="filter: drop-shadow(0 0 5px #00BFFF);"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8s8,3.59,8,8C20,16.41,16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z"/></svg>
            </div>
            <div id="${this.DOM_IDS.islandText}" style="width:0; opacity:0; color:#fff; font-weight:bold; font-family:${Theme.font}; font-size:14px; transition:all 0.4s; overflow:hidden;"></div>
        `;

        const floatingBtn = createElement("div", { id: this.DOM_IDS.button }, buttonStyle, buttonHTML);

        floatingBtn.onmouseenter = () => { if(!this.state.isRunning) floatingBtn.style.boxShadow = "0 10px 30px rgba(0,191,255,0.4)"; };
        floatingBtn.onmouseleave = () => { if(!this.state.isRunning) floatingBtn.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)"; };

        floatingBtn.onclick = () => {
            if (this.state.isRunning) {
                const consoleEl = document.getElementById(this.DOM_IDS.console);
                if (consoleEl) {
                    this.removeElement(this.DOM_IDS.console);
                    this.toggleDynamicIsland(true);
                } else {
                    this.toggleDynamicIsland(false);
                    this.renderConsole();
                }
            } else {
                this.state.logs = [];
                this.state.currentProgress = 0;
                this.toggleDynamicIsland(false);
                this.renderConsole();
                this.startEngine();
            }
        };

        document.body.appendChild(floatingBtn);
    }

    renderConsole() {
        if (document.getElementById(this.DOM_IDS.console)) return;

        const consoleContainer = createElement("div", { id: this.DOM_IDS.console }, {
            position: "fixed", bottom: "170px", right: "20px", width: "360px", height: "320px",
            background: Theme.glass, backdropFilter: "blur(25px) saturate(150%)",
            borderRadius: "20px", border: `1px solid rgba(255,255,255,0.1)`,
            color: Theme.text, fontFamily: Theme.font, fontSize: "12px",
            zIndex: "10000", display: "flex", flexDirection: "column",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset",
            animation: "looprPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.1)"
        });

        const header = createElement("div", {}, {
            height: "45px", display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "0 15px", borderBottom: `1px solid rgba(255,255,255,0.05)`,
            background: "rgba(255,255,255,0.02)", cursor: "grab", borderTopLeftRadius: "20px", borderTopRightRadius: "20px"
        });
        
        this.attachDragLogic(header, consoleContainer);

        const titleText = `<span style="opacity:0.5; font-weight:normal;">LOOPR //</span> <b style="color:#00BFFF; text-shadow: 0 0 10px rgba(0,191,255,0.5);">CORE</b>`;
        const title = createElement("div", {}, { fontSize: "12px", letterSpacing: "1px", pointerEvents: "none" }, titleText);
        
        const controls = createElement("div", { className: "controls" }, { display: "flex", gap: "12px", alignItems: "center" });
        
        const minimizeBtn = this.createControlButton(
            `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
            "#fff", "rgba(255,255,255,0.5)", 
            () => { this.removeElement(this.DOM_IDS.console); this.toggleDynamicIsland(true); }
        );
        
        const closeBtn = this.createControlButton(
            `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
            "#ff4444", "rgba(255,68,68,0.7)", 
            () => { 
                if(confirm("Terminate Loopr Core?")) { 
                    this.stopEngineAndCleanup(); 
                    this.removeElement(this.DOM_IDS.console); 
                    this.toggleDynamicIsland(false); 
                } 
            }
        );

        controls.appendChild(minimizeBtn);
        controls.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(controls);
        consoleContainer.appendChild(header);

        const hudArea = createElement("div", {}, {
            height: "100px", background: "linear-gradient(180deg, rgba(0,191,255,0.08) 0%, transparent 100%)",
            display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "0 25px"
        });
        
        const percentElement = createElement("div", { id: this.DOM_IDS.percentText }, {
            fontSize: "42px", fontWeight: "900", color: "#00BFFF", fontFamily: "system-ui",
            textShadow: "0 4px 20px rgba(0,191,255,0.6)", letterSpacing: "-1px"
        }, "0%");
        
        const timeBoxHTML = `
            <div style="font-size:10px; color:rgba(255,255,255,0.4); letter-spacing:1px; font-weight:bold;">SYNC STATUS</div>
            <div id="${this.DOM_IDS.timerText}" style="font-size:18px; font-weight:600; color:#fff; font-family:'Roboto Mono', monospace;">00:00 <span style="opacity:0.4;">/ 00:00</span></div>
        `;
        const timeBox = createElement("div", {}, { display: "flex", flexDirection: "column", alignItems: "flex-end" }, timeBoxHTML);

        hudArea.appendChild(percentElement);
        hudArea.appendChild(timeBox);
        consoleContainer.appendChild(hudArea);

        const logsArea = createElement("div", { id: this.DOM_IDS.logsArea }, {
            flex: "1", overflowY: "auto", display: "flex", flexDirection: "column-reverse", 
            padding: "10px 20px 20px 20px"
        });
        consoleContainer.appendChild(logsArea);

        document.body.appendChild(consoleContainer);
        this.renderStoredLogs();
        this.updateHUDDisplay();
    }

    createControlButton(svgIcon, hoverColor, defaultColor, onClickHandler) {
        const btn = createElement("div", {}, { cursor: "pointer", color: defaultColor, transition: "0.2s" }, svgIcon);
        btn.onmouseenter = () => { btn.style.color = hoverColor; if(hoverColor === "#ff4444") btn.style.filter = "drop-shadow(0 0 5px red)"; };
        btn.onmouseleave = () => { btn.style.color = defaultColor; btn.style.filter = "none"; };
        btn.onclick = onClickHandler;
        return btn;
    }

    attachDragLogic(headerElement, containerElement) {
        headerElement.onmousedown = (event) => {
            if(event.target.closest('.controls')) return;
            this.dragState.isDragging = true;
            headerElement.style.cursor = "grabbing";
            const rect = containerElement.getBoundingClientRect();
            this.dragState.offsetX = event.clientX - rect.left;
            this.dragState.offsetY = event.clientY - rect.top;
            containerElement.style.bottom = "auto"; 
            containerElement.style.right = "auto";
            containerElement.style.left = rect.left + "px";
            containerElement.style.top = rect.top + "px";
            containerElement.style.transition = "none"; 
        };

        document.addEventListener('mousemove', (event) => {
            if(!this.dragState.isDragging) return;
            containerElement.style.left = (event.clientX - this.dragState.offsetX) + "px";
            containerElement.style.top = (event.clientY - this.dragState.offsetY) + "px";
        });

        document.addEventListener('mouseup', () => {
            if(this.dragState.isDragging) {
                this.dragState.isDragging = false;
                headerElement.style.cursor = "grab";
                containerElement.style.transition = "opacity 0.3s ease"; 
            }
        });
    }

    toggleDynamicIsland(isActive) {
        const btn = document.getElementById(this.DOM_IDS.button);
        const textElement = document.getElementById(this.DOM_IDS.islandText);
        if(!btn || !textElement) return;

        if (isActive) {
            btn.style.minWidth = "120px";
            btn.style.paddingRight = "20px";
            textElement.style.width = "auto";
            textElement.style.opacity = "1";
            btn.style.boxShadow = "0 0 20px rgba(0,191,255,0.4)";
        } else {
            btn.style.minWidth = "55px";
            btn.style.paddingRight = "0";
            textElement.style.width = "0";
            textElement.style.opacity = "0";
            btn.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
        }
    }

    displayToastNotification(message) {
        this.removeElement("loopr-toast");

        const toastStyle = {
            position: "fixed", top: "30px", left: "50%", transform: "translate(-50%, -100%)",
            background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 191, 255, 0.4)", borderRadius: "30px",
            color: "#fff", padding: "12px 24px", fontSize: "14px", fontWeight: "bold",
            display: "flex", alignItems: "center", gap: "10px", zIndex: "99999",
            boxShadow: "0 10px 40px rgba(0,191,255,0.3)",
            animation: "toastSlide 4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"
        };

        const iconHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
        const toastHTML = `${iconHTML} <span>${message}</span>`;
        
        const toast = createElement("div", { id: "loopr-toast" }, toastStyle, toastHTML);
        document.body.appendChild(toast);
        
        setTimeout(() => this.removeElement("loopr-toast"), 4500);
    }

    removeElement(elementId) { 
        const el = document.getElementById(elementId);
        if(el) el.remove(); 
    }

    formatSecondsToTime(seconds) {
        if (!seconds || isNaN(seconds)) return "00:00";
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    updateHUDDisplay() {
        const current = this.state.currentProgress;
        const target = this.state.targetDuration;

        const percentElement = document.getElementById(this.DOM_IDS.percentText);
        const timerElement = document.getElementById(this.DOM_IDS.timerText);
        const islandTextElement = document.getElementById(this.DOM_IDS.islandText);
        
        const safeTarget = (target && target > 0) ? target : 1;
        const percentage = Math.min(100, Math.max(0, Math.floor((current / safeTarget) * 100)));
        
        if (percentElement) percentElement.innerText = `${percentage}%`;
        if (timerElement) timerElement.innerHTML = `${this.formatSecondsToTime(current)} <span style="opacity:0.4;">/ ${this.formatSecondsToTime(safeTarget)}</span>`;
        if (islandTextElement) islandTextElement.innerText = `${percentage}%  ⏳`; 
    }

    logMessage(message, type = "info") {
        this.state.logs.push({ message, type });
        this.appendLogToUI(message, type);
    }

    appendLogToUI(message, type) {
        const logsContainer = document.getElementById(this.DOM_IDS.logsArea);
        if (!logsContainer) return;

        let textColor = "rgba(255,255,255,0.7)";
        let iconColor = "inherit";
        let iconSymbol = "-";

        if (type === "err") { textColor = "#ff5555"; iconSymbol = "x"; }
        else if (type === "warn") { textColor = "#ffcc00"; iconSymbol = "!"; }
        else if (type === "success") { textColor = "#00BFFF"; iconSymbol = ">"; iconColor = "#00BFFF"; }
        
        const lineHTML = `<span style="color:${iconColor}; margin-right:8px; font-size:14px; font-weight:bold;">${iconSymbol}</span> <span style="color:${textColor}">${message}</span>`;
        const logLine = createElement("div", { className: "loopr-log" }, {}, lineHTML);

        if (logsContainer.childNodes.length > 0) {
            logsContainer.insertBefore(logLine, logsContainer.childNodes[0]);
        } else {
            logsContainer.appendChild(logLine);
        }
    }

    renderStoredLogs() {
        const logsContainer = document.getElementById(this.DOM_IDS.logsArea);
        if (!logsContainer) return;
        
        [...this.state.logs].forEach(logData => {
            this.appendLogToUI(logData.message, logData.type);
        });
        
        this.state.logs.reverse();
    }

    getDiscordDispatcher(WebpackModule) {
        let dispatcher = WebpackModule.getModule(m => m.dispatch && m.subscribe, { searchExports: true });
        if (dispatcher) return dispatcher;
        
        const fallbackDispatcher = WebpackModule.getModule(m => m?.Z?.dispatch && m?.Z?.subscribe);
        if (fallbackDispatcher) return fallbackDispatcher.Z;
        
        return null;
    }

    async startEngine() {
        this.state.isRunning = true;
        
        if(this.intervals.timer) clearInterval(this.intervals.timer);
        this.intervals.timer = setInterval(() => {
            if(this.state.isRunning && this.state.targetDuration > 0 && this.state.currentProgress < this.state.targetDuration) {
                this.state.currentProgress += 1;
                this.updateHUDDisplay();
            }
        }, 1000);

        this.logMessage("Loopr Core Initialized...", "success");

        try {
            const { Webpack } = BdApi;
            
            const discordModules = {
                QuestsStore: Webpack.getStore("QuestsStore") || Webpack.getModule(m => m.getQuest, {searchExports: true}),
                RunningGameStore: Webpack.getStore("RunningGameStore"),
                FluxDispatcher: this.getDiscordDispatcher(Webpack),
                AuthStore: Webpack.getStore("AuthenticationStore"),
                TokenModule: Webpack.getModule(m => m.getToken && !m.getLocale, {searchExports: true})
            };

            if(!discordModules.QuestsStore || !discordModules.FluxDispatcher) throw new Error("Core Modules Missing. Did Discord update?");
            
            const userToken = discordModules.AuthStore?.getToken() || discordModules.TokenModule?.getToken();
            if(!userToken) throw new Error("Authentication Token Missing");

            const rawQuestsData = discordModules.QuestsStore.getQuests ? discordModules.QuestsStore.getQuests() : discordModules.QuestsStore.quests;
            const questsArray = (rawQuestsData instanceof Map) ? [...rawQuestsData.values()] : Object.values(rawQuestsData);
            
            const activeQuests = questsArray.filter(quest => quest.userStatus?.enrolledAt && !quest.userStatus?.completedAt && new Date(quest.config.expiresAt).getTime() > Date.now());

            if(activeQuests.length === 0) { 
                this.logMessage("No active quests found.", "warn"); 
                this.stopEngineAndCleanup(); 
                return; 
            }

            let targetQuest = null, taskKeyName = null, targetDuration = 0;
            
            for (const currentQuest of activeQuests) {
                const taskConfig = currentQuest.config?.taskConfig || currentQuest.config?.taskConfigV2;
                if (!taskConfig || !taskConfig.tasks) continue;
                
                for (const key of Object.keys(taskConfig.tasks)) {
                    const requiredTime = taskConfig.tasks[key]?.target;
                    if (typeof requiredTime === 'number' && requiredTime > 60) {
                        targetQuest = currentQuest; 
                        taskKeyName = key; 
                        targetDuration = requiredTime; 
                        break;
                    }
                }
                if (targetQuest) break;
            }

            if (!targetQuest) throw new Error("No valid time targets (> 60s) found.");

            const applicationName = targetQuest.config.messages.gameTitle || targetQuest.config.messages.questName;
            
            let initialProgress = 0;
            if (targetQuest.userStatus?.progress) {
                for (const progressData of Object.values(targetQuest.userStatus.progress)) {
                    if (typeof progressData.value === 'number' && progressData.value > initialProgress) {
                        initialProgress = progressData.value;
                    }
                }
            }

            this.state.currentProgress = initialProgress;
            this.state.targetDuration = targetDuration;
            this.updateHUDDisplay();
            this.logMessage(`Locked Target: ${applicationName}`, "success");

            const isVideoTask = taskKeyName.includes("WATCH") || (!taskKeyName.includes("PLAY") && !targetQuest.config.application?.id);

            if (isVideoTask) {
                await this.executeVideoProtocol(targetQuest.id, userToken, targetDuration);
            } else {
                await this.executeGameProtocol(discordModules, targetQuest.config.application?.id, applicationName, userToken, targetDuration, targetQuest.id, taskKeyName);
            }

        } catch(error) {
            this.logMessage(error.message, "err");
            this.stopEngineAndCleanup();
        }
    }

    async executeVideoProtocol(questId, userToken, targetDuration) {
        this.logMessage("Stream Protocol Active");
        
        while (this.state.isRunning && this.state.currentProgress < targetDuration) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            this.state.currentProgress = Math.max(this.state.currentProgress + 5, this.state.currentProgress);
            
            try {
                await fetch(`/api/v9/quests/${questId}/video-progress`, {
                    method: "POST", 
                    headers: { "Authorization": userToken, "Content-Type": "application/json" },
                    body: JSON.stringify({ timestamp: this.state.currentProgress })
                });
            } catch(e) { 
                // Ignore transient network errors
            }
            
            if (this.state.currentProgress >= targetDuration) {
                this.finalizeQuestCompletion();
            }
        }
    }

    async executeGameProtocol(discordModules, applicationId, applicationName, userToken, targetDuration, questId, taskKeyName) {
        this.logMessage("Local Spoofing Active");
        
        let executableName = `${applicationName}.exe`;
        try {
            if (applicationId) {
                const response = await fetch(`https://discord.com/api/v9/applications/public?application_ids=${applicationId}`, { headers: { "Authorization": userToken } });
                const appData = await response.json();
                const windowsExecutable = appData?.[0]?.executables?.find(exe => exe.os === "win32");
                if (windowsExecutable) executableName = windowsExecutable.name.replace(">", "");
            }
        } catch(e) { 
            // Fallback to default name estimation on failure
        }

        const processId = Math.floor(Math.random() * 20000) + 1000;
        const simulatedGame = {
            cmdLine: `C:\\Program Files\\${applicationName}\\${executableName}`,
            exeName: executableName, 
            exePath: `c:/path/${executableName}`,
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

        while (this.state.isRunning) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            const rawQuestsData = discordModules.QuestsStore.getQuests ? discordModules.QuestsStore.getQuests() : discordModules.QuestsStore.quests;
            const questsArray = (rawQuestsData instanceof Map) ? [...rawQuestsData.values()] : Object.values(rawQuestsData);
            const currentQuestData = questsArray.find(q => q.id === questId);
            
            if (!currentQuestData) break;
            
            const realServerProgress = currentQuestData.userStatus?.progress?.[taskKeyName]?.value || 0;
            if (realServerProgress > this.state.currentProgress) {
                this.state.currentProgress = realServerProgress;
            }
            
            this.updateHUDDisplay();
            
            if (realServerProgress >= targetDuration) {
                this.finalizeQuestCompletion();
                break;
            }
        }
    }

    finalizeQuestCompletion() {
        this.logMessage("PROCESS COMPLETED", "success");
        this.state.currentProgress = this.state.targetDuration;
        this.updateHUDDisplay();
        
        this.displayToastNotification("Loopr: Quest Completed Successfully!");
        
        this.stopEngineAndCleanup();
    }

    stopEngineAndCleanup() {
        this.state.isRunning = false;
        this.toggleDynamicIsland(false);
        
        if (this.intervals.timer) {
            clearInterval(this.intervals.timer);
        }
        
        if (this.originalGetRunningGames) {
            const { Webpack } = BdApi;
            const RunningGameStore = Webpack.getStore("RunningGameStore");
            const Dispatcher = this.getDiscordDispatcher(Webpack);
            
            if (RunningGameStore) RunningGameStore.getRunningGames = this.originalGetRunningGames;
            if (Dispatcher) Dispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", games: [], added: [], removed: [] });
            
            this.originalGetRunningGames = null;
        }
    }
};