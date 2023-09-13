function updateUTCTime() {
    const currentUTCTime = new Date().getTime();
    document.querySelector('[data-testid="currentUTCTime"]').textContent = `Current UTC Time: ${currentUTCTime} milliseconds`;
}

// Update the time initially
updateUTCTime();

// Update the time every second (1000 milliseconds)
setInterval(updateUTCTime, 1000);

// Current Day of the Week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDate = new Date();
const currentDay = daysOfWeek[currentDate.getUTCDay()];
document.querySelector('[data-testid="currentDayOfTheWeek"]').textContent = `Current Day of the Week: ${currentDay}`;