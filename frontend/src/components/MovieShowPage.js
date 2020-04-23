import React , {Component} from 'react'
import {connect} from 'react-redux'
import ReviewCard from '../contents/ReviewCard'

class MovieShowPage extends  Component {
    
    render(){
        let movie = this.props.movie
        let reviews = this.props.reviews
        return (
            <div>
                <h1>{movie.title}</h1>
                <img src={movie.poster_path} alt={`${movie.title} img`}/><br/>
                <div>
                    {reviews.map(review => <ReviewCard review = {review} />)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.showMovieReviews
    }
}

export default connect(mapStateToProps)(MovieShowPage)