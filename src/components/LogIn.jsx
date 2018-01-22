import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logIn } from '../actions';

const propTypes = {
  handleLogIn: PropTypes.func.isRequired,
};

const LogIn = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    props.handleLogIn(username);
  };

  return (
    <div className="login">
      <div className="title">
        chowallet
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="col-100" name="username" placeholder="username" required />
        <button className="col-100" type="submit">Log In</button>
      </form>
    </div>
  );
};

LogIn.propTypes = propTypes;

const mapDispatchToProps = dispatch =>
  ({
    handleLogIn: username => dispatch(logIn(username)),
  });

export default connect(null, mapDispatchToProps)(LogIn);
