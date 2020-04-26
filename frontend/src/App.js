import React , {Component} from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import MovieShowPage from './components/MovieShowPage'
import {connect} from 'react-redux'
import {BrowserRouter as Router , Route } from 'react-router-dom'
import swal from 'sweetalert'

class App extends Component {

    componentDidMount(){
        localStorage.clear()
        fetch("http://localhost:3000/movie")
        .then(res => res.json())
        .then(data => this.props.setMovies(data))
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
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movie,
        displayMovie: state.displayMovie,
        userName: state.userName
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setMovies: movies => dispatch({type: "SET_MOVIES", movies})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)