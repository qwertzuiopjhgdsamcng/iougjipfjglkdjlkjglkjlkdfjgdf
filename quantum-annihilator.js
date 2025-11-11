// Matrix background animation
const matrixBg = document.getElementById('matrixBg');
const chars = '01010101010101010101010101010101';
let matrixText = '';

for (let i = 0; i < 200; i++) {
    matrixText += chars[Math.floor(Math.random() * chars.length)];
}

matrixBg.innerHTML = matrixText.split('').map(char => 
    `<span style="color: ${Math.random() > 0.5 ? '#00ff00' : '#0066ff'}; opacity: ${Math.random() * 0.5};">${char}</span>`
).join('');

class QuantumAnnihilator {
    constructor() {
        this.isRunning = false;
        this.workers = [];
        this.stats = {
            packets: 0,
            data: 0,
            connections: 0,
            startTime: 0,
            lastUpdate: 0
        };
        this.attackPower = 0;
        
        this.log("🔮 QUANTUM ANNIHILATOR INITIALIZED", "system");
        this.log("⚡ MAXIMUM POWER PROTOCOLS ENGAGED", "system");
        this.log("🎯 READY FOR SERVER OBLITERATION", "system");
    }

    log(message, type = "info") {
        const log = document.getElementById('log');
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
            system: "#9900ff",
            attack: "#ff0033", 
            success: "#00ff00",
            info: "#0066ff"
        };
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span style="color: ${colors[type] || colors.info}">[${timestamp}] ${message}</span>`;
        
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    }

    updateStats() {
        const now = Date.now();
        const elapsed = (now - this.stats.startTime) / 1000;
        const pps = Math.floor((this.stats.packets - this.stats.lastUpdate) / 1);
        
        document.getElementById('pps').textContent = this.formatNumber(pps * 1000);
        document.getElementById('dataSent').textContent = this.formatBytes(this.stats.data);
        document.getElementById('connections').textContent = this.formatNumber(this.stats.connections);
        
        // Update power level
        this.attackPower = Math.min(100, (pps / 10000) * 100);
        document.getElementById('powerLevel').style.width = this.attackPower + '%';
        
        document.getElementById('stats').innerHTML = 
            `POWER LEVEL: <span style="color: #ff0033">${Math.floor(this.attackPower)}%</span> | ` +
            `DURATION: <span style="color: #00ff00">${Math.floor(elapsed)}s</span>`;
        
        this.stats.lastUpdate = this.stats.packets;
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    formatBytes(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    startQuantumAttack() {
        if (this.isRunning) {
            this.log("⚠️ QUANTUM CASCADE ALREADY IN PROGRESS", "system");
            return;
        }

        const target = document.getElementById('target').value;
        const port = parseInt(document.getElementById('port').value);
        const duration = parseInt(document.getElementById('duration').value);
        const method = document.getElementById('method').value;
        const threads = parseInt(document.getElementById('threads').value);
        const packetSize = parseInt(document.getElementById('packet_size').value);
        const delay = parseInt(document.getElementById('delay').value);
        const amplification = parseInt(document.getElementById('amplification').value);

        if (!target) {
            this.log("❌ QUANTUM TARGETING ERROR: NO IP SPECIFIED", "system");
            return;
        }

        this.isRunning = true;
        this.stats = {
            packets: 0,
            data: 0,
            connections: 0,
            startTime: Date.now(),
            lastUpdate: Date.now()
        };

        this.log(`🎯 QUANTUM LOCK ACQUIRED: ${target}:${port}`, "attack");
        this.log(`💥 INITIATING ${method.toUpperCase()} PROTOCOL`, "attack");
        this.log(`⚡ DEPLOYING ${threads} QUANTUM THREADS`, "attack");
        this.log(`⏰ TEMPORAL DURATION: ${duration} SECONDS`, "attack");

        // Start quantum workers
        this.startQuantumWorkers(target, port, method, threads, packetSize, delay, amplification);

        // Stats updater
        this.statsInterval = setInterval(() => this.updateStats(), 100);

        // Auto-terminate
        setTimeout(() => {
            if (this.isRunning) {
                this.stopQuantumAttack();
                this.log("⏰ TEMPORAL CYCLE COMPLETE", "system");
            }
        }, duration * 1000);
    }

    startQuantumWorkers(target, port, method, threads, packetSize, delay, amplification) {
        const workerBatch = Math.min(1000, threads);
        const batches = Math.ceil(threads / workerBatch);
        
        for (let batch = 0; batch < batches; batch++) {
            setTimeout(() => {
                if (!this.isRunning) return;
                
                const batchSize = Math.min(workerBatch, threads - (batch * workerBatch));
                this.log(`🚀 DEPLOYING QUANTUM BATCH ${batch + 1}/${batches} (${batchSize} THREADS)`, "attack");
                
                for (let i = 0; i < batchSize; i++) {
                    this.startQuantumWorker(target, port, method, packetSize, delay, amplification, (batch * workerBatch) + i);
                }
            }, batch * 100);
        }
    }

    startQuantumWorker(target, port, method, packetSize, delay, amplification, workerId) {
        const worker = {
            id: workerId,
            interval: setInterval(() => {
                if (!this.isRunning) return;
                
                try {
                    // Simulate massive packet generation
                    for (let i = 0; i < amplification; i++) {
                        this.executeQuantumAttack(target, port, method, packetSize, workerId);
                        this.stats.packets++;
                        this.stats.data += packetSize;
                    }
                    this.stats.connections++;
                } catch (e) {
                    this.log(`❌ QUANTUM WORKER ${workerId} INSTABILITY DETECTED`, "system");
                }
            }, Math.max(1, delay))
        };
        
        this.workers.push(worker);
    }

    executeQuantumAttack(target, port, method, packetSize, workerId) {
        const attacks = {
            quantum_sync: () => this.quantumSyncFlood(target, port, packetSize, workerId),
            neutron_blast: () => this.neutronBlastUDP(target, port, packetSize, workerId),
            blackhole_tcp: () => this.blackholeTCP(target, port, packetSize, workerId),
            fortnite_annihilator: () => this.fortniteAnnihilator(target, port, workerId),
            multiversal_storm: () => this.multiversalStorm(target, port, packetSize, workerId)
        };

        const attack = attacks[method] || attacks.quantum_sync;
        attack();
    }

    quantumSyncFlood(target, port, packetSize, workerId) {
        if (workerId % 1000 === 0) {
            this.log(`🌀 QUANTUM SYNC FLOOD: Worker ${workerId} targeting ${target}:${port}`, "attack");
        }
    }

    neutronBlastUDP(target, port, packetSize, workerId) {
        if (workerId % 1000 === 0) {
            this.log(`💣 NEUTRON BLAST: ${packetSize} byte payloads to ${target}:${port}`, "attack");
        }
    }

    blackholeTCP(target, port, packetSize, workerId) {
        if (workerId % 1000 === 0) {
            this.log(`🕳️ BLACKHOLE TCP: Infinite connection loop to ${target}:${port}`, "attack");
        }
    }

    fortniteAnnihilator(target, port, workerId) {
        if (workerId % 500 === 0) {
            const exploits = [
                "UNREAL ENGINE PROTOCOL CORRUPTION",
                "GAME STATE SYNCHRONIZATION OVERFLOW", 
                "PLAYER ENTITY REPLICATION STORM",
                "MATCHMAKING SERVICE IMPLOSION"
            ];
            const exploit = exploits[Math.floor(Math.random() * exploits.length)];
            this.log(`🎯 FORTNITE ANNIHILATOR: ${exploit} on ${target}:${port}`, "attack");
        }
    }

    multiversalStorm(target, port, packetSize, workerId) {
        if (workerId % 2000 === 0) {
            this.log(`🌪️ MULTIVERSAL STORM: Cross-dimensional packet bombardment on ${target}:${port}`, "attack");
        }
    }

    stopQuantumAttack() {
        if (!this.isRunning) return;

        this.isRunning = false;
        
        // Clear all quantum workers
        this.workers.forEach(worker => {
            clearInterval(worker.interval);
        });
        this.workers = [];
        
        if (this.statsInterval) {
            clearInterval(this.statsInterval);
        }

        const duration = (Date.now() - this.stats.startTime) / 1000;
        this.log(`🛑 QUANTUM CASCADE TERMINATED`, "system");
        this.log(`📊 FINAL STATISTICS: ${this.formatNumber(this.stats.packets)} packets | ${this.formatBytes(this.stats.data)} data | ${Math.floor(duration)}s duration`, "success");
        
        document.getElementById('powerLevel').style.width = '0%';
        document.getElementById('stats').textContent = "QUANTUM SYSTEMS STANDBY";
    }
}

// Global quantum instance
const quantumAnnihilator = new QuantumAnnihilator();

// Global functions
function startQuantumAttack() {
    quantumAnnihilator.startQuantumAttack();
}

function stopQuantumAttack() {
    quantumAnnihilator.stopQuantumAttack();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add some epic startup effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        quantumAnnihilator.log("🔧 QUANTUM ENTANGLEMENT MATRIX: ONLINE", "system");
        quantumAnnihilator.log("🎯 TARGETING SYSTEMS: CALIBRATED", "system");
        quantumAnnihilator.log("💥 ANNIHILATION PROTOCOLS: ARMED", "system");
    }, 1000);
});
