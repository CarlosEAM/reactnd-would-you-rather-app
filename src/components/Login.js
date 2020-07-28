import React, { Component } from 'react'
import { connect } from 'react-redux'


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
    // TODO: take the user and update AUTH
    console.log("LOGIN WITH: ", e.target.value)
  }

  render() {
    const { user } = this.state;
    const { users } = this.props;
    const disabled = (user === 'dummy') ? true : false;
    return (
      <div className="login">
        <img src={users[user].avatarURL} className="login__avatar" alt={`Avatar for ${user}`} />
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="select-login__label">
            <p>Select a user to continue:</p>
            <select
              className="select-login"
              value={users[user].id}
              onChange={this.handleChange}
            >
              {
                //TODO: FILL IN WITH THE USERS AVAILABLE
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
            className="submit-btn"
            type="submit"
            disabled={disabled}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  // Create dummy user as placeholder and add to current list of users
  const dummy = {
    'dummy': {
      avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
      id: 'dummy',
      name: 'none',
    }
  }

  return {
    users: {
      ...users,
      ...dummy
    }
  }
}

export default connect(mapStateToProps)(Login);
