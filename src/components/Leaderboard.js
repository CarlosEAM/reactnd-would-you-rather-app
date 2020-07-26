import React from 'react'
import { connect } from 'react-redux'

// Custom components
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
  // score has a list of users sorted by their score, high to low
  const scores = Object.keys(users).map(key => {
    // returns an object with the user id and their total score
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
