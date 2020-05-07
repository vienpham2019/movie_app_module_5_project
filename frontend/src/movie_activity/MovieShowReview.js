import React , {Component} from 'react'
import {connect} from 'react-redux'
import uploadReviewToDataBase from  '../reducer/uploadReviewToDatabase'

import ReviewCard from '../movie_contents/ReviewCard'
 
class MovieShowReview extends Component {

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

    render(){
        let reviews = this.props.reviews
        return(
            <div className="review_container">
                <div className="review_input">
                    {/* <input type="area" onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}/> */}
                    <textarea rows="10" cols="30" onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}></textarea>
                    <button 
                        className={this.state.text !== "" ? "btn btn-outline-primary" : "btn btn-outline-info"}
                        onClick = {() => {
                            if(this.props.userName){
                                this.props.addReview(this.state.text)
                                this.setState({text: ""})
                            }else{
                                this.props.loginAlert()
                            }
                        }}
                    >REVIEW</button>
                </div>
                {reviews.length > 0 ? 
                    <div>
                        {reviews.map((review,index) => 
                            <ReviewCard 
                                review = {review} 
                                key = {`${review} review ${index}`}
                                loginAlert = {this.props.loginAlert}
                            />
                        )}
                    </div>
                : <h3>There aren't any reviews for this movie yet!</h3>}
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

export default connect(mapStateToProps,mapDispatchToProps)(MovieShowReview)