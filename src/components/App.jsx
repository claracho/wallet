import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserData } from '../actions';

import Payable from './Payable';
import LogIn from './LogIn';
import Wallet from './Wallet';
import AddCard from './AddCard';
import ManageCards from './ManageCards';

class App extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    return (
      <Router>
        <div className="container">
          {this.props.userData.username
            ? (
              <div className="wallet-container">
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Redirect to={`/users/${this.props.userData.username}`} />
                  )}
                />
                <Route
                  exact
                  path="/users/:username"
                  component={Wallet}
                />
                <Route
                  exact
                  path="/users/:username/addcard"
                  component={AddCard}
                />
                <Route
                  exact
                  path="/users/:username/managecards"
                  component={ManageCards}
                />
              </div>)
            : (
              <div className="login-container">
                <LogIn />
              </div>
            )}
          <div className="payable-container">
            <Payable />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state =>
  ({
    userData: state.userData,
  });

const mapDispatchToProps = dispatch =>
  ({
    getUserData: () => dispatch(getUserData()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);
