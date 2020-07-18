import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import PollCardCreator from './PollCardCreator'
import AnswerPoll from './AnswerPoll'


class App extends Component {
  componentDidMount() {
    // request initial data
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <LoadingBar />
        {this.props.loading === true ? <h3>LOADING</h3> : <AnswerPoll />}
      </div>
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
