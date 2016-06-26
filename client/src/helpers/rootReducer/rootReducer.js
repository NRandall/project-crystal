import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from '../../components/Authentication/authReducer';
import quizReducer from '../../components/Quiz/quizReducer';
import meterReducer from '../../components/Meter/meterReducer';
import messageReducer from '../../components/Chat/messageReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  quiz: quizReducer,
  meter: meterReducer,
  messages: messageReducer,
});

export default rootReducer;
