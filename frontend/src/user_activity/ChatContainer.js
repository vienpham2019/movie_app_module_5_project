import React , {Component} from 'react'
import {connect} from 'react-redux'

import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:4000")

class ChatContainer extends Component {
    constructor(){
        super()
        this.state = {
            text: "",
            messages: [],
            typing_userName: null 
        }

        this.mesRef = React.createRef();
    }

    scrollToBottom = () => {
        this.mesRef.current.scrollTop = 256;
	};

    sendMessage = () => {
        // socket.emit('send message' , {author: this.props.userName, content: this.state.text})
        socket.emit('send message to private room' , {author: this.props.userName, content: this.state.text, reciver:  this.props.friendname})
    }

    componentDidMount(){
        this.scrollToBottom();
        socket.on('recieve message from private' , obj => {
            if(
                (obj.author === this.props.friendname && obj.reciver === this.props.userName) || 
                (obj.reciver === this.props.friendname && obj.author === this.props.userName)
            ) {
                this.setState({
                    messages: [...this.state.messages,obj], 
                    text: "",
                    typing_userName: null 
                })
                this.scrollToBottom()
            }
        })

        socket.on('typing' , userName => {
            if(userName === this.props.friendname){
                this.setState({
                    typing_userName: userName
                })
            }
        })
    }

    render(){
        let typing_userName = this.state.typing_userName
        console.log(this.state.messages)
        // let chatRoom = this.props.chatRoom
        return(
            <div className="chat_container">
                <div className="chat_header">
                    <h2>To: {this.props.friendname}</h2>
                </div>
                <div className="chat_lists" ref={this.mesRef}>
                    {this.state.messages.map(message => 
                        message.author !== this.props.userName ? 
                            <div className="user_chat_message_container">
                                <div className="message_user_profile_img">
                                    <img src={message.profile_img ? message.profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
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
                            // socket.emit('typing' , this.props.userName)
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
        userName: state.movieReducer.userName
    }
}

export default connect(mapStateToProps)(ChatContainer)