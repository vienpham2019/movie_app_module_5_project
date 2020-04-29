import React , {Component} from 'react'
import {connect} from 'react-redux'
import DisplayMovies from '../search_movies_container/DisplayMovies'
import SearchBar from '../search_movies_container/SearchBar'
import FilterMovies from '../search_movies_container/FilterMovies'

class Movies extends Component {

    render(){
        return(
            <div className="search_movies_main_container">
                <SearchBar /> 
                <FilterMovies /> 
                <DisplayMovies  history = {this.props.history}/> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movieReducer.movies ,
        displayMovies: state.searchMoviesReducer.displayMovies
    }
}

export default connect(mapStateToProps)(Movies)