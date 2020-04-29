let initial_state = {
    movies: [],
    displayMovies: []
}

export default function searchMoviesReducer(state = initial_state, action) {
    switch (action.type) {
        case "SET_SEARCH_MOVIES":
            return {
                ...state, 
                movies: action.movies,
                displayMovies: action.movies
            }
        
        case "SEARCH_MOVIES": 
            let movies = state.movies 
            let regEx = new RegExp(`${action.search_value}`, 'i')
            let displayMovies = movies.filter(movie => movie.title.match(regEx))
            return {
                ...state,
                displayMovies
            }
    
        default:
            return state
    }
}