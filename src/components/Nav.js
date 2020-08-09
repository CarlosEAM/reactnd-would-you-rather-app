import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect} from 'react-redux'

// Custom components
import UserNavBox from './UserNavBox'


function Nav(props) {
  return props.auth === true
    ?
      (
        <nav className="nav">
          <ul className="main-nav">
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
    :
      null
}

function mapStateToProps( { authedUser }) {
  return {
    auth: authedUser !== null ? true : false,
  }
}

export default connect(mapStateToProps)(Nav)
