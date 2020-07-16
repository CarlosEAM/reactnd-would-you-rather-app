import React from 'react'
import PollCardPreview from './PollCardPreview'


export default function PollCardList(props) {
  return (
    <div className="poll-card-list">

      <ul>
        {props.pollCards.map(cardID => (
          <li key={cardID}>
            <PollCardPreview id={cardID} />
          </li>
        ))}
      </ul>

    </div>
  )
}
