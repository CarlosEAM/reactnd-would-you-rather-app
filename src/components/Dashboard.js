import React, { Component } from 'react'
import { connect } from 'react-redux'

// Custom components
import PollPreview from './PollPreview'


class Dashboard extends Component {
  render() {
    return (
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
                {this.props.unansweredPolls.map(cardID => (
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
                {this.props.answeredPolls.map(cardID => (
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
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  // answered polls are taken from the users profile
  const answeredPolls = Object.keys(users[authedUser].answers);
  // filter the questions to find the ones not answered by logged user
  return {
    answeredPolls,
    unansweredPolls: Object.keys(questions).filter(question => !answeredPolls.includes(question))
  }
}

export default connect(mapStateToProps)(Dashboard)
