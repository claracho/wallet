import React from 'react';

const ManageCards = (props) => {
  const cardList = props.userData.cards.map(card => (
    <div key={card.id} value={card.id} onClick={() => console.log('manage card')}>
      {card.number}
    </div>
  ));

  return (
    <div>
      Manage Cards
      {cardList}
    </div>
  );
};

export default ManageCards;
