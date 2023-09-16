const apiKey = 'abcd7db57a3c0318d19c260e2eb00567';

// Function to create a movie card element with a "Save" button
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.setAttribute('data-test-id', 'movie-card');

    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
    poster.alt = movie.title;
    poster.setAttribute('data-test-id', 'movie-poster');

    const title = document.createElement('h2');
    title.textContent = movie.title;
    title.setAttribute('data-test-id', 'movie-title');

    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release Date: ${movie.release_date}`;
    releaseDate.setAttribute('data-test-id', 'movie-release-date');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        saveMovie(movie);
    });

    // Add a "Details" button
    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'Details';
    detailsButton.addEventListener('click', () => {
        displayMovieDetails(movie);
    });

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(releaseDate);
    movieCard.appendChild(saveButton);
    movieCard.appendChild(detailsButton); // Add the "Details" button

    return movieCard;
}

// Function to save a movie to local storage
function saveMovie(movie) {
    const savedMovies = getSavedMovies();

    // Check if the movie is already saved
    if (!savedMovies.find(savedMovie => savedMovie.id === movie.id)) {
        savedMovies.push(movie);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        displaySavedMovies(); // Update the saved movies display

        // Show a success alert
        alert('Movie successfully saved. Go to "Saved Movies" to view.');
    } else {
        alert('Movie is already saved.'); // Display a message if the movie is already saved
    }
}

// Function to remove a movie from the saved list
function removeSavedMovie(movie) {
    const savedMovies = getSavedMovies();
    const updatedMovies = savedMovies.filter(savedMovie => savedMovie.id !== movie.id); // Assuming 'id' is a unique identifier for movies
    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
    displaySavedMovies(); // Update the saved movies display
}

// Function to retrieve saved movies from local storage
function getSavedMovies() {
    const savedMoviesJSON = localStorage.getItem('savedMovies');
    return savedMoviesJSON ? JSON.parse(savedMoviesJSON) : [];
}

// Function to display saved movies with remove buttons
function displaySavedMovies() {
    const savedMovies = getSavedMovies();
    const savedMoviesContainer = document.getElementById('savedMovies');

    savedMoviesContainer.innerHTML = ''; // Clear existing content

    savedMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);

        // Add a "Remove" button to the saved movie card
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeSavedMovie(movie);
        });

        movieCard.appendChild(removeButton);
        savedMoviesContainer.appendChild(movieCard);
    });
}

// Function to show the saved movies section and scroll to it
function showSavedMovies() {
    const savedMoviesSection = document.getElementById('savedMoviesSection');
    savedMoviesSection.style.display = 'block'; // Display the saved movies section

    // Scroll to the saved movies section
    savedMoviesSection.scrollIntoView({ behavior: 'smooth' });

    displaySavedMovies(); // Populate and display saved movies
}

// Event listener for the "Show Saved Movies" button
const showSavedMoviesButton = document.getElementById('showSavedMoviesButton');
showSavedMoviesButton.addEventListener('click', showSavedMovies);

// Event listener for the search input field
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query.length >= 3) {
            await searchMovies(query); // Wait for the searchMovies function to complete
        }
    }
});

// Function to search for movies
async function searchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();

        const movieGrid = document.getElementById('movieGrid');
        movieGrid.innerHTML = ''; // Clear existing content

        if (data.results && data.results.length > 0) {
            data.results.slice(0, 10).forEach(movie => {
                const movieCard = createMovieCard(movie);
                movieGrid.appendChild(movieCard);
            });
        } else {
            movieGrid.innerHTML = 'No results found.';
        }
    } catch (error) {
        console.error('Error searching for movies:', error);
    }
}

// Function to fetch and display top 10 movies
async function fetchTopMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const data = await response.json();

        const movieGrid = document.getElementById('movieGrid');
        movieGrid.innerHTML = ''; // Clear existing content

        data.results.slice(0, 10).forEach(movie => {
            const movieCard = createMovieCard(movie);
            movieGrid.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Error fetching top movies:', error);
    }
}

// Function to display movie details
function displayMovieDetails(movie) {
    // Create a modal or a separate section to display the details (you can use a library like Bootstrap Modal)
    // Example using an alert for simplicity:
    const detailsText = `Title: ${movie.title}\nOverview: ${movie.overview}\nDuration: ${movie.duration} minutes`;
    alert(detailsText);
}

// Call the fetchTopMovies function to load top movies on page load
fetchTopMovies();
