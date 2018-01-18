import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectedCard: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
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
    return (
      <div className="payable">
        Amount Due: $13.37
        {this.props.selectedCard
          ? <button className="col-100" onClick={() => console.log(this.props.selectedCard)}>
              {`Pay with ${this.props.selectedCard.type} ${this.props.selectedCard.name}`}
            </button>
          : <button className="col-100 disabled" disabled>
              {'Select Payment Method'}
            </button>}
      </div>
    );
  }
}

Payable.propTypes = propTypes;
Payable.defaultProps = defaultProps;

export default Payable;
