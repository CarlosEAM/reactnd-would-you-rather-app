import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'


class App extends Component {
  componentDidMount() {
    // request initial data
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        {this.props.loading === true ? <h3>LOADING</h3> : <Dashboard />}
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
