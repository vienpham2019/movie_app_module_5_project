import React , {Component} from 'react'

class UserActivityContainer extends Component{
    constructor(){
        super() 
        this.state = {
            user_lists: []
        }
    }

    render(){
        return(
            <div className="user_activity_container inline_block">
                <h1>User Activity Container</h1>
                <div className="friends_list">
                    {this.state.user_lists.map(user => <ul>{user.username}</ul>)}
                </div>
            </div> 
        )
    }
}

export default UserActivityContainer