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
                <div className="user_profile_info">
                    {this.props.userName ? 
                        <div className="user_profile_info_content">
                            <img src={this.props.userProfile ? this.props.userProfile : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                            <h3>{this.props.userName}</h3>
                        </div>
                    : null }
                </div>
                <div className="friends_list">
                    {login_users.map(user => 
                        <ul>
                            {/* <button onClick={() => this.joinChatRoom({chatroomName: "1 private room", recieverName: user.username , senderName: this.props.userName})}>
                            {user.username}</button> */}
                            {user.username}
                        </ul>
                    )}
                </div>
                <div className="chatIcon" onClick={() => this.props.displayChat()}>
                    <svg className="bi bi-chat-dots-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                    </svg>
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

const mapDispatchToProps = dispatch => {
    return{
        displayChat: () => dispatch({type: "DISPLAY_CHAT"})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserActivityContainer)