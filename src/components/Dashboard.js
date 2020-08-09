import React, { Component } from 'react'
import { connect } from 'react-redux'

// Custom components
import PollPreview from './PollPreview'


class Dashboard extends Component {
  state = {
    pollVisible: 'unanswered',
  }

  // toggle between unanswered and answered polls
  handleToggle = (viewPoll) => {
    const { pollVisible } = this.state;
    // only update state if user selects poll that is not in view
    if (viewPoll !== pollVisible) {
      this.setState({
        pollVisible: viewPoll,
      })
    }
  }

  render() {
    const authed = this.props.authedUser;
    const { pollVisible } = this.state;

    // return nothing if user not auth to view this page
    if (authed === null) return null;

    // Render the answered or unanswered polls depending on state, updated by the buttons
    return (
      <div className="dashboard">
        <div className="dashboard__btns-wrapper">
          <button
            onClick={() => this.handleToggle('unanswered')}
            className={`${pollVisible === 'unanswered' ? 'active' : 'deactive'} dashboard__btns`}
          >
            Unanswered Polls
          </button>
          <button
            onClick={() => this.handleToggle('answered')}
            className={`${pollVisible === 'answered' ? 'active' : 'deactive'} dashboard__btns`}
          >
            Answered Polls
          </button>
        </div>
        <div>
          <h2 className="dashboard__polls-header">{pollVisible}</h2>
          <div className="dashboard__polls-list">
            <ul>
              {this.props[pollVisible].map(cardID => (
                <li key={cardID}>
                  <PollPreview id={cardID} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  let answered = '', unanswered = '';

  if ( authedUser !== null) {
    // answered polls are taken from the users profile
    answered = Object.keys(users[authedUser].answers).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    // filter the questions to find the ones not answered by logged user
    unanswered = Object.keys(questions).filter(question => !answered.includes(question)).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }

  return authedUser !== null
    ? {
      answered,
      unanswered,
      authedUser
    }
    : { authedUser }
}

export default connect(mapStateToProps)(Dashboard)
