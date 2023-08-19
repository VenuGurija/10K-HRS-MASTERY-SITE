const playPauseButton = document.getElementById('playPause');
const progressBar = document.querySelector('.progress');
const timerDisplay = document.querySelector('.timer-display');

let isPlaying = false;
let totalTime = 10000 * 60 * 60; // Total time in seconds (10,000 hours)
let currentTime = localStorage.getItem('currentTime') || totalTime; // Load stored time if available
let timerInterval;

playPauseButton.addEventListener('click', () => {
    if (!isPlaying) {
        playPauseButton.textContent = 'Pause';
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        playPauseButton.textContent = 'Play';
        clearInterval(timerInterval);
        localStorage.setItem('currentTime', currentTime); // Store current time when paused
    }
    isPlaying = !isPlaying;
});

function updateTimer() {
    currentTime--;
    const percentage = (currentTime / totalTime) * 100;
    progressBar.style.width = percentage + '%';

    updateTimerDisplay(currentTime);

    if (currentTime <= 0) {
        clearInterval(timerInterval);
        playPauseButton.textContent = 'Play';
        isPlaying = false;
        localStorage.removeItem('currentTime'); // Clear stored time when timer is completed
    }
}

function updateTimerDisplay(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(timeValue) {
    return timeValue < 10 ? `0${timeValue}` : timeValue;
}

// Initialize timer bar width based on stored time
const storedPercentage = (currentTime / totalTime) * 100;
progressBar.style.width = storedPercentage + '%';
updateTimerDisplay(currentTime);
