import React , {Component} from 'react' 
import {connect} from 'react-redux'

class SearchBar extends Component {

    render(){
        return(
            <div className = "search_movies_bar_container">
                <label>&#x26B2;</label>
                <input type="text" onChange={(e) => {
                    this.props.searchMovies(e.target.value)
                }} placeholder="Search..."/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        displayMovies: state.searchMoviesReducer.displayMovies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchMovies: search_value => dispatch({type: "SEARCH_MOVIES" , search_value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)