import React , {Component} from 'react'
import {connect} from 'react-redux'

import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:4000")

class ChatContainer extends Component {
    constructor(){
        super()
        this.state = {
            text: "",
            typing_userName: null 
        }

        this.mesRef = React.createRef();
    }

    scrollToBottom = () => {
        this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight
	};

    sendMessage = () => {
        socket.emit('send message to private room' , {author: this.props.userName, content: this.state.text, reciver:  this.props.friend_obj.username})
    }

    componentDidMount(){
        this.scrollToBottom();
        socket.on('recieve message from private' , obj => {
            if(
                (obj.author === this.props.friend_obj.username && obj.reciver === this.props.userName) || 
                (obj.reciver === this.props.friend_obj.username && obj.author === this.props.userName)
            ) {
                this.setState({
                    text: "",
                    typing_userName: null 
                })
                this.props.updateFriendChats([...this.props.chats,obj],this.props.friend_obj.username,this.props.friend_obj.id, obj.author)
                this.scrollToBottom()
            }
        })

        socket.on('typing' , obj => {
            if(obj.author === this.props.friend_obj.username && obj.reciver === this.props.userName){
                this.setState({
                    typing_userName: obj.author
                })
                this.scrollToBottom()
            }
        })
    }

    render(){
        let typing_userName = this.state.typing_userName
        let friend = this.props.friend_obj 
        let chats = this.props.chats ? this.props.chats : []
        return(
            <div className="chat_container">
                <div className="chat_header">
                    <h2>To: {friend.username}</h2>
                </div>
                <div className="chat_lists" ref={this.mesRef}>
                    {chats.map(message => 
                        message.author !== this.props.userName ? 
                            <div className="user_chat_message_container">
                                <div className="message_user_profile_img">
                                    <img src={friend.user_profile_img ? friend.user_profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                                </div>
                                <div className="message_content message_left">
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        : 
                            <div className="user_chat_message_container">
                                <div className="message_content message_right">
                                    <p>{message.content}</p>
                                </div>
                            </div>                     
                    )}
                    {typing_userName ? <p><em>{typing_userName} is typing....</em></p> : null}
                </div>
                <div className="input-group mb-3 chat_footer">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Type your message..."
                        value={this.state.text}
                        onChange={(e) => {
                            this.setState({text: e.target.value })
                            socket.emit('typing' , {author: this.props.userName, reciver: this.props.friend_obj.username})
                        }}
                    />
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            onClick={() => this.sendMessage() }
                        >
                        <svg class="bi bi-cursor-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14.082 2.182a.5.5 0 01.103.557L8.528 15.467a.5.5 0 01-.917-.007L5.57 10.694.803 8.652a.5.5 0 01-.006-.916l12.728-5.657a.5.5 0 01.556.103z" clip-rule="evenodd"/>
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.movieReducer.userName,
        current_user: state.userReducer.current_user,
        login_users: state.userReducer.login_users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFriendChats: (newChats,friendname,friendId ,author) => dispatch({type: "UPDATE_FRIEND_CHATS" , newChats , friendname , friendId , author})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatContainer)