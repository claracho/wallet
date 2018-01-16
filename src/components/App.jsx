import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import LogIn from './LogIn';
import Wallet from './Wallet';
import AddCard from './AddCard';
import ManageCards from './ManageCards';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
    };
  }

  componentDidMount() {
    axios.get('/userData')
      .then((result) => {
        const userData = result.data;
        this.setState({ userData });
      });
  }

  render() {
    console.log('app render');
    return (
      <Router>
        <div className="container">
          <Route
            exact
            path="/(login)?"
            render={() => (
              this.state.userData
                ? (<Redirect to={`/users/${this.state.userData.username}`} />)
                : (<LogIn />)
            )}
          />
          <Route
            exact
            path="/users/:username"
            render={() => (
              <Wallet userData={this.state.userData} />
            )}
          />
          <Route
            exact
            path="/users/:username/addcard"
            render={() => (
              <AddCard />
            )}
          />
          <Route
            exact
            path="/users/:username/managecards"
            render={() => (
              <ManageCards userData={this.state.userData} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
