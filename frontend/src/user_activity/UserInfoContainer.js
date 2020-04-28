import React , {Component} from 'react'
import ChatContainer from './ChatContainer'
import {connect} from 'react-redux'
// import socketIOClient from 'socket.io-client'
// const socket = socketIOClient("http://localhost:4000")

class UserInfoContainer extends Component{

    constructor(){
        super()
        this.state ={
            chat_windows: [],
        }
    }
    componentDidMount(){
        // socket.on('user join chat room' , obj => {
        //     if(obj.recieverName === this.props.userName){
        //         socket.emit('join chat room' , obj)
        //         this.setState({chat_windows: [...this.state.chat_windows, obj]})
        //     }
        //     if(obj.senderName === this.props.userName){
        //         this.setState({chat_windows: [...this.state.chat_windows, obj]})
        //     }
        // })
    }

    render(){
        return(
            <div className="user_info_container inline_block">
                <h1>User Info Container</h1>
                <div className="chat_container_tank">
                    {/* {this.state.chat_windows.map(chatRoom => <ChatContainer chatRoom = {chatRoom}/>)} */}
                    <ChatContainer/>
                </div>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return{
        userName: state.movieReducer.userName
    }
}

export default connect(mapStateToProps)(UserInfoContainer)