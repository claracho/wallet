import React from 'react';

const LogIn = (props) => (
  <div className="login">
    <h4>wallet</h4>
    <form onSubmit={props.handleLogIn}>
      <input type="text" name="username" placeholder="username" required />
      <button type="submit">Log In</button>
    </form>
  </div>
);

export default LogIn;
