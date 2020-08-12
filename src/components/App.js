import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

// custom components
import Login from './Login'
import Nav from './Nav'
import PrivateRoute from './PrivateRoute'
import Dashboard from './Dashboard'
import NewPoll from './NewPoll'
import PollDetail from './PollDetail'
import Leaderboard from './Leaderboard'
import Page404 from './Page404'

class App extends Component {
  componentDidMount() {
    // request initial data
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (

      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav />
              <div className="main-content">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute path="/questions/:question_id" component={PollDetail} />
                  <PrivateRoute path="/add" component={NewPoll} />
                  <PrivateRoute path="/leaderboard" component={Leaderboard} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="*" component={Page404} />
                </Switch>
              </div>
          </div>
        </Fragment>
      </Router>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

// Upgrading App to a container
export default connect(mapStateToProps)(App);
