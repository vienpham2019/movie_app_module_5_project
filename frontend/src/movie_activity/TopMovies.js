import React , {Component} from 'react'
import Slider from "react-slick";
import MovieCard from '../movie_contents/MovieCard'

class TopMovies extends Component {
    render(){
        let top_popular_movies = this.props.top_popular_movies
        const settings = {
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        }
        return(
            <div className="top_movies_slide_container">
                <Slider {...settings}>
                    {top_popular_movies.map(movie => 
                        <MovieCard movie={movie} history = {this.props.history} rank = {this.props.rank}/> 
                    )}
                </Slider>
            </div>
        )
    }
}

export default TopMovies