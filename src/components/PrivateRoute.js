import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'



/**
 * @description Check user authentication
 * @param {object} component - the component to render
 * @param {string} authenticated - null or the user id
 * @param {object} rest - remaining props passed down
 */
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
        )
      }
    />
  )
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authenticated: authedUser,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
