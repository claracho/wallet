import React from 'react';
import PropTypes from 'prop-types';

import PayPal from 'react-icons/lib/fa/cc-paypal';
import Visa from 'react-icons/lib/fa/cc-visa';
import MC from 'react-icons/lib/fa/cc-mastercard';
import Amex from 'react-icons/lib/fa/cc-amex';
import Discover from 'react-icons/lib/fa/cc-discover';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  card: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    number: PropTypes.number,
    type: PropTypes.string,
    expiration: PropTypes.number,
    cvv: PropTypes.number,
  }),
};

const defaultProps = {
  card: {
    _id: null,
    name: null,
    firstName: null,
    lastName: null,
    number: null,
    type: null,
    expiration: null,
    cvv: null,
  },
};

const CardForm = props => (
  <form className="form" onSubmit={props.onSubmit}>
    <input type="text" className="col-50" name="firstName" placeholder="First Name" defaultValue={props.card.firstName} required />
    <input type="text" className="col-50" name="lastName" placeholder="Last Name" defaultValue={props.card.lastName} required />
    <input type="text" className="col-100" name="number" placeholder="Card Number" maxLength="16" defaultValue={props.card.number} required />
    <div className="col-100 cc-holder">
      <label htmlFor="PayPal">
        <input type="radio" name="type" id="PayPal" value="PayPal" defaultChecked={props.card.type === 'PayPal'} />
        <PayPal className="icon cc" />
      </label>
      <label htmlFor="Visa">
        <input type="radio" name="type" id="Visa" value="Visa" defaultChecked={props.card.type === 'Visa'} />
        <Visa className="icon cc" />
      </label>
      <label htmlFor="MC">
        <input type="radio" name="type" id="MC" value="MC" defaultChecked={props.card.type === 'MC'} />
        <MC className="icon cc" />
      </label>
      <label htmlFor="Amex">
        <input type="radio" name="type" id="Amex" value="Amex" defaultChecked={props.card.type === 'Amex'} />
        <Amex className="icon cc" />
      </label>
      <label htmlFor="Discover">
        <input type="radio" name="type" id="Discover" value="Discover" defaultChecked={props.card.type === 'Discover'} />
        <Discover className="icon cc" />
      </label>
    </div>
    <input type="text" className="col-50" name="expiration" placeholder="Exp Date" maxLength="4" defaultValue={props.card.expiration} required />
    <input type="text" className="col-50" name="cvv" placeholder="CVV Code" maxLength="4" defaultValue={props.card.cvv} required />
    <button className="col-100" type="submit">{props.card._id ? 'Modify' : 'Add'}</button>
  </form>
);

CardForm.propTypes = propTypes;
CardForm.defaultProps = defaultProps;

export default CardForm;
