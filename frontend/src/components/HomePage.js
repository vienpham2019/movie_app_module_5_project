import React , {Component} from 'react'
import {connect} from 'react-redux'
import MovieCard from '../contents/MovieCard'

class HomePage extends Component {

    displayMovies = movies => {
        if(movies.length > 1){
            let top_5_movies = movies.slice(0,100)
            return top_5_movies.map(movie => 
                <MovieCard 
                    movie = {movie} 
                    history = {this.props.history}
                    key = {movie.id}
                /> 
            )
        }else{
            return (<h1>Loading....</h1>)
        }
    }
    render(){
        let movies = this.props.movies
        return(
            <div>
                {this.displayMovies(movies)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps)(HomePage)