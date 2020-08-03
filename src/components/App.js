import React, { Component, Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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

// TODO: LOGOUT FLOW

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
              <div>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/questions/:question_id" component={PollDetail} />
                <PrivateRoute path="/add" component={NewPoll} />
                <PrivateRoute path="/leaderboard" component={Leaderboard} />
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
