import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import PollCardHeader from './PollCardHeader'


// Controlled component container with two inputs
class PollCardCreator extends Component {
  state = {
    questionOne: '',
    questionTwo: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // info to save new question
    const { questionOne, questionTwo } = this.state;
    const { dispatch } = this.props;

    // save new question
    dispatch(handleAddQuestion(questionOne, questionTwo))

    // reset constrolled state values
    this.setState({
      questionOne: '',
      questionTwo: '',
    })
  }

  render() {
    const { questionOne, questionTwo } = this.state;
    const disabled = (questionOne === '' || questionTwo === '') ? true : false;
    return (
      <div className="poll-card-creator">
        <h2 className="poll-card-creator__header">Create a New Poll</h2>
        <PollCardHeader authorID={this.props.authorID} />
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="input-text__label">
            <span className="input-text__label-text">Question One</span>
            <input
              type="text"
              placeholder="Type you question here"
              value={questionOne}
              onChange={this.handleChange}
              maxLength={140}
              name="questionOne"
              id="questionOne"
              className="input-text"
            />
          </label>
          <label className="input-text__label">
            <span className="input-text__label-text">Question Two</span>
            <input
              type="text"
              placeholder="Type you question here"
              value={questionTwo}
              onChange={this.handleChange}
              maxLength={140}
              name="questionTwo"
              id="questionTwo"
              className="input-text"
            />
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

function mapStateToProps({ authedUser }) {
  return {
    authorID: authedUser
  }
}

export default connect(mapStateToProps)(PollCardCreator)
