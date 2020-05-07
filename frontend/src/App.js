import React , {Component} from 'react'

import Login from './components/Login'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import MovieShowPage from './components/MovieShowPage'
import UserProfile from './components/UserProfile'
import Movies from './components/Movies'
import FriendProfile from './components/FriendProfile'

import {connect} from 'react-redux'
import {BrowserRouter as Router , Route } from 'react-router-dom'
import swal from 'sweetalert'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:4000")

class App extends Component {

    getCurrentUserInfo = () => {
        let obj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: this.props.current_user.id
            })
        }
        fetch("http://localhost:3000/get_current_user_info",obj)
        .then(res => res.json())
        .then(data => {
            this.props.setCurrentUser({
                id: data.id, 
                username: data.username, 
                favorate_movies: data.favorate_movies,
                user_profile_img: data.user_profile_img,
                friends_list: data.friends,
                notifications: data.notifications,
                chats: data.chats,
                friends_request_name: data.friends_request_name
            })
        })
    }

    componentDidMount(){
        localStorage.clear()
        fetch("http://localhost:3000/movie")
        .then(res => res.json())
        .then(data => {
            this.props.setMovies(data)
            this.props.setDisplayMovie(data)
        })

        fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            this.props.addToUserLists(data)
        })

        socket.on('user login' , obj => {
            this.props.updateUserLogin(obj)
        })

        socket.on('user logout' , obj => {
            this.props.updateUserLogin(obj)
        })

        socket.on('set_current_user', username => {
            if(this.props.current_user){
                if(username === this.props.current_user.username){
                    swal("New notification!", "check your profile page!");
                    this.getCurrentUserInfo()
                }
            }
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.userName !== prevProps.userName && this.props.userName){
            swal({
                title: "Login Successful",
                text: `Wellcome back ${this.props.userName}`,
                icon: "success",
                buttons: {cancel: "Close"} 
            })
            setTimeout(() => {
                swal.close()
            }, 2000);
        }
    }
    
    render() {
        return(
            <Router>
                <div>
                <Route 
                    render = {(routerProps) => <NavBar {...routerProps}/>}
                /> 
                <Route 
                    exact path = "/" 
                    render = {(routerProps) => <HomePage {...routerProps} />} 
                />
                <Route 
                    exact path = "/login" 
                    render = {(routerProps) => <Login {...routerProps} />} 
                /> 
                <Route 
                    exact path = "/signup" 
                    render = {(routerProps) => <SignUp {...routerProps} /> }
                />
                <Route 
                    exact path = {`/movie/${this.props.movie.movieId}`} 
                    render = {(routerProps) => <MovieShowPage {...routerProps} movie = {this.props.displayMovie}/> }
                />
                <Route 
                    exact path = '/user_profile'
                    render = {(routerProps) => <UserProfile {...routerProps}/> }
                />
                <Route 
                    exact path = '/movies'
                    render = {(routerProps) => <Movies {...routerProps}/> }
                />
                <Route 
                    exact path = '/friend_profile'
                    render = {(routerProps) => <FriendProfile {...routerProps}/> }
                />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movieReducer.movie,
        displayMovie: state.movieReducer.displayMovie,
        userName: state.movieReducer.userName,
        current_user: state.userReducer.current_user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setMovies: movies => dispatch({type: "SET_MOVIES", movies}),
        updateUserLogin: userLogins => dispatch({type: "UPDATE_USER_LOGIN", userLogins}),
        setDisplayMovie: movies => dispatch({type: "SET_SEARCH_MOVIES", movies}),
        addToUserLists: userLists => dispatch({type: "ADD_TO_USER_LISTS", userLists}),
        setCurrentUser: user => dispatch({type: "SET_CURRENT_USER" , user}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)