import React , {Component} from 'react'
import LikeDislike from './LikeDislike'

class NestedComment extends Component {
    
    render(){
        let comment = this.props.comment 
        return(
            <div>
                <h3>{comment.author}</h3>
                <p>{comment.content}</p>
                <LikeDislike review = {comment}/>
            </div>
        )
    }
}

export default NestedComment