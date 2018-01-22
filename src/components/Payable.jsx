import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  selectedCard: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    number: PropTypes.number,
    type: PropTypes.string,
    expiration: PropTypes.number,
    cvv: PropTypes.number,
  }).isRequired,
};

class Payable extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.selectedCard !== this.props.selectedCard;
  }

  render() {
    return (
      <div className="payable">
        Amount Due: $13.37
        {this.props.selectedCard._id
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

const mapStateToProps = state => ({
  selectedCard: state.selectedCard,
});

export default connect(mapStateToProps)(Payable);
