/* eslint-disable no-unused-expressions */
import {
  PROFILE_FETCHED,
  PROFILE_UPDATE_SUCESSFUL,
  PROFILE_UPDATE_FAILED,
  AUTHENTICATION_FAILED,
} from './actionTypes';
import axiosConfig from '../../axiosConfig';

export const fetchProfile = () => dispatch => axiosConfig.request({
  method: 'get',
  url: 'user/',
})
  .then((response) => {
    dispatch({
      type: PROFILE_FETCHED,
      payload: response.data,
    });
  })
  .catch((error) => {
    dispatch({
      type: AUTHENTICATION_FAILED,
      payload: error.response.data,
    });
  });
export const updateProfile = updatedProfileInfo => dispatch => axiosConfig.request({
  method: 'put',
  url: 'user/',
  data: updatedProfileInfo,
})
  .then((response) => {
    dispatch({
      type: PROFILE_UPDATE_SUCESSFUL,
      payload: response.data,
    });
  })
  .catch((error) => {
    dispatch({
      type: PROFILE_UPDATE_FAILED,
      payload: error.response.data,
    });
  });
