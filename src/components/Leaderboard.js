import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserResultCard from './UserResultCard'


function Leaderboard(props) {
  return (
    <div className="leaderboard">
      <h3 className="leaderboard__header">Leaderboard</h3>
      <ul>
        {props.scores.map(user => (
          <li key={user.id}>
            <UserResultCard userID={user.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function mapStateToProps({ users }) {
  const scores = Object.keys(users).map(key => {
    return {
      id: key,
      score: Object.keys(users[key].answers).length + users[key].questions.length,
    }
  }).sort((a,b) => b.score - a.score)

  return {
    scores,
  }
}

export default connect(mapStateToProps)(Leaderboard)
