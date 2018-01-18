import React from 'react';
import PropTypes from 'prop-types';
import AngleRight from 'react-icons/lib/fa/angle-right';
import AngleLeft from 'react-icons/lib/fa/angle-left';

import CardForm from './CardForm';

const propTypes = {
  handleAddCard: PropTypes.func.isRequired,
};

const AddCard = (props) => {
  const { username } = props.match.params;
  const onSubmit = (e) => {
    props.handleAddCard(e)
      .then(() => {
        props.history.push(`/users/${username}`);
      });
  };

  return (
    <div className="wallet-sub-container">
      <div className="wallet-row">
        <AngleLeft className="icon hide" />
        Add Debit or Credit Card
        <AngleRight className="icon" onClick={props.history.goBack} />
      </div>
      <CardForm onSubmit={onSubmit} />
    </div>
  );
};

AddCard.propTypes = propTypes;

export default AddCard;
