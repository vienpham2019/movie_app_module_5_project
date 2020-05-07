import React , {Component} from 'react'
import {connect} from 'react-redux'
import swal from '@sweetalert/with-react'

class MovieShowHeader extends Component {

    addToFavorateAlert = () => {
        swal({
            title: "This movie has been add to your favorite list successfully !",
            icon: "success",
            button: "Ok",
        });
        setTimeout(() => {
            swal.close()
        }, 3000);
    }

    removeFromFavorateAlert = () => {
        swal({
            title: "You want to remove this movie from your  favorite list ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.props.removeFromFavorateMovies(this.props.movie)
                swal("Poof! This movie has been remove from your favorite list!", {
                icon: "success",
                });
            } else {
                swal("Your movie is safe!");
            }
          });
    } 

    render(){
        let movie = this.props.movie
        let favorate_movies = this.props.current_user ? this.props.current_user.favorate_movies : []
        return(
            <div className="movie_show_header" >
                <div className="movie_show_item_img">
                    <img src={movie.poster_path} alt={`${movie.title}img`}/>
                </div>
                <div className="movie_show_item_info">
                    <div className="movie_show_item_title">
                        <h1>{movie.title} 
                            <small>({movie.release_date.split("-")[0]})</small>
                        </h1>
                        <h4>&#10031; {movie.vote_average}</h4>
                    </div>
                    <label><strong>RELEASE DATE:</strong> {movie.release_date}</label><br/>
                    <label><strong>DIRECTOR:</strong> {movie.director}</label><br/>
                    <label><strong>WRITERS:</strong></label><br/>
                    <div className="movie_writer" style={{overflow: "hidden", textOverflow: "ellipsis" , display: "-webkit-box" , WebkitLineClamp: "3" , WebkitBoxOrient: "vertical"}}>
                        {movie.writer}
                    </div>
                    <label><strong>ACTORS:</strong></label><br/>
                    <div className="movie_writer" style={{overflow: "hidden", textOverflow: "ellipsis" , display: "-webkit-box" , WebkitLineClamp: "3" , WebkitBoxOrient: "vertical"}}>
                        {movie.actors}
                    </div>
                </div>
                <button 
                    className="favorate_btn btn btn-outline-info"
                    onClick={() => {
                        if(!this.props.userName){
                            this.props.loginAlert()
                        }else{
                            if(favorate_movies.find(movieId => movieId === movie.id)){
                                this.removeFromFavorateAlert()
                            }else{
                                this.props.addToFavorateMovies(movie)
                                this.addToFavorateAlert()
                            }
                        }
                    }}
                >{favorate_movies.find(movieId => movieId === movie.id) ? "♥" : "♡"} Add To Favorate</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movieReducer.displayMovie,
        userName: state.movieReducer.userName,
        current_user: state.userReducer.current_user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToFavorateMovies: favorate_movie => dispatch({type: "ADD_TO_FAVORATE_MOVIE", favorate_movie}),
        removeFromFavorateMovies: favorate_movie => dispatch({type: "REMOVE_FROM_FAVORATE_MOVIE", favorate_movie}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MovieShowHeader)