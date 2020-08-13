import React from 'react'
import Avatar_404page from '../images/Avatar_404page.png'

export default function Page404(props) {
  return (
    <div className="page404">
      <h1>404 PAGE</h1>
      <div className="page404__avatar">
        <img src={Avatar_404page} alt="avatar" />
      </div>
      <p>The page you are trying to view does not exist</p>
    </div>
  )
}
