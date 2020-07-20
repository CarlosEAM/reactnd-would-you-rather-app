import React, { Component, Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import PollCardCreator from './PollCardCreator'
import AnswerPoll from './AnswerPoll'
import Leaderboard from './Leaderboard'
import Nav from './Nav'


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
                  <Route path="/questions/:question_id" component={AnswerPoll} />
                  <Route path="/add" component={PollCardCreator} />
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
