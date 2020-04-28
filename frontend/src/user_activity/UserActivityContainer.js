import React , {Component} from 'react'
import {connect} from 'react-redux'
// import socketIOClient from 'socket.io-client'
// const socket = socketIOClient("http://localhost:4000")

class UserActivityContainer extends Component{

    // joinChatRoom = obj => {
    //     socket.emit('join chat room' , obj)
    //     socket.emit('send room info to user', obj)
    // }

    render(){
        let login_users = this.props.login_users.filter(user => user.username !== this.props.userName)

        return(
            <div className="user_activity_container inline_block">
                <h1>User Activity Container</h1>
                <div className="friends_list">
                    {login_users.map(user => 
                        <ul>
                            {/* <button onClick={() => this.joinChatRoom({chatroomName: "1 private room", recieverName: user.username , senderName: this.props.userName})}>
                            {user.username}</button> */}
                            {user.username}
                        </ul>
                    )}
                </div>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        login_users: state.userReducer.login_users,
        userName: state.movieReducer.userName 
    }
}

export default connect(mapStateToProps)(UserActivityContainer)