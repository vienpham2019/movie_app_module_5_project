import movieReducer from './movieReducer'
import userReducer from './userReducer'

import {combineReducers} from 'redux'

const rootReducer = combineReducers({movieReducer,userReducer})
export default rootReducer