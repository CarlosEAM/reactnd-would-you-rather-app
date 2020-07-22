import React from 'react'
import { connect } from 'react-redux'

// Custom components
import PollAnswer from './PollAnswer'
import PollQuestion from './PollQuestion'


// Container component
function AnswerPoll(props) {
  const { question_id, pollType } = props;

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

  // Check which poll type we looking to display
  // Use 'pollType = answer | false' to inform type of poll to render
  options.forEach(option => {
    if (pollType === 'question' && questions[question_id][option].votes.includes(authedUser)) {
      pollType = 'answer'
    }
  });

  return {
    question_id,
    pollType,
  }
}

export default connect(mapStateToProps)(AnswerPoll)
