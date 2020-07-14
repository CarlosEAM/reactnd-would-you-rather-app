import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollCardHeader from './PollCardHeader'


class PollCardPreview extends Component {
  render() {
    return (
      <div className="poll-card-preview">
        <PollCardHeader authorID={this.props.authorID} />
        <div>
          <p>{this.props.preview}</p>
        </div>
        <button>VIEW</button>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const authorID = users[questions[id].author].id;
  const preview = questions[id].optionOne['text'].substr(0, 12) + '...'

  // console.log('author:', authorID)

  return {
    authorID,
    preview,
  }
}

export default connect(mapStateToProps)(PollCardPreview)
