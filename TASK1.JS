// Define the increase and decrease functions
function increase() {
    document.getElementById("imd").style.width = '400px';
}

function decrease() {
    document.getElementById("imd").style.width = '200px';
}

// Rest of your JavaScript code
document.addEventListener("DOMContentLoaded", function () {
    // Update the current day of the week and UTC time
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getUTCDay()];
    const utcTime = today.toISOString().substr(11, 8);

    document.querySelector('[data-testid="currentDayOfTheWeek"]').textContent = dayOfWeek;
    document.querySelector('[data-testid="currentUTCTime"]').textContent = utcTime;

    // BUTTON ELEMENT
    // Get the modal element
    var modal = document.getElementById('simpleModal');
    // Get open modal button
    var modalBtn = document.getElementById('modalBtn');
    // Get close button
    var closeBtn = document.querySelector('.closeBtn'); // Use querySelector to select the first element with class 'closeBtn'
    // Listen for open click
    modalBtn.addEventListener('click', openModal);
    // Listen for close click 
    closeBtn.addEventListener('click', closeModal);
    // Listen for outside click 
    window.addEventListener('click', outsideClick);

    // Function to open modal
    function openModal() {
        modal.style.display = 'block';
    }

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Function to close modal if outside click
    function outsideClick(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Rest of your code
});
