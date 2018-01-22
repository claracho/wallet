import React from 'react';
import { connect } from 'react-redux';

import AngleRight from 'react-icons/lib/fa/angle-right';
import AngleLeft from 'react-icons/lib/fa/angle-left';

import { addCard } from '../actions';

import CardForm from './CardForm';

const AddCard = (props) => {
  const { username } = props.match.params;
  const onSubmit = (e) => {
    e.preventDefault();
    const card = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      number: e.target.number.value,
      type: e.target.type.value,
      expiration: e.target.expiration.value,
      cvv: e.target.expiration.value,
    };
    props.addCard(username, card)
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

const mapDispatchToProps = dispatch =>
  ({
    addCard: (username, card) => dispatch(addCard(username, card)),
  });

export default connect(null, mapDispatchToProps)(AddCard);
