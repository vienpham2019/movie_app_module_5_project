import React , {Component} from 'react'
import {connect} from  'react-redux'

class ReplyComment extends Component {
    constructor(){
        super()
        this.state = {
            text: ""
        }
    }
    render() {
        let review = this.props.review 
        return (
            <div className="reply_input">
                <input type="text" onChange = {(e) => this.setState({text: e.target.value})} value = {this.state.text}/>
                <button 
                    className={this.state.text !== "" ? "btn btn-primary" : "btn btn-secondary"}
                    onClick = {() => {
                        this.props.handleReplyButton()
                        this.props.addToNestedComment(this.state.text,review)
                        this.setState({text: ""})
                    }}
                >REPLY</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addToNestedComment: (comment,review) => dispatch({type: "ADD_TO_NESTED_COMMENTS", comment , review})
    }
}

export default connect(null, mapDispatchToProps)(ReplyComment)