import React , {Component} from 'react'
import {connect} from 'react-redux'
import ReviewCard from '../contents/ReviewCard'
import uploadReviewToDataBase from  '../reducer/uploadReviewToDatabase'

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
                {this.props.userName ? 
                    <div>
                        <input type="text" onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}/>
                        <button 
                            className={this.state.text !== "" ? "btn btn-primary" : "btn btn-secondary"}
                            onClick = {() => {
                                this.props.addReview(this.state.text)
                                this.setState({text: ""})
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
                    :
                    <div class="alert alert-primary" role="alert">
                        Please Login To View This Section!
                    </div>
                }
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