import movieReducer from './movieReducer'
import userReducer from './userReducer'
import searchMoviesReducer from './searchMoviesReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({movieReducer,userReducer,searchMoviesReducer})
export default rootReducer