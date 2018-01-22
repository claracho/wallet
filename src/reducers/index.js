import { combineReducers } from 'redux';

const userData = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return action.userData;
    case 'CLEAR_USER_DATA':
      return {};
    default:
      return state;
  }
};

const selectedCard = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CARD':
      return (state._id && action.selectedCard._id === state._id)
        ? {}
        : action.selectedCard;
    case 'UPDATE_SELECTED_CARD':
      return action.selectedCard;
    case 'CLEAR_SELECTED_CARD':
      return {};
    default:
      return state;
  }
};

const modifyCardId = (state = '', action) => {
  switch (action.type) {
    case 'SET_MODIFY_CARD':
      return (state !== '' && action.modifyCardId === state)
        ? ''
        : action.modifyCardId;
    case 'CLEAR_MODIFY_CARD':
      return '';
    default:
      return state;
  }
};

export default combineReducers({ userData, selectedCard, modifyCardId });
