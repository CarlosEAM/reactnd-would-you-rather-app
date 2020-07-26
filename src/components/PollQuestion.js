import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswer } from '../actions/shared'

// Custom components
import PollHeader from './PollHeader'


class PollQuestion extends Component {
  state = {
    answer: '',
    toPollDetails: false,
  }

  handleChange = (e) => {
    this.setState({
      answer: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { answer } = this.state;
    const { dispatch } = this.props;
    const { id } = this.props.question;

    dispatch(handleAnswer(id, answer));

    this.setState({
      answer: '',
      toPollDetails: true,
    })
  }

  render() {
    const { answer, toPollDetails } = this.state;
    const disabled = answer === '' ? true : false;

    // Check if answer was submitted and redirect to poll details
    if (toPollDetails === true) {
      return <Redirect to={'/questions/' + this.props.question.id} />
    }

    return (
      <div className="poll-question">
        <PollHeader authorID={this.props.question.author} />
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="input-radio__label">
            <input
              className="input-radio"
              type="radio"
              name="poll questions"
              value="optionOne"
              onChange={this.handleChange}
            />
            <span className="input-radio__label-text">{this.props.question.optionOne.text}</span>
          </label>
          <p>or</p>
          <label className="input-radio__label">
            <input
              className="input-radio"
              type="radio"
              name="poll questions"
              value="optionTwo"
              onChange={this.handleChange}
            />
            <span className="input-radio__label-text">{this.props.question.optionTwo.text}</span>
          </label>
          <button
            className="submit-btn"
            type="submit"
            disabled={disabled}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { qid } = props;
  const question = questions[qid]

  return {
    authedUser,
    question,
  }
}

export default connect(mapStateToProps)(PollQuestion);
