import React , {Component} from 'react'
import {connect} from 'react-redux'

class UserEditForm extends Component {

    handleSubmit = e => {
        e.preventDefault()
        let user_profile_img = e.target[0].value === "" ? null : e.target[0].value
        this.props.updateCurrentUserProfileImg(user_profile_img)
        e.target.reset()
    }

    render() {
        let current_user = this.props.current_user
        console.log(current_user)
        return(
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Form</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit = {(e) => this.handleSubmit(e)}>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Profile Img</label>
                                    <input type="text" class="form-control"/>
                                </div>
                                <div className="form-group">
                                    <button 
                                        type="submit" 
                                        class="btn btn-primary" 
                                        // data-dismiss="modal"
                                        // onClick={() => alert("submit")}
                                    >Submit</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        current_user: state.userReducer.current_user
    }
}

const updateCurrentUser = dispatch => {
    return {
        updateCurrentUserProfileImg: user_profile_img => dispatch({type: "UPDATE_CURRENT_USER_PROFILE_IMG" , user_profile_img})
    }
}

export default connect(mapStateToProps, updateCurrentUser)(UserEditForm)