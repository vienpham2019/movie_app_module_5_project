import React , {Component} from 'react'
import {connect} from 'react-redux'

class MovieShowInfo extends Component {
    render(){
        let movie = this.props.displayMovie
        console.log(movie)
        return (
            <div className="movie_show_info">
                <div className="movie_show_info_producer">
                    <h1>Producer</h1>
                    {movie.production_companies.map(producer => 
                        <div className="movie_show_info_producer_img">
                            <label>{producer.name}</label><br/>
                            <img src={producer.logo_path !== "https://image.tmdb.org/t/p/w500null" ? producer.logo_path : "https://image.freepik.com/free-vector/film-camera-logo_7108-42.jpg"} alt="img"/>
                        </div>
                    )}
                </div>
                <div className="movie_show_info_detail">
                    <h1>Detail</h1>
                    <div className="movie_show_info_detail_item">
                        <label><strong>OVERVIEW</strong></label><br/>
                        <p>{movie.overview}</p>
                    </div>
                    {movie.awards !== "N/A" ? 
                        <div className="movie_show_info_detail_item">
                            <label><strong>AWARDS</strong></label><br/>
                            <p>{movie.awards}</p>
                        </div>
                    : null }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        displayMovie:  state.movieReducer.displayMovie
    }
}

export default connect(mapStateToProps)(MovieShowInfo)