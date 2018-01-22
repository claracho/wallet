import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TrashIcon from 'react-icons/lib/fa/trash-o';
import EditIcon from 'react-icons/lib/fa/edit';
import AngleRight from 'react-icons/lib/fa/angle-right';
import AngleLeft from 'react-icons/lib/fa/angle-left';

import { setModifyCard, clearModifyCard, modifyCard, removeCard } from '../actions';

import CardForm from './CardForm';

const propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  selectedCard: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    number: PropTypes.number,
    type: PropTypes.string,
    expiration: PropTypes.number,
    cvv: PropTypes.number,
  }).isRequired,
  modifyCardId: PropTypes.string.isRequired,
  setModifyCard: PropTypes.func.isRequired,
  clearModifyCard: PropTypes.func.isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  handleModifyCard: PropTypes.func.isRequired,
};

class ManageCards extends Component {
  constructor(props) {
    super(props);
    this.username = this.props.match.params.username;
  }

  setModifyCard(e, id) {
    e.stopPropagation();
    this.props.setModifyCard(id);
  }

  clearModifyCard() {
    this.props.clearModifyCard();
    this.props.history.goBack();
  }

  handleModifyCard(e, id) {
    e.preventDefault();
    const card = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      number: e.target.number.value,
      type: e.target.type.value,
      expiration: e.target.expiration.value,
      cvv: e.target.expiration.value,
    };
    this.props.handleModifyCard(this.username, this.props.selectedCard, id, card)
      .then(() => {
        this.props.history.push(`/users/${this.username}`);
      });
  }

  handleRemoveCard(e, id) {
    e.stopPropagation();
    this.props.handleRemoveCard(this.username, this.props.selectedCard, id);
  }

  render() {
    const cardList = this.props.userData.cards.map(card => (
      <div className="manage-row" key={card._id}>
        <div roles="modify" className="card" key={card._id} onClick={e => this.setModifyCard(e, card._id)}>
          <EditIcon className="icon" onClick={e => this.setModifyCard(e, card._id)} />
          <span>{`${card.type} ${card.name}`}</span>
          <TrashIcon className="icon" onClick={e => this.handleRemoveCard(e, card._id)} />
        </div>
        {card._id === this.props.modifyCardId
          ? <CardForm onSubmit={e => this.handleModifyCard(e, card._id)} card={card} />
          : null}
      </div>
    ));

    return (
      <div className="wallet-sub-container">
        <div className="wallet-row">
          <AngleLeft className="icon" onClick={() => this.clearModifyCard()} />
          Manage Cards for {this.username}
          <AngleRight className="icon hide" />
        </div>
        {cardList}
      </div>
    );
  }
}

ManageCards.propTypes = propTypes;

const mapStateToProps = state =>
  ({
    userData: state.userData,
    selectedCard: state.selectedCard,
    modifyCardId: state.modifyCardId,
  });

const mapDispatchToProps = dispatch =>
  ({
    setModifyCard: id => dispatch(setModifyCard(id)),
    clearModifyCard: () => dispatch(clearModifyCard()),
    handleModifyCard: (username, selectedCard, id, card) =>
      dispatch(modifyCard(username, selectedCard, id, card)),
    handleRemoveCard: (username, selectedCard, id) =>
      dispatch(removeCard(username, selectedCard, id)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(ManageCards);
