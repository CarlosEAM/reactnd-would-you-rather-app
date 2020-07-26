import React from 'react'
import { connect } from 'react-redux'


function PollCardHeader(props) {
  return (
    <header className="poll-card-header">
      <img src={props.avatarURL} className="poll-card-header--item" alt={`${props.name} avatar`} />
      <h4 className="poll-card-header--item">{props.name}</h4>
      <h2 className="poll-card-header--item">Would You Rather</h2>
    </header>
  )
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
