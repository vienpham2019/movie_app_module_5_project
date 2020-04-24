let initialState = {
    movies: [],
    movie: {},
    displayMovie: {},
    showMovieReviews: [],
    makeLikeAction: []
}

export default function movieReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_MOVIES":
            return{
                ...state,
                movies: action.movies
            }
        
        case "SET_MOVIE_ID": 
            return{
                ...state,
                movie: action.movie,
                displayMovie: state.movies.find(movie => movie.id === action.movie.movieId)
            }

        case "SET_SHOW_MOVIE_REVIEWS": 
            return{
                ...state, 
                showMovieReviews: action.reviews
            }

        case "ADD_REVIEW":
            let new_review = {
                author: "Vien",
                content: action.review,
                likes: 0 ,
                dislikes: 0, 
                nestedComments: []
            }
            
            return{
                ...state, 
                showMovieReviews: [new_review,...state.showMovieReviews]
            }

        case "ADD_TO_NESTED_COMMENTS": 
            let reviewIndex = state.showMovieReviews.indexOf(action.review)
            let newComment = {
                author: "Vien",
                content: action.comment,
                likes: 0,
                dislikes: 0
            }
            let updateReview = state.showMovieReviews[reviewIndex]
            updateReview.nestedComments = [newComment,...updateReview.nestedComments]
            console.log(updateReview)
            return{
                ...state, 
                showMovieReviews: [...state.showMovieReviews.slice(0,reviewIndex),updateReview,...state.showMovieReviews.slice(reviewIndex + 1)]
            }

        case "ADD_LIKE": 
            let likeIndex = state.showMovieReviews.indexOf(action.review)
            let newReviewForLike = state.showMovieReviews[likeIndex]
            newReviewForLike.likes += action.amount

            return {
                ...state,
                showMovieReviews: [...state.showMovieReviews.slice(0,likeIndex),newReviewForLike,...state.showMovieReviews.slice(likeIndex + 1)]
            }

        case "ADD_DISLIKE": 
            let dislikeIndex = state.showMovieReviews.indexOf(action.review)
            let newReviewForDislike = state.showMovieReviews[dislikeIndex]
            newReviewForDislike.dislikes += action.amount

            return {
                ...state,
                showMovieReviews: [...state.showMovieReviews.slice(0,dislikeIndex),newReviewForDislike,...state.showMovieReviews.slice(dislikeIndex + 1)]
            }
    
        default:
            return state
    }
}