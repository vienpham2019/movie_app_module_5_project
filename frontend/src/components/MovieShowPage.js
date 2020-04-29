import React , {Component} from 'react'
import {connect} from 'react-redux'
import uploadReviewToDataBase from  '../reducer/uploadReviewToDatabase'
import swal from '@sweetalert/with-react'

import ReviewCard from '../movie_contents/ReviewCard'
import MovieShowHeader from '../movie_activity/MovieShowHeader'


class MovieShowPage extends  Component {

    constructor(){
        super()
        this.state = {
            text: ""
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.reviews !== prevProps.reviews){
            if(prevProps.reviews.length !== 0){
                uploadReviewToDataBase(this.props.reviews, this.props.reviewId)
                // uploadReviewToDataBase([], this.props.reviewId)
            }
        }
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
        // let movie = this.props.movie
        let reviews = this.props.reviews
        return (
            <div>
                <MovieShowHeader loginAlert= {this.loginAlert}/> 
                <div className="review_container">
                    <input type="text" onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}/>
                    <button 
                        className={this.state.text !== "" ? "btn btn-primary" : "btn btn-secondary"}
                        onClick = {() => {
                            if(this.props.userName){
                                this.props.addReview(this.state.text)
                                this.setState({text: ""})
                            }else{
                                this.loginAlert()
                            }
                        }}
                    >REVIEW</button>
                    {reviews.length > 0 ? 
                        <div>
                            {reviews.map((review,index) => 
                                <ReviewCard 
                                    review = {review} 
                                    key = {`${review} review ${index}`}
                                    loginAlert = {this.loginAlert}
                                />
                            )}
                        </div>
                    : <h3>There aren't any reviews for this movie yet!</h3>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.movieReducer.showMovieReviews,
        reviewId: state.movieReducer.showMovieReviewsId,
        userName: state.movieReducer.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addReview: review => dispatch({type: "ADD_REVIEW", review})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieShowPage)