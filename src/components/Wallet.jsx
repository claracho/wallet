import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      cardSelected: null,
    };
  }

  componentDidMount() {
    axios.get(`/users/${this.props.userData.username}/cards`)
      .then((result) => {
        const cards = result.data;
        this.setState({ cards });
      });
  }

  selectCard(card) {
    const selected = !(this.state.cardSelected && card.number === this.state.cardSelected.number);
    this.setState({
      selected,
      cardSelected: card,
    });
  }

  render() {
    console.log('wallet render');

    const cardList = this.props.userData.cards.map(card => (
      <div key={card._id} onClick={() => this.selectCard(card)}>
        {card.number}
      </div>
    ));

    return (
      <div>
        {`${this.props.userData.username}'s wallet`}
        <form action="/logout" method="GET">
          <button type="submit">Logout</button>
        </form>
        <Link to={`/users/${this.props.userData.username}/addcard`}>Add a Card</Link>
        <Link to={`/users/${this.props.userData.username}/managecards`}>Manage Cards</Link>
        {cardList}
        {this.state.selected ? <button onClick={() => console.log(this.state.cardSelected)}>Pay</button> : null}
      </div>
    );
  }
}

export default Wallet;
