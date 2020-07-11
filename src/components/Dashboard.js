import React, { Component } from 'react'
import { connect } from 'react-redux'


class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="dashboard">

        <div className="dashboard__btn--toggle">
          <button>Unanswered Polls</button>
          <button>Answered Polls</button>
        </div>
        <div className="dashboard__polls">

          <div className="dashboard__polls--unanswered">
            UNANSWERED POLLS
          </div>

          <div className="dashboard__polls--answered">
            ANSWERED POLLS
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
