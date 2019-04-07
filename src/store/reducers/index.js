import { combineReducers } from 'redux';
import profile_reducer from './profile_reducer';


export default combineReducers({
    profile :profile_reducer
});
