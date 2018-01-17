import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleLogIn: PropTypes.func.isRequired,
};

const LogIn = props => (
  <div className="login">
    <h4>wallet</h4>
    <form onSubmit={props.handleLogIn}>
      <input type="text" name="username" placeholder="username" required />
      <button type="submit">Log In</button>
    </form>
  </div>
);

LogIn.propTypes = propTypes;

export default LogIn;
