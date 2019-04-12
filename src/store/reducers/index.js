import { combineReducers } from 'redux';
import modalReducer from './modal-reducer';

const rootReducer = combineReducers({
  modalState: modalReducer,
});

export default rootReducer;
