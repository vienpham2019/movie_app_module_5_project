import React , {Component} from 'react' 
import {connect} from 'react-redux'


class FilterMovies extends Component {
    render(){
        let movies_genre = this.props.movies.map(movie => movie.genre.split(",")).flat()
        movies_genre = movies_genre.map(genre => genre.trim()).filter(genre => genre !== 'N/A').sort()
        movies_genre = movies_genre.filter((genre,index) => movies_genre.indexOf(genre) === index)
        let current_user = this.props.current_user
        return(
            <div className="search_filter_movies_container">
                <div className="user_infomation">
                    {current_user ?  
                        <div 
                            className="current_user_img_in_moives"
                            onClick={() => {
                                window.scrollTo(0, 0)
                                this.props.setCurrentUserInNavbar(false)
                                this.props.history.push('/user_profile')
                            }}
                        >
                            <img src={current_user.user_profile_img ? current_user.user_profile_img : "https://cdn.onlinewebfonts.com/svg/img_507393.png"} alt="img"/>
                            <label>{current_user.username}</label>
                        </div>
                    : null }
                </div>
                <div className="filter_bar">
                    <p>GENRE</p>
                    <ul>
                        {movies_genre.map(genre => 
                            <div className="genre_container">
                                <label
                                    onClick={() => this.props.filterByGenre(genre)}
                                > &#x27A3; {genre}</label>
                            </div>  
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movieReducer.movies,
        current_user: state.userReducer.current_user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        filterByGenre: genre => dispatch({type: "FILTER_BY_GENRE", genre}),
        setCurrentUserInNavbar: status => dispatch({type: "SET_CURRENT_USER_IMG_IN_NAVBAR", status})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterMovies)