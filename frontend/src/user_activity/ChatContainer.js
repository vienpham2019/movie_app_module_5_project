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
    }

    sendMessage = () => {
        // socket.emit('send message to chat room' , {chatroomName,author: this.props.userName, content: this.state.text})
        socket.emit('send message' , {author: this.props.userName, content: this.state.text})
    }

    componentDidMount(){
        socket.on('recieve message' , obj => {
            this.setState({
                messages: [obj,...this.state.messages], 
                text: "",
                typing_userName: null 
            })
        })

        socket.on('typing' , userName => {
            this.setState({
                typing_userName: userName
            })
        })
    }

    render(){
        let typing_userName = this.state.typing_userName
        console.log(this.state.messages)
        // let chatRoom = this.props.chatRoom
        return(
            <div className="chat_container">
                <div className="chat_lists" >
                    {typing_userName ? <p><em>{typing_userName} is typing....</em></p> : null}
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
                </div>
                <input type="text" class="form-control" value={this.state.text} onChange={(e) => {
                    this.setState({text: e.target.value })
                    socket.emit('typing' , this.props.userName)
                }}/><br/>
                <button className="btn btn-outline-info" onClick={() => this.sendMessage() }>Send</button>
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