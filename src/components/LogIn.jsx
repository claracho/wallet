import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleLogIn: PropTypes.func.isRequired,
};

const LogIn = props => (
  <div className="login">
    <div className="title">
      chowallet
    </div>
    <form onSubmit={props.handleLogIn}>
      <input type="text" className="col-100" name="username" placeholder="username" required />
      <button className="col-100" type="submit">Log In</button>
    </form>
  </div>
);

LogIn.propTypes = propTypes;

export default LogIn;
