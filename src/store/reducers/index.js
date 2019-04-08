import { combineReducers } from 'redux';
import modalReducer from './modal-reducer';
import registerReducer from './registerReducer';
import alertModalReducer from './alertModalReducer';
import articlesReducer from './articlesReducer';
import loginReducer from './LoginReducer';

const rootReducer = combineReducers({
  modalState: modalReducer,
  registerState: registerReducer,
  alertModalState: alertModalReducer,
  articles: articlesReducer,
  loginUser: loginReducer,
});
export default rootReducer;
