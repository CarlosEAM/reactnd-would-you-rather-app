import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateQuestion } from '../actions/questions'
import { updateUserAnswer } from '../actions/users'
import PollCardHeader from './PollCardHeader'


// Container component
class AnswerPoll extends Component {
  state = {
    answer: '',
  }

  handleChange = (e) => {
    this.setState({
      answer: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { answer } = this.state;
    const { dispatch, authedUser } = this.props;
    const { id } = this.props.question;

    // Update the store with answer
    dispatch(handleUpdateQuestion(id, answer))
    // Update current user with their answer
    dispatch(updateUserAnswer(authedUser, id, answer))
  }

  render() {
    const { answer } = this.state;
    const disabled = answer === '' ? true : false;
    return (
      <div className="answer-poll">
        <PollCardHeader authorID={this.props.question.author} />
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

function mapStateToProps({ authedUser, users, questions }) {
  // TODO: Pass in question id from previous component
  const id = 'vthrdm985a262al8qx3do';

  const question = questions[id]
  return {
    authedUser,
    question,
  }
}

export default connect(mapStateToProps)(AnswerPoll)
