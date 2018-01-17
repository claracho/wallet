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
  console.log('wallet render');

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
        {card.name}
      </div>
    );
  });

  return (
    <div>
      {`${props.userData.username}'s wallet`}
      <CloseIcon onClick={handleLogOut} />
      <Link to={`/users/${props.userData.username}/addcard`}>Add a Card</Link>
      <Link to={`/users/${props.userData.username}/managecards`}>Manage Cards</Link>
      {cardList}
    </div>
  );
};

Wallet.propTypes = propTypes;
Wallet.defaultProps = defaultProps;

export default Wallet;
