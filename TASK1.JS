// task1.js file
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

    // Fetch and update GitHub username and repository dynamically
    fetch('https://api.example.com/github-info') // Replace with the actual API endpoint
        .then(response => response.json())
        .then(data => {
            const githubUsername = data.username;
            const githubRepository = data.repository;
            document.querySelector('[data-testid="slackUserName"]').textContent = githubUsername;
            document.querySelector('[data-testid="githubURL"]').textContent = githubRepository;
            document.querySelector('[data-testid="githubURL"]').href = `https://github.com/${githubUsername}/${githubRepository}`;
        })
        .catch(error => {
            console.error('Error fetching GitHub information:', error);
        });
});
