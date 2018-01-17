import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import Payable from './Payable';
import LogIn from './LogIn';
import Wallet from './Wallet';
import AddCard from './AddCard';
import ManageCards from './ManageCards';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      selectedCard: null,
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
    this.handleModifyCard = this.handleModifyCard.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    axios.get('/userData')
      .then((result) => {
        this.setState({ userData: result.data });
      });
  }

  handleLogIn(e) {
    e.preventDefault();
    const username = e.target.username.value;
    axios.post('/login', { username })
      .then((result) => {
        this.setState({ userData: result.data });
      });
  }

  handleLogOut() {
    return axios.get('/logout')
      .then(() => {
        this.setState({
          userData: null,
          selectedCard: null,
        });
      });
  }

  handleSelect(card) {
    if (this.state.selectedCard && card._id === this.state.selectedCard._id) {
      this.setState({ selectedCard: null });
    } else {
      this.setState({ selectedCard: card });
    }
  }

  handleAddCard(e) {
    e.preventDefault();
    const card = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      number: e.target.number.value,
      expiration: e.target.expiration.value,
      cvv: e.target.expiration.value,
    };
    return axios.post(`/users/${this.state.userData.username}/cards`, card)
      .then((result) => {
        this.setState({ userData: result.data });
      });
  }

  handleRemoveCard(id) {
    return axios.delete(`/users/${this.state.userData.username}/cards/${id}`)
      .then((result) => {
        this.setState({ userData: result.data });
      });
  }

  handleModifyCard(e, id) {
    e.preventDefault();
    const card = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      number: e.target.number.value,
      expiration: e.target.expiration.value,
      cvv: e.target.expiration.value,
    };
    return axios.put(`/users/${this.state.userData.username}/cards/${id}`, card)
      .then((result) => {
        if (this.state.selectedCard && id === this.state.selectedCard._id) {
          const selectedCard = _.find(result.data.cards, { _id: id });
          this.setState({ userData: result.data, selectedCard });
        } else {
          this.setState({ userData: result.data });
        }
      });
  }

  render() {
    console.log('app render');
    return (
      <Router>
        <div className="container">
          {this.state.userData
            ? (
              <div className="wallet-container">
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Redirect to={`/users/${this.state.userData.username}`} />
                  )}
                />
                <Route
                  exact
                  path="/users/:username"
                  render={props => (
                    <Wallet
                      userData={this.state.userData}
                      selectedCard={this.state.selectedCard}
                      handleLogOut={this.handleLogOut}
                      handleSelect={this.handleSelect}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/users/:username/addcard"
                  render={props => (
                    <AddCard
                      handleAddCard={this.handleAddCard}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/users/:username/managecards"
                  render={props => (
                    <ManageCards
                      userData={this.state.userData}
                      handleRemoveCard={this.handleRemoveCard}
                      handleModifyCard={this.handleModifyCard}
                      {...props}
                    />
                  )}
                />
              </div>)
            : (
              <div className="wallet-container">
                <LogIn handleLogIn={this.handleLogIn} />
              </div>)}
          <div className="payable-container">
            <Payable selectedCard={this.state.selectedCard} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
