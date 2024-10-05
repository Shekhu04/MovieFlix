// Import createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the movie slice
const initialState = {
    info: null,  // Initially, there's no movie info, so it's set to null
};

// Create the movie slice using createSlice
// This slice contains the initial state, reducers (to update state), and actions
export const movieSlice = createSlice({
    name: "movie",  // Name of the slice, used to identify it in Redux
    initialState,   // The initial state object (with info: null)
    
    reducers: {
        // Reducer to load movie info into the state
        // This action updates the state with the movie data provided in action.payload
        loadMovie: (state, action) => {
            state.info = action.payload;  // Set the movie info to the data passed in the action
        },
        
        // Reducer to remove movie info (reset it to null)
        // This action clears the movie info, setting it back to null
        removeMovie: (state) => {
            state.info = null;  // Reset the movie info to null
        },
    },
});

// Export the generated action creators for loading and removing movie info
export const { loadMovie, removeMovie } = movieSlice.actions;

// Export the reducer function, which will be added to the Redux store
export default movieSlice.reducer;
