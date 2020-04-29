import React , {Component} from 'react' 
import {connect} from 'react-redux'

import MovieCard from '../movie_contents/MovieCard'

class DisplayMovies extends Component {

    constructor(){
        super()
        this.state = {
            current_index: 0,
            next_index: 50,
            current_page: 1
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.displayMovies !== prevProps.displayMovies){
            this.setState({
                current_index: 0,
                next_index: 50, 
                current_page: 1
            })
        }
    }
    render(){
        let {current_index , next_index} = this.state
        let movies = this.props.displayMovies
        let displayMovies = movies.slice(current_index,next_index)
        let movies_page = Math.floor(movies.length / 50)
        let pages = []
        for(let i = 1 ; i <= movies_page + 1 ; i ++){
            pages.push(i)
        }
        return(
            <div className="search_display_movies_container">
                <div className="movies_search_page">
                    <div className="movie_search_page_item">
                        <button
                            className="btn btn-outline-info"
                            onClick={() => {
                                if(current_index !== 0){
                                    next_index = current_index
                                    current_index -= 50
                                    let current_page = this.state.current_page - 1
                                    this.setState({current_index,next_index,current_page})
                                }
                            }}
                        >Prev</button>
                    </div>
                    <div className="dropdown movie_search_page_item">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Current Page {this.state.current_page}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {pages.map(num => 
                                <a 
                                    className="dropdown-item" href="#"
                                    onClick={() => {
                                        let current , next 
                                        current = num === 1 ? 0 : 50 * (num - 1)
                                        next = 50 * num
                                        this.setState({
                                            current_page: num,
                                            current_index: current,
                                            next_index: next
                                        })
                                    }}
                                >Page {num}</a>
                            )}
                        </div>
                    </div>
                    <div className="movie_search_page_item">
                        <button
                            className="btn btn-outline-info"
                            onClick={() => {
                                if(current_index + 50 < movies.length){
                                    current_index = next_index
                                    next_index += 50
                                    let current_page = this.state.current_page + 1
                                    this.setState({current_index,next_index,current_page})
                                }
                            }}
                        >Next</button>
                    </div>
                </div>
                {displayMovies.map(movie => 
                    <div className="search_movie_item">
                        <MovieCard 
                            movie = {movie}
                            key = {`${movie.id} movie search`}
                            history = {this.props.history}
                        />
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        displayMovies: state.searchMoviesReducer.displayMovies
    }
}

export default connect(mapStateToProps)(DisplayMovies)