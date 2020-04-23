import React , {Component} from 'react' 
import {connect} from 'react-redux'

class MovieCard extends Component {

    getReviews = movieId => {
        fetch(`http://localhost:3000/get_reviews/${movieId}`)
        .then(res => res.json())
        .then(data => this.props.setShowMovieReviews(data.comments))
    }

    render(){
        let movie = this.props.movie
        return(
            <div onClick = {() => {
                this.getReviews(movie.id)
                this.props.history.push(`/movie/${movie.id}/&title=${encodeURI(movie.title)}`)
                this.props.setMovieId({movieId: movie.id, movieTitle: movie.title})
                }}>
                <h3>{movie.title}</h3>
                <img src={movie.poster_path} alt={`${movie.title} img`}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMovieId: movie => dispatch({type: "SET_MOVIE_ID", movie}),
        setShowMovieReviews: reviews => dispatch({type: "SET_SHOW_MOVIE_REVIEWS", reviews})
    }
}

export default connect(null, mapDispatchToProps)(MovieCard)