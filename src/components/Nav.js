import React from 'react'
import { NavLink } from 'react-router-dom'

// Custom components
import UserNavBox from './UserNavBox'


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
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        </li>
      </ul>
      <UserNavBox />
    </nav>
  )
}
