import { combineReducers } from 'redux';
import modalReducer from './modal-reducer';
import registerReducer from './registerReducer';
import alertModalReducer from './alertModalReducer';
import articlesReducer from './articlesReducer';
import loginReducer from './LoginReducer';
import profileReducer from './profileReducer';
import personalArticlesReducer from './personalArticlesReducer';

const rootReducer = combineReducers({
  modalState: modalReducer,
  registerState: registerReducer,
  alertModalState: alertModalReducer,
  profile: profileReducer,
  articles: articlesReducer,
  loginUser: loginReducer,
  personalArticles: personalArticlesReducer,
});
export default rootReducer;
