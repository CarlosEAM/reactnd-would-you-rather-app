import React from 'react'
import { connect } from 'react-redux'

// Custom components
import PollPreview from './PollPreview'


function Dashboard(props) {
  const authed = props.authedUser;

  return authed !== null
    ? (
        <div className="dashboard">
          <div className="dashboard__btns">
            <button>Unanswered Polls</button>
            <button>Answered Polls</button>
          </div>
          <div className="dashboard__polls">

            <div className="dashboard__polls--unanswered">
              <h2>Unanswered</h2>

              <div className="poll-card-list">

                <ul>
                  {props.unansweredPolls.map(cardID => (
                    <li key={cardID}>
                      <PollPreview id={cardID} />
                    </li>
                  ))}
                </ul>

              </div>
            </div>

            <div className="dashboard__polls--answered">
              <h2>Answered</h2>

              <div className="poll-card-list">

                <ul>
                  {props.answeredPolls.map(cardID => (
                    <li key={cardID}>
                      <PollPreview id={cardID} />
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )
    : null
}

function mapStateToProps({ authedUser, users, questions }) {
  let answeredPolls = '', unansweredPolls = '';

  if ( authedUser !== null) {
    // answered polls are taken from the users profile
    answeredPolls = Object.keys(users[authedUser].answers).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    // filter the questions to find the ones not answered by logged user
    unansweredPolls = Object.keys(questions).filter(question => !answeredPolls.includes(question)).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }

  return authedUser !== null
    ? {
      answeredPolls,
      unansweredPolls,
      authedUser
    }
    : { authedUser }
}

export default connect(mapStateToProps)(Dashboard)
