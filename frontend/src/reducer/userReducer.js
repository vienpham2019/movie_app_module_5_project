import updateUserFavorateMovies from './updateUserFavorateMovies'
import {updateUserNotification,updateUserFriendsList,addNotification} from './userNotifications'
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
            return {
                ...state, 
                display_user_lists
            }

        case "SEND_ADDFRIEND_REQUEST": 
            let add_friend_request = state.user_lists.find(user => user.username === action.friendname)
            let add_notification = {  
                title: "Friend Requests",  
                friend: {username: state.current_user.username, user_profile_img: state.current_user.user_profile_img}
            }
            let add_notifications = [add_notification,...add_friend_request.notifications]
            let add_friends_request_name = [add_friend_request.username,...state.current_user.friends_request_name]
            updateUserNotification(add_friend_request.id, add_notifications, localStorage.token , add_friends_request_name)
            return {
                ...state,
                current_user: {...state.current_user,friends_request_name: add_friends_request_name}
            }

        case "CANCEL_ADDFRIEND_REQUEST": 
            let remove_friend_request = state.user_lists.find(user => user.username === action.friendname)
            let remove_notification = {  
                title: "Friend Requests",  
                friend: {username: state.current_user.username, user_profile_img: state.current_user.user_profile_img}
            }
            let remove_notifications = remove_friend_request.notifications.filter(notif => notif !== remove_notification)
            let remove_friends_request_name = state.current_user.friends_request_name.filter(friendname => friendname !== remove_friend_request.username)
            updateUserNotification(remove_friend_request.id, remove_notifications, localStorage.token , remove_friends_request_name)
            return {
                ...state,
                current_user: {...state.current_user,friends_request_name: remove_friends_request_name}
            }

        case "CONFIRM_ADDFRIEND": 
            let confirm_friend_id = state.user_lists.find(user => user.username === action.friendname)
            let confirm_friends_list = [action.friendname,...state.current_user.friends_list]
            let confirm_notifications = state.current_user.notifications.filter(notifi => notifi !== action.notification)
            updateUserFriendsList(localStorage.token,confirm_friend_id.id,confirm_friends_list,confirm_notifications)
            return {
                ...state,
                current_user: {
                    ...state.current_user, 
                    friends_list: confirm_friends_list,
                    notifications: confirm_notifications,
                }
            }
        
        case "SEND_NOTIFICATION": 
            let new_notification = {title: action.title}
            let friendId = state.user_lists.find(user => user.username === action.friendname).id
            addNotification(new_notification, friendId , state.current_user.username)
            return state
        
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