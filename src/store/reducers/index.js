import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import registerReducer from './registerReducer';
import alertModalReducer from './alertModalReducer';
import articlesReducer from './articlesReducer';
import loginReducer from './LoginReducer';
import profileReducer from './profileReducer';
import personalArticlesReducer from './personalArticlesReducer';
import passwordResetReducer from './passwordResetReducer';

const rootReducer = combineReducers({
  modalState: modalReducer,
  registerState: registerReducer,
  alertModalState: alertModalReducer,
  profile: profileReducer,
  articles: articlesReducer,
  loginUser: loginReducer,
  personalArticles: personalArticlesReducer,
  resetPasswordState: passwordResetReducer,
  article: articlesReducer,
  authorArticles: articlesReducer,
  editedArticle: articlesReducer,
  publishedArticle: articlesReducer,
  oneArticle: articlesReducer,
  deletedArticle: articlesReducer,
  isLoading: articlesReducer,
});

export default rootReducer;
