import React from 'react'
import { connect } from 'react-redux'


function UserResultCard(props) {
  const { avatarURL, name } = props.user;
  const questions = props.user.questions.length
  const answers = Object.keys(props.user.answers).length
  const score = questions + answers;

  return (
    <div className="user-result-card">
      <div className="user-result-card__item grid-item__avatar">
        <img src={avatarURL} alt={`${name} avatar`} />
      </div>
      <div className="user-result-card__item grid-item__username">
        <p>{name}</p>
      </div>
      <div className="user-result-card__item grid-item__asked">
        <p>Asked</p>
        <p>{questions}</p>
      </div>
      <div className="user-result-card__item grid-item__answered">
        <p>Answered</p>
        <p>{answers}</p>
      </div>
      <div className="user-result-card__item grid-item__score">
        <p>Score</p>
        <p className="user-result-card__score">{score}</p>
      </div>
    </div>
  )
}

function mapStateToProps({ users }, { userID }) {
  return {
    user: users[userID],
  }
}

export default connect(mapStateToProps)(UserResultCard)
