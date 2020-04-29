import React , {Component} from 'react' 
import {connect} from 'react-redux'


class FilterMovies extends Component {
    render(){
        let movies_genre = this.props.movies.map(movie => movie.genre.split(",")).flat()
        movies_genre = movies_genre.map(genre => genre.trim()).filter(genre => genre !== 'N/A').sort()
        movies_genre = movies_genre.filter((genre,index) => movies_genre.indexOf(genre) === index)
        return(
            <div className="search_filter_movies_container">
                <div className="user_infomation"></div>
                <div className="filter_bar">
                    <p>GENRE</p>
                    <ul>
                        {movies_genre.map(genre => 
                            <div className="genre_container">
                                <label
                                    onClick={() => this.props.filterByGenre(genre)}
                                > &#x27A3; {genre}</label>
                            </div>  
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movieReducer.movies
    }
}

const mapDispatchToProps = dispatch => {
    return{
        filterByGenre: genre => dispatch({type: "FILTER_BY_GENRE", genre})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterMovies)