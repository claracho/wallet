import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CloseIcon from 'react-icons/lib/fa/close';

const propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  selectedCard: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    expiration: PropTypes.number.isRequired,
    cvv: PropTypes.number.isRequired,
  }),
  handleLogOut: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  selectedCard: null,
};

const Wallet = (props) => {
  const handleLogOut = () => {
    props.handleLogOut()
      .then(() => {
        props.history.push('/');
      });
  };

  const cardList = props.userData.cards.map((card) => {
    const className = (props.selectedCard && props.selectedCard._id === card._id)
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
        <Link to={`/users/${props.userData.username}/addcard`}>Add a Card</Link>
        <Link to={`/users/${props.userData.username}/managecards`}>Manage Cards</Link>
      </div>
      {cardList}
    </div>
  );
};

Wallet.propTypes = propTypes;
Wallet.defaultProps = defaultProps;

export default Wallet;
