import React , {Component} from 'react'
import swal from '@sweetalert/with-react'

import MovieShowHeader from '../movie_activity/MovieShowHeader'
import MovieShowInfo from '../movie_activity/MovieShowInfo'
import MovieShowReview from '../movie_activity/MovieShowReview'


class MovieShowPage extends  Component {

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    loginAlert = () => 
        swal({
            title: "Sorry, We Couldn't Verify Your Account",
            text: "Please Login Or SignUp !",
            content: (
                <button 
                    className="btn btn-outline-info"
                    onClick ={() => {
                        this.props.history.push("/login")
                        swal.close()
                    }}
                >Login Page</button>
            )
    })
    
    render(){
        return (
            <div className="movie_show_page_container">
                <MovieShowHeader loginAlert= {this.loginAlert}/> 
                <div className="movie_show_body_container">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="true">Info</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
                            <MovieShowInfo /> 
                        </div>
                        <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                            <MovieShowReview loginAlert = {this.loginAlert} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieShowPage