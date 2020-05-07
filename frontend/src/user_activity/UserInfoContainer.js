import React , {Component} from 'react'
import ChatContainer from './ChatContainer'
import {connect} from 'react-redux'
import DisplayMovie from '../search_movies_container/DisplayMovies'

class UserInfoContainer extends Component{

    constructor(){
        super()
        this.state ={
            chat_windows: [],
        }
    }
    
    render(){
        let movies = this.props.movies
        let current_user = this.props.current_user
        let displayMovies = current_user ? current_user.favorate_movies.map(movieId => movies.find(movie => {
            if(movie.id === movieId){
                return movie
            }
        })) : []
        return(
            <div className="user_info_container inline_block">
                <h1>My Collection</h1>
                <div className="favorate_movies_container">
                    <DisplayMovie history = {this.props.history} displayMovies = {displayMovies} />
                </div>
                {this.props.displayChats.length > 0 ? 
                    <div className="chat_container_tank">
                        {this.props.displayChats.map(chat => <ChatContainer friend_obj = {chat} chats = {current_user.chats[chat.username]} key = {chat}/>)}
                    </div>
                : null }
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return{
        displayChats: state.userReducer.displayChats,
        current_user: state.userReducer.current_user,
        movies: state.movieReducer.movies 
    }
}

export default connect(mapStateToProps)(UserInfoContainer)