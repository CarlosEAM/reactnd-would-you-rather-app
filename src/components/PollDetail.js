import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Custom components
import PollAnswer from './PollAnswer'
import PollQuestion from './PollQuestion'


// Container component
function AnswerPoll(props) {
  const { redirect, question_id, pollType } = props;

  // redirect to 404 Page if poll does not exist
  if (redirect) {
    return <Redirect to={{ pathname: '/page404' }} />
  }

  return (
    <div className="poll-details">
      {(pollType === 'answer')
        ? <PollAnswer qid={question_id} />
        : <PollQuestion qid={question_id} />}
    </div>
  )
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { question_id } = props.match.params;
  const options = ['optionOne', 'optionTwo'];
  let pollType = 'question';
  let redirect = false;

  // Use the array to check for existing polls by id
  const questionIDs = Object.keys(questions)

  if (questionIDs.includes(question_id)) {
    // Check which poll type we looking to display
    // Use 'pollType = answer | false' to inform type of poll to render
    options.forEach(option => {
      if (pollType === 'question' && questions[question_id][option].votes.includes(authedUser)) {
        pollType = 'answer'
      }
    });
  }else{
    // because poll id does not exist lets activate redirect
    redirect = true
  }

  return {
    questionIDs,
    question_id,
    pollType,
    redirect,
  }
}

export default connect(mapStateToProps)(AnswerPoll)
