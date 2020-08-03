import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeAuthedUser } from '../actions/authedUser'


class UserNavBox extends Component {
  handleLogOut = (e) => {
    e.preventDefault();

    // Log user out
    this.props.dispatch(removeAuthedUser())
  }

  render() {
    const { avatar, username } = this.props;

    return (
      <div className="user-nav-box">
        <div className="user-nav-box--wrapper">
          <img src={avatar} className="user-nav-box__avatar" alt="" />
          <span className="user-nav-box__username">{username}</span>
          <button className="user-nav-box__sign-out" onClick={this.handleLogOut}>Sign out</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = authedUser !== null
    ?
      {
        authedUser,
        avatar: users[authedUser].avatarURL,
        username: users[authedUser].name,
      }
    :
      {authedUser};

  return {
    ...user,
  }
}

export default connect(mapStateToProps)(UserNavBox)
