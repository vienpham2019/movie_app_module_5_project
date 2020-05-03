
import { add_review , add_nested_comments , add_like_or_dislike_for_review , add_like_or_dislike_for_comment} from  './reducerAction/handleMovieAction'

let initialState = {
    movies: [],
    movie: {},
    displayMovie: {},
    showMovieReviews: [],
    showMovieReviewsId: null, 
    userName: null, 
    makeLikeAction: [],
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
                showMovieReviews: action.reviews,
                showMovieReviewsId: action.reviewId
            }

        case "SET_USER_NAME":
            return{
                ...state,
                userName: action.user_obj.userName
            }
        
        case "ADD_REVIEW":
            let add_review_obj = add_review(state.userName, action.review , state.showMovieReviews)
            
            return{
                ...state, 
                showMovieReviews: add_review_obj
            }

        case "ADD_TO_NESTED_COMMENTS": 
            
            let add_nested_comments_obj = add_nested_comments(state.userName, action.comment , action.review , state.showMovieReviews)

            return{
                ...state, 
                showMovieReviews: add_nested_comments_obj
            }

        case "ADD_LIKE_FOR_REVIEW": 

            let add_like_for_review_obj = 
                add_like_or_dislike_for_review( "likes" ,state.userName, action.amount , action.review , state.showMovieReviews)

            return {
                ...state,
                showMovieReviews: add_like_for_review_obj
            }

        case "ADD_DISLIKE_FOR_REVIEW": 

            let add_dislike_for_review_obj = 
                add_like_or_dislike_for_review("dislikes" ,state.userName , action.amount , action.review , state.showMovieReviews)

            return {
                ...state,
                showMovieReviews: add_dislike_for_review_obj
            }

        case "ADD_LIKE_FOR_COMMENT":

            let add_like_for_comment_obj = add_like_or_dislike_for_comment("likes" ,state.userName, action.amount , action.comment , action.review , state.showMovieReviews)

            return {
                ...state,
                showMovieReviews: add_like_for_comment_obj 
            }

        case "ADD_DISLIKE_FOR_COMMENT": 

            let add_dislike_for_comment_obj = add_like_or_dislike_for_comment("dislikes" ,state.userName, action.amount , action.comment , action.review , state.showMovieReviews)

            return {
                ...state,
                showMovieReviews: add_dislike_for_comment_obj 
            }
    
        default:
            return state
    }
}