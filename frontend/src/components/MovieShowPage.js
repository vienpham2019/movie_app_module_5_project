import React , {Component} from 'react'
import {connect} from 'react-redux'
import ReviewCard from '../movie_contents/ReviewCard'
import uploadReviewToDataBase from  '../reducer/uploadReviewToDatabase'
import swal from 'sweetalert'


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
                // uploadReviewToDataBase(this.props.reviews, this.props.reviewId)
                uploadReviewToDataBase([], this.props.reviewId)
            }
        }
    }
    
    render(){
        let movie = this.props.movie
        let reviews = this.props.reviews
        return (
            <div>
                <h1>{movie.title}</h1>
                <h3>Release Date: {movie.release_date}</h3>
                <img src={movie.poster_path} alt={`${movie.title} img`}/><br/>
                <div>
                    <input type="text" onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}/>
                    <button 
                        className={this.state.text !== "" ? "btn btn-primary" : "btn btn-secondary"}
                        onClick = {() => {
                            if(this.props.userName){
                                this.props.addReview(this.state.text)
                                this.setState({text: ""})
                            }else{
                                swal("Sorry, We Couldn't Verify Your Account","Please Login Or SignUp !")
                            }
                        }}
                    >REVIEW</button>
                    <div>
                        {reviews.map((review,index) => 
                            <ReviewCard 
                                review = {review} 
                                key = {`${review} review ${index}`}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.showMovieReviews,
        reviewId: state.showMovieReviewsId,
        userName: state.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addReview: review => dispatch({type: "ADD_REVIEW", review})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieShowPage)