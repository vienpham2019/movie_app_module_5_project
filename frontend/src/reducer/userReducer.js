let initial_state = {
    login_users: [] 
}

export default function userReducer(state = initial_state, action) {
    switch (action.type) {
        case "ADD_USER_LOGIN":
            return{
                ...state,
                login_users: [...state.login_users, action.userName]
            }
    
        default:
            return state
    }   
}