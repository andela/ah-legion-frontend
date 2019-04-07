import { PROFILE_FETCHED, PROFILE_UPDATED } from '../../actions/action_types';

const initialState =  {
    profile_data: {}
}

export default (state=initialState, action) => {
    switch(action.type){
        case PROFILE_FETCHED:
        console.log("profile reducer called")
          return {
            ...state,
            profile_data : action.payload
            
          }
        case PROFILE_UPDATED:
        console.log("profile updater was just called man")
        return{
            ...state,
            profile_data : action.payload
        }
        default:
          return state;

    }
      
}