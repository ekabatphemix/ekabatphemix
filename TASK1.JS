document.addEventListener("DOMContentLoaded", function () {
    // Function to update the current UTC time in milliseconds
    function updateUTCTime() {
        const currentTimeMillis = new Date().getTime();
        document.querySelector('[data-testid="currentUTCTime"]').textContent = currentTimeMillis + " milliseconds";
    }

    // Update the UTC time immediately
    updateUTCTime();

    // Update the UTC time every second (1000 milliseconds)
    setInterval(updateUTCTime, 1000);

    // Update the current day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getUTCDay()];
    document.querySelector('[data-testid="currentDayOfTheWeek"]').textContent = dayOfWeek;
});
