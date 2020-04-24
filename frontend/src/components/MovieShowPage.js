import React , {Component} from 'react'
import {connect} from 'react-redux'
import ReviewCard from '../contents/ReviewCard'

class MovieShowPage extends  Component {

    constructor(){
        super()
        this.state = {
            text: ""
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
                <input type="text" onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}/>
                <button 
                    className={this.state.text !== "" ? "btn btn-primary" : "btn btn-secondary"}
                    onClick = {() => {
                        this.props.addReview(this.state.text)
                        this.setState({text: ""})
                    }}
                >REVIEW</button>
                <div>
                    {reviews.map((review,index) => <ReviewCard review = {review} index = {index}/>)}
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

const mapDispatchToProps = dispatch => {
    return {
        addReview: review => dispatch({type: "ADD_REVIEW", review})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieShowPage)