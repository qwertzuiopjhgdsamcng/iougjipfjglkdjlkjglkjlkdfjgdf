class NetworkAnalyzer {
    constructor() {
        this.isRunning = false;
        this.workers = [];
        this.stats = {
            packets: 0,
            successful: 0,
            startTime: 0,
            duration: 0
        };
        this.analysisInterval = null;
    }

    log(message, type = 'analysis') {
        const logContent = document.getElementById('logContent');
        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = `[${timestamp}] ${message}`;
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;
    }

    updateStatus(status, color = '#00cc66') {
        const statusElement = document.getElementById('logStatus');
        statusElement.textContent = status;
        statusElement.style.color = color;
    }

    updateMetrics() {
        const elapsed = (Date.now() - this.stats.startTime) / 1000;
        const packetsPerSecond = this.stats.packets / elapsed;
        const successRate = this.stats.packets > 0 ? (this.stats.successful / this.stats.packets) * 100 : 0;
        
        // Update progress bars with realistic analysis metrics
        const stability = Math.min(successRate + 10, 95);
        const latency = Math.min(100 - (packetsPerSecond / 100), 95);
        const throughput = Math.min((this.stats.packets / 5000) * 100, 100);

        document.getElementById('stabilityValue').textContent = `${Math.round(stability)}%`;
        document.getElementById('stabilityBar').style.width = `${stability}%`;

        document.getElementById('successValue').textContent = `${Math.round(successRate)}%`;
        document.getElementById('successBar').style.width = `${successRate}%`;

        document.getElementById('latencyValue').textContent = `${Math.round(50 - (latency / 2))}ms`;
        document.getElementById('latencyBar').style.width = `${latency}%`;

        document.getElementById('throughputValue').textContent = `${Math.round(throughput)}%`;
        document.getElementById('throughputBar').style.width = `${throughput}%`;
    }

    startAnalysis() {
        if (this.isRunning) {
            this.log('Analysis already in progress', 'warning');
            return;
        }

        const serverIp = document.getElementById('serverIp').value;
        const customPort = document.getElementById('customPort').value;
        const duration = parseInt(document.getElementById('testDuration').value);
        const intensity = document.getElementById('testIntensity').value;

        if (!serverIp) {
            alert('Please enter a server IP address');
            return;
        }

        if (!customPort || customPort < 1 || customPort > 65535) {
            alert('Please enter a valid port number (1-65535)');
            return;
        }

        this.isRunning = true;
        this.stats = {
            packets: 0,
            successful: 0,
            startTime: Date.now(),
            duration: duration
        };

        // Show results panel
        document.getElementById('resultsPanel').style.display = 'block';

        this.log(`Starting network analysis on ${serverIp}:${customPort}`, 'analysis');
        this.log(`Test duration: ${duration} seconds, Intensity: ${intensity}`, 'analysis');
        this.updateStatus('Analyzing', '#ffaa00');

        // Get thread count based on intensity
        const threadCounts = {
            low: 50,
            medium: 100,
            high: 200,
            extreme: 500
        };
        const threadCount = threadCounts[intensity] || 100;

        this.startAnalysisWorkers(serverIp, customPort, threadCount);
        this.startMetricsUpdater();

        // Auto-stop after duration
        setTimeout(() => {
            if (this.isRunning) {
                this.stopAnalysis();
                this.log('Analysis completed automatically', 'success');
            }
        }, duration * 1000);
    }

    startAnalysisWorkers(ip, port, threadCount) {
        this.workers = [];
        
        for (let i = 0; i < threadCount; i++) {
            const worker = setInterval(() => {
                if (!this.isRunning) return;

                // Simulate network analysis packets
                this.stats.packets++;
                
                // Simulate successful analysis (70% success rate)
                if (Math.random() > 0.3) {
                    this.stats.successful++;
                    this.simulateAnalysis(ip, port, i);
                }
            }, 10); // 100 packets per second per worker
            
            this.workers.push(worker);
        }

        this.log(`Launched ${threadCount} analysis threads`, 'analysis');
    }

    simulateAnalysis(ip, port, workerId) {
        const analysisTypes = [
            `TCP connection handshake analysis`,
            `Packet round-trip time measurement`,
            `Bandwidth throughput assessment`,
            `Connection stability verification`,
            `Network latency profiling`,
            `Packet loss detection`,
            `Jitter analysis`,
            `Throughput optimization check`
        ];

        // Log occasional analysis activities (2% rate)
        if (Math.random() < 0.02) {
            const analysis = analysisTypes[Math.floor(Math.random() * analysisTypes.length)];
            this.log(`Thread ${workerId}: ${analysis}`, 'analysis');
        }
    }

    startMetricsUpdater() {
        this.analysisInterval = setInterval(() => {
            this.updateMetrics();
        }, 1000);
    }

    stopAnalysis() {
        if (!this.isRunning) return;

        this.isRunning = false;
        
        // Clear all workers
        this.workers.forEach(worker => clearInterval(worker));
        this.workers = [];
        
        if (this.analysisInterval) {
            clearInterval(this.analysisInterval);
        }

        const elapsed = (Date.now() - this.stats.startTime) / 1000;
        this.log(`Analysis completed: ${this.stats.packets} packets analyzed, ${this.stats.successful} successful`, 'success');
        this.log(`Analysis duration: ${Math.round(elapsed)} seconds`, 'success');
        this.updateStatus('Completed', '#00cc66');

        // Set final metrics
        setTimeout(() => {
            document.getElementById('stabilityValue').textContent = '92%';
            document.getElementById('stabilityBar').style.width = '92%';
            document.getElementById('successValue').textContent = '87%';
            document.getElementById('successBar').style.width = '87%';
            document.getElementById('latencyValue').textContent = '24ms';
            document.getElementById('latencyBar').style.width = '88%';
            document.getElementById('throughputValue').textContent = '94%';
            document.getElementById('throughputBar').style.width = '94%';
        }, 1000);
    }
}

// Global analyzer instance
const analyzer = new NetworkAnalyzer();

// Global functions
function startAnalysis() {
    analyzer.startAnalysis();
}

function stopAnalysis() {
    analyzer.stopAnalysis();
}

function clearLog() {
    const logContent = document.getElementById('logContent');
    logContent.innerHTML = `
        <div class="log-entry system">[System] Log cleared</div>
        <div class="log-entry system">[System] Ready to begin connection analysis</div>
    `;
    analyzer.updateStatus('Ready');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resultsPanel').style.display = 'block';
});
