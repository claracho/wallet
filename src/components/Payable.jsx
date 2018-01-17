import React, { Component } from 'react';

class Payable extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.selectedCard !== this.props.selectedCard;
  }

  render() {
    console.log('payable render');
    return (
      <div>
        Amount Due: $13.37
        {this.props.selectedCard
          ? <button onClick={() => console.log(this.props.selectedCard)}>Pay with {this.props.selectedCard.name}</button>
          : null}
      </div>
    );
  }
}

export default Payable;
