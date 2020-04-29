let initial_state = {
    login_users: [] ,
}

export default function userReducer(state = initial_state, action) {
    switch (action.type) {
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
    
        default:
            return state
    }   
}