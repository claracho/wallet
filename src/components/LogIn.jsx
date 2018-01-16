import React from 'react';

const LogIn = () => (
  <div>
    <form action="/login" method="POST">
      <input type="text" name="username" required />
      <button type="submit">Login</button>
    </form>
  </div>
);

export default LogIn;
