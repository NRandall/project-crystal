import axios from 'axios';
import { UPDATE_MESSAGE, ADD_MESSAGE, GET_MESSAGES} from '../../helpers/constants/types';

export const updateMessage = (message) => {
  return dispatch => {
    axios.put('/api/v1/message')
      .then(response => {
        dispatch({
          type: UPDATE_MESSAGE,
          payload: response.data,
        });
      });
  };
};

export const addMessage = (message) => {
  return dispatch => {
    dispatch({
      type: ADD_MESSAGE,
      payload: message,
    });
  };
};

export const getMessages = (coupleID) => {
  return dispatch => {
    axios.get(`/api/v1/message/${coupleID}`)
      .then(response => {
        dispatch({
          type: GET_MESSAGES,
          payload: response.data.data,
        });
      });
  };
};
