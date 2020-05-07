import React , {Component} from 'react' 
import {connect} from 'react-redux'

class MovieCard extends Component {

    getReviews = movieId => {
        fetch(`http://localhost:3000/get_reviews/${movieId}`)
        .then(res => res.json())
        .then(data => {
            this.props.setShowMovieReviews(data.comments,data.id)
        })
    }

    render(){
        let movie = this.props.movie
        return(
            <div 
                className = "image_movie_card_container"
                onClick = {() => {
                    this.getReviews(movie.id)
                    this.props.history.push(`/movie/${movie.id}`)
                    this.props.setMovieId({movieId: movie.id, movieTitle: movie.title})
                    }}
            >
                <img src={movie.poster_path} alt={`${movie.title} img`}/>
                {this.props.rank ? 
                    <div className="ranks_label">
                        <label>&#10031; {movie.vote_average}</label>
                    </div>
                : null }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMovieId: movie => dispatch({type: "SET_MOVIE_ID", movie}),
        setShowMovieReviews: (reviews,reviewId) => dispatch({type: "SET_SHOW_MOVIE_REVIEWS", reviews , reviewId})
    }
}

export default connect(null, mapDispatchToProps)(MovieCard)