import React , {Component} from 'react'
import ChatContainer from './ChatContainer'
import {connect} from 'react-redux'
import MovieCard from '../movie_contents/MovieCard'
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
        let favorate_movies = this.props.favorate_movies
        return(
            <div className="user_info_container inline_block">
                <div className="favorate_movies_container">
                    {favorate_movies.map(movie => 
                        <div className="favorate_movie_img">
                            <MovieCard 
                                movie = {movie} 
                                key={`${movie.id} favorate`}
                                history = {this.props.history}
                            />
                        </div>
                    )}
                </div>
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
        userName: state.movieReducer.userName,
        favorate_movies: state.movieReducer.favorate_movies
    }
}

export default connect(mapStateToProps)(UserInfoContainer)