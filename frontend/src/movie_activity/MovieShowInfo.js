import React , {Component} from 'react'
import {connect} from 'react-redux'
import Slider from "react-slick";

class MovieShowInfo extends Component {
    render(){
        let movie = this.props.displayMovie
        let videos = movie.videos.length > 4 ? movie.videos.slice(0,4) : movie.videos
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false, 
            dots: true,
        }
        return (
            <div className="movie_show_info">
                {movie.production_companies.length > 0 ? 
                    <div className="movie_show_info_producer">
                        <h1>Producer</h1>
                        {movie.production_companies.map(producer => 
                            <div className="movie_show_info_producer_img">
                                <label>{producer.name}</label><br/>
                                <img src={producer.logo_path !== "https://image.tmdb.org/t/p/w500null" ? producer.logo_path : "https://image.freepik.com/free-vector/film-camera-logo_7108-42.jpg"} alt="img"/>
                            </div>
                        )}
                    </div>
                : null }
                <div className="movie_show_info_detail">
                    <div className="movie_show_info_detail_wrapper">
                        <div className="movie_show_info_detail_item_one">
                            <label><strong>OVERVIEW</strong></label><br/>
                            <p>{movie.overview}</p>
                        </div>
                        <div className="movie_show_info_detail_item_two">
                            <label><strong>PLOT</strong></label><br/>
                            <p>{movie.plot}</p>
                        </div>
                        <div className="movie_show_info_detail_item_three">
                            <label><strong>RUNTIME</strong></label><br/>
                            <p>{movie.runtime}</p>
                        </div>
                        <div className="movie_show_info_detail_item_four">
                            <label><strong>GENRES</strong></label><br/>
                            <p>{movie.genre}</p>
                        </div>
                        <div className="movie_show_info_detail_item_five">
                            <label><strong>AWARDS</strong></label><br/>
                            <p>{movie.awards}</p>
                        </div>
                        <div className="movie_show_info_detail_item_six">
                            <label><strong>COUNTRY</strong></label><br/>
                            <p>{movie.country}</p>
                        </div>
                        <div className="movie_show_info_detail_item_seven">
                            <label><strong>LANGUAGE</strong></label><br/>
                            <p>{movie.language}</p>
                        </div>
                    </div>
                </div>
                {videos.length > 0 ?  
                    <div className="movie_info_videos_container">
                        <div className="movie_show_info_videos">
                            <Slider {...settings}>
                                {videos.map(video => 
                                    <div className="movie_info_video">
                                        <iframe src={video.videoUrl} frameborder="0"></iframe>
                                    </div>
                                )}
                            </Slider>
                        </div>
                    </div>
                : null }
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