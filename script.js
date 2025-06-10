class PomodoroTimer {
  constructor() {
    this.workTime = 25 * 60; // 25 minutes in seconds
    this.breakTime = 5 * 60; // 5 minutes in seconds
    this.currentTime = this.workTime;
    this.isRunning = false;
    this.isWorkSession = true;
    this.sessionCount = 1;
    this.timer = null;

    this.timerDisplay = document.getElementById("timerDisplay");
    this.startBtn = document.getElementById("startBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.sessionCountDisplay = document.getElementById("sessionCount");
    this.statusDisplay = document.getElementById("status");
    this.progressCircle = document.querySelector(".progress-ring-progress");

    this.setupProgressRing();
    this.bindEvents();
    this.updateDisplay();
  }

  setupProgressRing() {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    this.progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    this.progressCircle.style.strokeDashoffset = circumference;
  }

  bindEvents() {
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.resetBtn.addEventListener("click", () => this.reset());
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startBtn.disabled = true;
      this.pauseBtn.disabled = false;
      this.statusDisplay.textContent = this.isWorkSession
        ? "Focus time!"
        : "Break time!";

      this.timer = setInterval(() => {
        this.currentTime--;
        this.updateDisplay();

        if (this.currentTime <= 0) {
          this.completeSession();
        }
      }, 1000);
    }
  }

  pause() {
    if (this.isRunning) {
      this.isRunning = false;
      this.startBtn.disabled = false;
      this.pauseBtn.disabled = true;
      this.statusDisplay.textContent = "Paused";
      clearInterval(this.timer);
    }
  }

  reset() {
    this.pause();
    this.isWorkSession = true;
    this.currentTime = this.workTime;
    this.sessionCount = 1;
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.statusDisplay.textContent = "Ready to focus";
    this.updateDisplay();
  }

  completeSession() {
    this.pause();

    // Play notification sound (using Web Audio API)
    this.playNotification();

    if (this.isWorkSession) {
      this.sessionCount++;
      this.isWorkSession = false;
      this.currentTime = this.breakTime;
      this.statusDisplay.textContent = "Work session complete! Take a break.";
    } else {
      this.isWorkSession = true;
      this.currentTime = this.workTime;
      this.statusDisplay.textContent =
        "Break complete! Ready for next session.";
    }

    this.startBtn.disabled = false;
    this.updateDisplay();
  }

  playNotification() {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  updateDisplay() {
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime % 60;
    this.timerDisplay.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    this.sessionCountDisplay.textContent = this.sessionCount;

    // Update progress ring
    const totalTime = this.isWorkSession ? this.workTime : this.breakTime;
    const progress = (totalTime - this.currentTime) / totalTime;
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - progress * circumference;
    this.progressCircle.style.strokeDashoffset = offset;
  }
}

// Initialize the timer when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new PomodoroTimer();
});
