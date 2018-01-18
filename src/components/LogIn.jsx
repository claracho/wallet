import React from 'react';
import PropTypes from 'prop-types';
import PayPal from 'react-icons/lib/fa/paypal';

const propTypes = {
  handleLogIn: PropTypes.func.isRequired,
};

const LogIn = props => (
  <div className="login">
    <div className="title">
      <PayPal className="logo" />
      wallet
    </div>
    <form onSubmit={props.handleLogIn}>
      <input type="text" className="col-100" name="username" placeholder="username" required />
      <button className="col-100" type="submit">Log In</button>
    </form>
  </div>
);

LogIn.propTypes = propTypes;

export default LogIn;
