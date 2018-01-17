import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectedCard: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    expiration: PropTypes.number.isRequired,
    cvv: PropTypes.number.isRequired,
  }),
};

const defaultProps = {
  selectedCard: null,
};

class Payable extends Component {
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

Payable.propTypes = propTypes;
Payable.defaultProps = defaultProps;

export default Payable;
