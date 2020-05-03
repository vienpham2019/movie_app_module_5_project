import React , {Component} from 'react'
import ChatContainer from './ChatContainer'
import {connect} from 'react-redux'
// import MovieCard from '../movie_contents/MovieCard'
import DisplayMovie from '../search_movies_container/DisplayMovies'
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
        let current_user = this.props.current_user
        return(
            <div className="user_info_container inline_block">
                <h1>My Collection</h1>
                <div className="favorate_movies_container">
                    {current_user ? 
                        <DisplayMovie history = {this.props.history} displayMovies = {current_user.favorate_movies} />
                    : null }
                </div>
                {this.props.displayChat ? 
                    <div className="chat_container_tank">
                        <ChatContainer/>
                    </div>
                : null }
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return{
        displayChat: state.userReducer.displayChat,
        current_user: state.userReducer.current_user
    }
}

export default connect(mapStateToProps)(UserInfoContainer)