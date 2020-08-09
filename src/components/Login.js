import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import Avatar_Placeholder from '../images/Avatar_Placeholder.png'


class Login extends Component {
  state = {
    user: 'dummy'
  }

  handleChange = (e) => {
    this.setState({
      user: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.user))
  }

  render() {
    const { user } = this.state;
    const { users, location, isLoggedIn } = this.props;

    // If user already logged in redirect to referer page
    if (isLoggedIn) {
      return <Redirect to={location.state.referer} />
    }

    const disabled = (user === 'dummy') ? true : false;

    return (
      <div className="login">
        <h1 className="login__header">Would You Rather</h1>
        <img src={Avatar_Placeholder} className="login__avatar" alt="avatar placeholder in brown" />
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="select-login__label">
            <p>Select a user to continue:</p>
            <select
              className="select-login"
              value={users[user].id}
              onChange={this.handleChange}
            >
              {
                Object.keys(users).map(username => {
                  const user = users[username]
                  return (
                    <option
                      className="select-login__option"
                      key={user.id}
                      value={user.id}>{user.name}
                    </option>
                  )
                })
              }
            </select>
          </label>
          <button
            className="login-btn"
            type="submit"
            disabled={disabled}
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  // Create dummy user as placeholder
  return {
    users: {
      ...users,
      'dummy': {
        id: 'dummy',
        name: 'none'
      }
    },
    isLoggedIn: authedUser,
  }
}

export default connect(mapStateToProps)(Login);
