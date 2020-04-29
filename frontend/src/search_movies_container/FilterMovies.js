import React , {Component} from 'react' 
import {connect} from 'react-redux'

import MovieCard from '../movie_contents/MovieCard'

class FilterMovies extends Component {
    render(){
        let movies = this.props.movies.map(movie => movie.genre)
        return(
            <div className="search_filter_movies_container">
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movieReducer.movies
    }
}

export default connect(mapStateToProps)(FilterMovies)