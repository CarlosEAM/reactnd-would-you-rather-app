import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Custom components
import PollHeader from './PollHeader'


function PollCardPreview(props) {
  return (
    <div className="poll-card-preview">
      <PollHeader authorID={props.authorID} />
      <div>
        <p>{props.preview}</p>
      </div>
      <button>
        <Link to={`/questions/${props.id}`}>
          VIEW
        </Link>
      </button>
    </div>
  )
}

function mapStateToProps({ questions, users }, { id }) {
  const authorID = users[questions[id].author].id;
  const preview = questions[id].optionOne['text'].substr(0, 12) + '...'

  return {
    authorID,
    preview,
  }
}

export default connect(mapStateToProps)(PollCardPreview)
