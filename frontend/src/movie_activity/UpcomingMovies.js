import React , {Component} from 'react'
import { Fade } from 'react-slideshow-image';
import MovieCard from '../movie_contents/MovieCard'

class UpcomingMovies extends Component {
    render(){
        let top_movies = this.props.top_movies
        const properties = {
            duration: 6000,
            transitionDuration: 1000,
            infinite: true,
            indicators: true,
            arrows: false,
            pauseOnHover: true
          }
        return(
            <div className="slide-container">
                <Fade {...properties}>
                    {top_movies.map(movie => 
                        <div className="each-fade top_movie_item">
                            <div className = "top_movie_item_image inline_block">
                                <MovieCard movie={movie} history = {this.props.history}/> 
                            </div>  
                            <div className="top_movie_item_info inline_block">
                                <h1>{movie.title}</h1>
                                <label>{movie.genre}</label><br/>
                                <label>{movie.release_date}</label>
                                {movie.overview !== "" ? 
                                    <div className="over_flow_text">
                                        <p className="overflow-ellipsis">{movie.overview}</p>
                                    </div>
                                : null }
                            </div>
                        </div>
                    )}
                </Fade>
            </div>
        )
    }
}

export default UpcomingMovies