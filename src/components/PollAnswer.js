import React from 'react'
import { connect } from 'react-redux'


function PollAnswer(props) {
  const { avatar, totalVotes, chosenAnswer } = props;

  return (
    <div className="poll-answer">
      <h2 className="poll-answer__header">Answer Details</h2>
      <div className="poll-answer__wrapper">
        {props.options.map((option, i) => (
          <div key={option.answer} className="answer-option">
           {(option.answer === chosenAnswer || option.answer === chosenAnswer)
            ? (<div className="answer-option--item answer-option__avatar">
                <img src={avatar} alt="" />
              </div>)
            : null}
            <div className="answer-option--item answer-option__text">
              {option.text}
            </div>
            <div className="answer-option--item answer-option__vote-total">
              <p>Number Of Votes</p>
              <span>{option.nOfVotes} of {totalVotes}</span>
            </div>
            <div className="answer-option--item answer-option__vote-percentage">
              <p>{option.percentOfVotes}%</p>
            </div>
            <div className="answer-option--item"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { qid } = props;
  const avatar = users[authedUser].avatarURL;

  // Get total number of votes for each option
  const optionOneVotes = questions[qid].optionOne.votes;
  const optionTwoVotes = questions[qid].optionTwo.votes;

  // Two assumptions are made here:
  // 1. ONLY a LOGGED in USER CAN VIEW a poll detail
  // 2. The LOGGED in USER MUST to HAVE ANSWERED the question before they can view POLL detail
  const chosenAnswer = (optionOneVotes.includes(authedUser)) ? 'questionOne' : 'questionTwo';

  // Combined number of votes
  const totalVotes = optionOneVotes.length + optionTwoVotes.length;

  // Work out percentage of votes for each option, rouding to 2 decimal points
  const optionOnePercent = ((optionOneVotes.length / totalVotes) * 100).toFixed(2);
  const optionTwoPercent = ((optionTwoVotes.length / totalVotes) * 100).toFixed(2);

  return {
    avatar,
    chosenAnswer,
    totalVotes,
    options: [
      {
        answer: 'questionOne',
        text: questions[qid].optionOne.text,
        nOfVotes: optionOneVotes.length,
        percentOfVotes: optionOnePercent,
      },
      {
        answer: 'questionTwo',
        text: questions[qid].optionTwo.text,
        nOfVotes: optionTwoVotes.length,
        percentOfVotes: optionTwoPercent,
      }
    ],
  }
}

export default connect(mapStateToProps)(PollAnswer)
