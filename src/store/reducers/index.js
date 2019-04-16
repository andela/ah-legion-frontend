import { combineReducers } from 'redux';
import modalReducer from './modal-reducer';
import registerReducer from './registerReducer';
import alertModalReducer from './alertModalReducer';

const rootReducer = combineReducers({
  modalState: modalReducer,
  registerState: registerReducer,
  alertModalState: alertModalReducer,
});

export default rootReducer;
