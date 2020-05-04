import React , {Component} from 'react'
import {connect} from 'react-redux'
import UserEditForm from './UserEditForm'
import UserSearchFriends from './UserSearchFriends'
import getUserInfomation from '../reducer/getUserInfomation'
// import socketIOClient from 'socket.io-client'
// const socket = socketIOClient("http://localhost:4000")

class UserActivityContainer extends Component{

    // joinChatRoom = obj => {
    //     socket.emit('join chat room' , obj)
    //     socket.emit('send room info to user', obj)
    // }

    render(){
        let login_users = this.props.login_users
        console.log(login_users)
        let current_user = this.props.current_user 
        let friends_list = current_user ? this.props.user_lists.filter(user => current_user.friends_list.includes(user.username)).sort(user => login_users.includes(user.username) ? -1 : 1) : []
        return(
            <div className="user_activity_container inline_block">
                {this.props.userName ? 
                    <div>
                        <UserEditForm /> 
                        <UserSearchFriends history= {this.props.history}/> 
                    </div>
                : null }
                <div className="user_profile_info">
                    {this.props.userName ? 
                        <div className="user_profile_info_content">
                            <img src={current_user.user_profile_img ? current_user.user_profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                            <h3>{this.props.userName}</h3>
                        </div>
                    : null }
                    {this.props.userName ? 
                        <div className="setup_and_search_btn">
                            <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#exampleModalCenter">
                                Search Friends 
                            </button>
                            <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
                                <label>&#9881;</label>
                            </button>
                        </div>
                    : null }
                </div>
                <div className="friends_list">
                    {current_user ? 
                        friends_list.map(friend => 
                            <div className="friend_user_info">
                                <span 
                                    style={{
                                        color: login_users.includes(friend.username) ? "green" : "gray",
                                        fontSize: '2em'
                                    }}
                                >&#9679;</span>
                                <img src={friend.user_profile_img ? friend.user_profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                                <label>{friend.username}</label>
                                <div className="friend_user_info_btn">
                                    <button 
                                        className="btn btn-outline-info"
                                        onClick={() => this.props.unFriend(friend.username)}
                                    >Unfriend</button>
                                    <button 
                                        className="btn btn-outline-info"
                                        onClick={() => {
                                            getUserInfomation(friend.id)
                                            .then(res => res.json())
                                            .then(data => {
                                                this.props.setViewFriendProfile(data)
                                                this.props.history.push('/friend_profile')
                                            })
                                        }}
                                        data-dismiss="modal"
                                    >User Profile</button>
                                    <button>
                                        <svg className="bi bi-chat-dots-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    : null }
                </div>
                {/* <div className="chatIcon" onClick={() => this.props.displayChat()}>
                    <svg className="bi bi-chat-dots-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                    </svg>
                </div> */}
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        login_users: state.userReducer.login_users,
        userName: state.movieReducer.userName,
        current_user: state.userReducer.current_user,
        user_lists: state.userReducer.user_lists
    }
}

const mapDispatchToProps = dispatch => {
    return{
        displayChat: () => dispatch({type: "DISPLAY_CHAT"}),
        unFriend: friendname => dispatch({type: "UNFRIEND" , friendname}),
        setViewFriendProfile: friend_obj => dispatch({type: "SET_VIEW__obj_PROFILE", friend_obj})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserActivityContainer)