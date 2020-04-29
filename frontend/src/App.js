import React , {Component} from 'react'

import Login from './components/Login'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import MovieShowPage from './components/MovieShowPage'
import UserProfile from './components/UserProfile'
import Movies from './components/Movies'

import {connect} from 'react-redux'
import {BrowserRouter as Router , Route } from 'react-router-dom'
import swal from 'sweetalert'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://localhost:4000")

class App extends Component {

    componentDidMount(){
        localStorage.clear()
        fetch("http://localhost:3000/movie")
        .then(res => res.json())
        .then(data => {
            this.props.setMovies(data)
            this.props.setDisplayMovie(data)
        })

        socket.on('user login' , obj => {
            this.props.addUserLogin(obj.userName)
        })

        socket.on('user logout' , obj => {
            this.props.removeUserLogout(obj.userName)
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
                <NavBar />
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
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movieReducer.movie,
        displayMovie: state.movieReducer.displayMovie,
        userName: state.movieReducer.userName
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setMovies: movies => dispatch({type: "SET_MOVIES", movies}),
        addUserLogin: userName => dispatch({type: "ADD_USER_LOGIN", userName}),
        removeUserLogout: userName => dispatch({type: "REMOVE_USER_LOGOUT" , userName}),
        setDisplayMovie: movies => dispatch({type: "SET_SEARCH_MOVIES", movies})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)