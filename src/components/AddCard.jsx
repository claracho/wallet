import React from 'react';

const AddCard = (props) => {
  const { username } = props.match.params;
  const onSubmit = (e) => {
    props.handleAddCard(e)
      .then(() => {
        props.history.push(`/users/${username}`);
      });
  };

  return (
    <div>
      <span onClick={props.history.goBack}>{' < '}</span>
      Add Card for {username}
      <form onSubmit={onSubmit}>
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
