import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrashIcon from 'react-icons/lib/fa/trash-o';
import EditIcon from 'react-icons/lib/fa/edit';
import AngleRight from 'react-icons/lib/fa/angle-right';
import AngleLeft from 'react-icons/lib/fa/angle-left';

import CardForm from './CardForm';

const propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  handleModifyCard: PropTypes.func.isRequired,
};

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

    const cardList = this.props.userData.cards.map(card => (
      <div className="manage-row" key={card._id}>
        <div className="card" key={card._id}>
          <EditIcon className="icon" onClick={() => this.setModifyCard(card._id)} />
          <span>{`${card.type} ${card.name}`}</span>
          <TrashIcon className="icon" onClick={() => this.props.handleRemoveCard(card._id)} />
        </div>
        {card._id === this.state.modifyCard
          ? <CardForm onSubmit={e => this.handleModifyCard(e, card._id)} card={card} />
          : null}
      </div>
    ));

    return (
      <div className="wallet-sub-container">
        <div className="wallet-row">
          <AngleLeft className="icon" onClick={this.props.history.goBack} />
          Manage Cards for {this.username}
          <AngleRight className="icon hide" />
        </div>
        {cardList}
      </div>
    );
  }
}

ManageCards.propTypes = propTypes;

export default ManageCards;
