import { PROFILE_FETCHED, PROFILE_UPDATED, TOKEN} from './action_types';

export const fetchProfile = () => dispatch => {
    fetch("http://127.0.0.1:8000/api/user/",{
            method : 'GET',
            headers :{
                'content-type':'application/json',
                'Authorization':'Bearer '+TOKEN
            }})
    .then(response => response.json())
    .then(data =>{dispatch({type: PROFILE_FETCHED, payload: data })});
    }

export const updateProfile = (updated_profile_info) => dispatch => {
    console.log(updated_profile_info)
    fetch("http://127.0.0.1:8000/api/user/",{
            method : 'PUT',
            headers :{
                'content-type':'application/json',
                'Authorization':'Bearer '+TOKEN
            },
            body : JSON.stringify(updated_profile_info)})
    .then(response => response.json())
    .then(data =>{console.log(data)
        dispatch({type: PROFILE_UPDATED, payload: data })});
    }
