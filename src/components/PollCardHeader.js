import React, { Component } from 'react'
import { connect } from 'react-redux'

class PollCardHeader extends Component {
  render() {
    return (
      <header className="poll-card-header">
        <img src={this.props.avatarURL} className="poll-card-header--item" alt={`${this.props.name} avatar`} />
        <h4 className="poll-card-header--item">{this.props.name}</h4>
        <h2 className="poll-card-header--item">Would You Rather</h2>
      </header>
    )
  }
}

function mapStateToProps({ users }, { authorID }) {
  const name = users[authorID].name
  const avatarURL = users[authorID].avatarURL

  return {
    name,
    avatarURL,
  }
}

export default connect(mapStateToProps)(PollCardHeader)
