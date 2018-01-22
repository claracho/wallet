import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CloseIcon from 'react-icons/lib/fa/close';

import { setSelectedCard, logOut } from '../actions';

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
  handleLogOut: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const Wallet = (props) => {
  const handleLogOut = () => {
    props.handleLogOut()
      .then(() => {
        props.history.push('/');
      });
  };

  const cardList = props.userData.cards.map((card) => {
    const className = (props.selectedCard._id && props.selectedCard._id === card._id)
      ? 'card selected-card'
      : 'card';
    return (
      <div key={card._id} className={className} onClick={() => props.handleSelect(card)}>
        {`${card.type} ${card.name}`}
      </div>
    );
  });

  return (
    <div className="wallet-sub-container">
      <div className="wallet-row">
        <CloseIcon className="icon hide" />
        {`${props.userData.username}'s wallet`}
        <CloseIcon className="icon" onClick={handleLogOut} />
      </div>
      <div className="wallet-row">
        <Link to={`/users/${props.userData.username}/addcard`}>
          {'+ Add'}
        </Link>
        <Link to={`/users/${props.userData.username}/managecards`}>
          {'Manage >'}
        </Link>
      </div>
      {cardList}
    </div>
  );
};

Wallet.propTypes = propTypes;

const mapStateToProps = state =>
  ({
    userData: state.userData,
    selectedCard: state.selectedCard,
  });

const mapDispatchToProps = dispatch =>
  ({
    handleSelect: card => dispatch(setSelectedCard(card)),
    handleLogOut: () => dispatch(logOut()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
