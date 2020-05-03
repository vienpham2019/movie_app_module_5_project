let initial_state = {
    login_users: [] ,
    current_user: null, 
    displayChat: false
}

export default function userReducer(state = initial_state, action) {
    switch (action.type) {
        case "SET_CURRENT_USER": 
            return {
                ...state,
                current_user: action.user
            }

        case "ADD_USER_LOGIN":
            return{
                ...state,
                login_users: [...state.login_users, {username: action.userName}]
            }
        
        case "REMOVE_USER_LOGOUT":
            return{
                ...state,
                login_users: state.login_users.filter(user => user.username !== action.userName)
            }
            
        case "DISPLAY_CHAT": 
            return {
                ...state, 
                displayChat: !state.displayChat
            }

        case "ADD_TO_FAVORATE_MOVIE":
            let add_favorate_movies = [action.favorate_movie,...state.current_user.favorate_movies]
            return{
                ...state,
                current_user: {...state.current_user, favorate_movies: add_favorate_movies}
            }
            
        case "REMOVE_FROM_FAVORATE_MOVIE":
            let remove_favorate_movies = state.current_user.favorate_movies.filter(movie => movie !== action.favorate_movie)
            return{
                ...state,
                current_user: {...state.current_user, favorate_movies: remove_favorate_movies}
            }

        case "UPDATE_CURRENT_USER": 
            let {user_profile_img} = action.current_user
            return {
                ...state,
                current_user: {...state.current_user, user_profile_img}, 
            }

        default:
            return state
    }   
}