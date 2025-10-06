// frontend/src/services/api.js

// Define your backend API base URL
const API_BASE_URL = 'http://localhost:5000/api'; // Adjust port if necessary

// --- Example API Functions ---

// Fetch featured movies for the home page
export const fetchFeaturedMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/featured`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching featured movies:", error);
    return []; // Return empty array on error
  }
};

// Fetch all movies for the movies page
export const fetchMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch showtimes for a specific movie and date (example)
export const fetchShowtimes = async (movieId, date) => {
  try {
    // Construct URL with query parameters
    const url = new URL(`${API_BASE_URL}/showtimes`);
    if (movieId) url.searchParams.append('movieId', movieId);
    if (date) url.searchParams.append('date', date);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    return [];
  }
};

// Add other API functions as needed:
// export const bookSeats = async (bookingData) => { ... };
// export const processPayment = async (paymentData) => { ... };
// export const getUserBookings = async (userId) => { ... };
// export const updateUserProfile = async (userId, profileData) => { ... };