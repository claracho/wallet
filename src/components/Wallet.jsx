import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      <span onClick={handleLogOut}>{' X '}</span>
      <Link to={`/users/${props.userData.username}/addcard`}>Add a Card</Link>
      <Link to={`/users/${props.userData.username}/managecards`}>Manage Cards</Link>
      {cardList}
    </div>
  );
};

export default Wallet;
