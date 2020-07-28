import React, { Component, Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

// custom components
import Login from './Login'
import Nav from './Nav'
import Dashboard from './Dashboard'
import NewPoll from './NewPoll'
import PollDetail from './PollDetail'
import Leaderboard from './Leaderboard'


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
            {this.props.loading === true
              ? <h3>LOADING</h3>
              : <div>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/questions/:question_id" component={PollDetail} />
                  <Route path="/add" component={NewPoll} />
                  <Route path="/leaderboard" component={Leaderboard} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

// Upgrading App to a container
export default connect(mapStateToProps)(App);
