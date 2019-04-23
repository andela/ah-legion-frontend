/* eslint-disable no-unused-expressions */
import {
  PROFILE_FETCHED,
  PROFILE_UPDATE_SUCESSFUL,
  PROFILE_UPDATE_FAILED,
  AUTHENTICATION_FAILED,
  FOLLOW_AUTHOR_SUCCESSFUL,
  UNFOLLOW_AUTHOR_SUCCESSFUL,
  FOLLOW_AUTHOR_FAILED,
  UNFOLLOW_AUTHOR_FAILED,
  AUTHOR_PROFILE_FETCHED_SUCCESSFUL,
  AUTHOR_PROFILE_FETCH_FAILED,
} from './actionTypes';
import { axiosConfigAuth } from '../../axiosConfig';

export const fetchProfile = () => dispatch => axiosConfigAuth.request({
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
export const updateProfile = updatedProfileInfo => dispatch => axiosConfigAuth.request({
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

export const followAuthor = username => dispatch => axiosConfigAuth.request({
  method: 'post',
  url: `profiles/${username}/follow/`,
})
  .then((response) => {
    dispatch({
      type: FOLLOW_AUTHOR_SUCCESSFUL,
      payload: response.data,
    });
  })
  .catch((error) => {
    dispatch({
      type: FOLLOW_AUTHOR_FAILED,
      payload: error.response,
    });
  });

export const unfollowAuthor = username => dispatch => axiosConfigAuth.request({
  method: 'delete',
  url: `profiles/${username}/follow/`,
})
  .then((response) => {
    dispatch({
      type: UNFOLLOW_AUTHOR_SUCCESSFUL,
      payload: response.data,
    });
  })
  .catch((error) => {
    dispatch({
      type: UNFOLLOW_AUTHOR_FAILED,
      payload: error.response,
    });
  });

export const fetchAuthorProfile = username => dispatch => axiosConfigAuth.request({
  method: 'get',
  url: `profiles/${username}/`,
})
  .then((response) => {
    dispatch({
      type: AUTHOR_PROFILE_FETCHED_SUCCESSFUL,
      payload: response.data,
    });
  })
  .catch((error) => {
    dispatch({
      type: AUTHOR_PROFILE_FETCH_FAILED,
      payload: error.response.data,
    });
  });
