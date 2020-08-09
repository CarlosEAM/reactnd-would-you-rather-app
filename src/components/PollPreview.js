import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Custom components
import PollHeader from './PollHeader'


function PollCardPreview(props) {
  return (
    <div className="poll-card-preview">
      <PollHeader authorID={props.authorID} />
      <div className="poll-card-preview__text">
        <p>{props.preview}</p>
      </div>
      <button className="poll-card-preview__button">
        <Link to={`/questions/${props.id}`}>
          View
        </Link>
      </button>
    </div>
  )
}

function mapStateToProps({ questions, users }, { id }) {
  const authorID = users[questions[id].author].id;
  const preview = questions[id].optionOne['text'].substr(0, 16) + '...'

  return {
    authorID,
    preview,
  }
}

export default connect(mapStateToProps)(PollCardPreview)
