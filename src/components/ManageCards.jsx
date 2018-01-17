import React, { Component } from 'react';

class ManageCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyCard: null,
    };
    this.username = this.props.match.params.username;
  }

  setModifyCard(id) {
    if (this.state.modifyCard && id === this.state.modifyCard) {
      this.setState({
        modifyCard: null,
      });
    } else {
      this.setState({
        modifyCard: id,
      });
    }
  }

  handleModifyCard(e, id) {
    this.props.handleModifyCard(e, id)
      .then(() => {
        this.props.history.push(`/users/${this.username}`);
      });
  }

  render() {
    console.log('manage cards render');

    const detail = (card) => (
      <div>
        <form onSubmit={e => this.handleModifyCard(e, card._id)}>
          <input type="text" name="firstName" defaultValue={card.firstName} required />
          <input type="text" name="lastName" defaultValue={card.lastName} required />
          <input type="text" name="number" defaultValue={card.number} required />
          <input type="text" name="expiration" defaultValue={card.expiration} required />
          <input type="text" name="cvv" defaultValue={card.cvv} required />
          <button type="submit">Modify Card</button>
        </form>
      </div>
    );

    const cardList = this.props.userData.cards.map(card => (
      <div key={card._id}>
        {card.name}
        <span onClick={() => this.props.handleRemoveCard(card._id)}>{' - '}</span>
        <span onClick={() => this.setModifyCard(card._id)}>{' m '}</span>
        {card._id === this.state.modifyCard
          ? detail(card)
          : null}
      </div>
    ));

    return (
      <div>
        <span onClick={this.props.history.goBack}>{' < '}</span>
        Manage Cards for {this.username}
        {cardList}
      </div>
    );
  }
}

export default ManageCards;
