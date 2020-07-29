import React from 'react'
import { NavLink } from 'react-router-dom'


// TODO: Create a logout button
export default function Nav(props) {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName="active">
            Create Poll
          </NavLink>
        </li>
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        <li>
        </li>
      </ul>
    </nav>
  )
}
