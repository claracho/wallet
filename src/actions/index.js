import axios from 'axios';
import _ from 'lodash';

export const updateUserData = userData => ({
  type: 'UPDATE_USER_DATA',
  userData,
});

export const clearUserData = () => ({
  type: 'CLEAR_USER_DATA',
});

export const setSelectedCard = selectedCard => ({
  type: 'SET_SELECTED_CARD',
  selectedCard,
});

export const updateSelectedCard = selectedCard => ({
  type: 'UPDATE_SELECTED_CARD',
  selectedCard,
});

export const clearSelectedCard = () => ({
  type: 'CLEAR_SELECTED_CARD',
});

export const setModifyCard = modifyCardId => ({
  type: 'SET_MODIFY_CARD',
  modifyCardId,
});

export const clearModifyCard = () => ({
  type: 'CLEAR_MODIFY_CARD',
});

export const getUserDataHasErrored = (hasErrored, errorMsg) => ({
  type: 'GET_USER_DATA_HAS_ERRORED',
  hasErrored,
  errorMsg,
});

export const logInHasErrored = (hasErrored, errorMsg) => ({
  type: 'LOG_IN_HAS_ERRORED',
  hasErrored,
  errorMsg,
});

export const logOutHasErrored = (hasErrored, errorMsg) => ({
  type: 'LOG_OUT_HAS_ERRORED',
  hasErrored,
  errorMsg,
});

export const addCardHasErrored = (hasErrored, errorMsg) => ({
  type: 'ADD_CARD_HAS_ERRORED',
  hasErrored,
  errorMsg,
});

export const modifyCardHasErrored = (hasErrored, errorMsg) => ({
  type: 'MODIFY_CARD_HAS_ERRORED',
  hasErrored,
  errorMsg,
});

export const deleteCardHasErrored = (hasErrored, errorMsg) => ({
  type: 'DELETE_CARD_HAS_ERRORED',
  hasErrored,
  errorMsg,
});


export const getUserData = () =>
  dispatch =>
    axios.get('/userData')
      .then((result) => {
        if (result.data) {
          dispatch(updateUserData(result.data));
        }
      })
      .catch(err => dispatch(getUserDataHasErrored(true, err)));

export const logIn = username =>
  dispatch =>
    axios.post('/login', { username })
      .then(result => dispatch(updateUserData(result.data)))
      .catch(err => dispatch(logInHasErrored(true, err)));

export const logOut = () =>
  dispatch =>
    axios.get('/logout')
      .then(() => {
        dispatch(clearSelectedCard());
        dispatch(clearUserData());
        dispatch(clearModifyCard());
      })
      .catch(err => dispatch(logOutHasErrored(true, err)));

export const addCard = (username, card) =>
  dispatch =>
    axios.post(`/users/${username}/cards`, card)
      .then(result => dispatch(updateUserData(result.data)))
      .catch(err => dispatch(addCardHasErrored(true, err)));

export const modifyCard = (username, selectedCard, id, card) =>
  dispatch =>
    axios.put(`/users/${username}/cards/${id}`, card)
      .then((result) => {
        if (id === selectedCard._id) {
          const newCard = _.find(result.data.cards, { _id: id });
          dispatch(updateSelectedCard(newCard));
        }
        dispatch(updateUserData(result.data));
        dispatch(setModifyCard(id));
      })
      .catch(err => dispatch(modifyCardHasErrored(true, err)));

export const removeCard = (username, selectedCard, id) =>
  dispatch =>
    axios.delete(`/users/${username}/cards/${id}`)
      .then((result) => {
        if (id === selectedCard._id) {
          dispatch(clearSelectedCard());
        }
        dispatch(updateUserData(result.data));
      })
      .catch(err => dispatch(deleteCardHasErrored(true, err)));
