import updateUserFavorateMovies from './updateUserFavorateMovies'
let initial_state = {
    login_users: [] ,
    current_user: null, 
    displayChat: false,
    user_lists: [],
    display_user_lists: [],
    view_friend_profile: null,
    display_current_user_img_in_nabar: true
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
                login_users: [...state.login_users, action.userName]
            }
        
        case "REMOVE_USER_LOGOUT":
            return{
                ...state,
                login_users: state.login_users.filter(username => username !== action.userName)
            }
            
        case "DISPLAY_CHAT": 
            return {
                ...state, 
                displayChat: !state.displayChat
            }

        case "ADD_TO_FAVORATE_MOVIE":
            let add_favorate_movies = [action.favorate_movie.id,...state.current_user.favorate_movies]
            updateUserFavorateMovies(add_favorate_movies,localStorage.token)
            return{
                ...state,
                current_user: {...state.current_user, favorate_movies: add_favorate_movies}
            }
            
        case "REMOVE_FROM_FAVORATE_MOVIE":
            let remove_favorate_movies = state.current_user.favorate_movies.filter(movieId => movieId !== action.favorate_movie.id)
            updateUserFavorateMovies(remove_favorate_movies,localStorage.token)
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

        case "ADD_TO_USER_LISTS": 
            return {
                ...state, 
                user_lists: action.userLists,
                display_user_lists: action.userLists
            }

        case "SEARCH_USER_NAME": 
            let usernameRegx = new RegExp(action.username, "i")
            let display_user_lists = state.user_lists.filter(user => user.username.match(usernameRegx))
            console.log(display_user_lists)
            return {
                ...state, 
                display_user_lists
            }

        case "ADDFRIEND": 
            return {
                ...state,
                current_user: {...state.current_user, friends_list: [action.friendname,...state.current_user.friends_list]}
            }
        
        case "UNFRIEND": 
            return {
                ...state,
                current_user: {...state.current_user, friends_list: state.current_user.friends_list.filter(friendname => friendname !== action.friendname)}
            }

        case "SET_VIEW_OBJ_PROFILE": 
            return {
                ...state,
                view_friend_profile: action.friend_obj
            }

        case "SET_CURRENT_USER_IMG_IN_NAVBAR": 
            return {
                ...state,
                display_current_user_img_in_nabar: action.status
            }

        default:
            return state
    }   
}