import React , {Component} from 'react'
import {connect} from 'react-redux'
import UpcomingMovies from '../movie_activity/UpcomingMovies'
import TopMovies from '../movie_activity/TopMovies'
// import MovieCard from '../movie_contents/MovieCard'

class HomePage extends Component {

    displayMovies = movies => {
        if(movies.length > 1){
            let top_popular_movies_title = ["Captain Marvel", "Aladdin" , "Avengers: Endgame", "Rocketman" , "Spider-Man: Far from Home", "The Lion King", "The Secret Life of Pets 2", "Alita: Battle Angel" , "Men in Black: International","John Wick: Chapter 3 - Parabellum", "Joker" , "Star Wars: The Rise Of Skywalker" , "Frozen II", "Rambo: Last Blood", "1917", "The Gentlemen", "Midway","Knives Out"]
            let top_movies = movies.filter(movie => 
                Math.floor(movie.release_date.split("-")[0]) >= 2020 
            )
            let top_popular_movies = movies.filter(movie => 
                movie.release_date.split("-")[0] === "2019" && top_popular_movies_title.find(title => title === movie.title)
            )
            let top_highest_votes = movies.filter(movie => 
                Math.floor(movie.release_date.split("-")[0]) >= 2018 && movie.vote_average > 7
            ).sort((a,b) => a.vote_average - b.vote_average)
            return (
                <div>
                    <h1>Upcoming Movies 2020 - 2021</h1>
                    <UpcomingMovies 
                        top_movies = {top_movies}
                        history = {this.props.history}
                    />
                    <br/>
                    <h1>Top Popular Movies In 2019</h1>
                    <TopMovies 
                        top_popular_movies = {top_popular_movies}
                        history = {this.props.history}
                    />
                    <br/>
                    <h1>Top Movies Have Highest Ranks 2018 - 2021</h1>
                    <TopMovies 
                        top_popular_movies = {top_highest_votes}
                        history = {this.props.history}
                        rank = {true}
                    />
                </div>
            )
        }else{
            return (
                <div>
                    {this.props.history.push('/login')}
                </div>
            )
        }
    }
    render(){
        let movies = this.props.movies
        return(
            <div>
                {this.displayMovies(movies)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movieReducer.movies
    }
}

export default connect(mapStateToProps)(HomePage)