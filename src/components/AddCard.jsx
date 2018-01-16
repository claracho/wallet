import React from 'react';

const AddCard = ({ match }) => {
  const { username } = match.params;
  return (
    <div>
      Add Card for {username}
      <form action={`/users/${username}/addcard`} method="POST">
        <input type="text" name="firstName" placeholder="first name" required />
        <input type="text" name="lastName" placeholder="last name" required />
        <input type="text" name="number" placeholder="card number" required />
        <input type="text" name="expiration" placeholder="expiration" required />
        <input type="text" name="cvv" placeholder="cvv" required />
        <button type="submit">Add A Card</button>
      </form>
    </div>
  );
};

export default AddCard;
