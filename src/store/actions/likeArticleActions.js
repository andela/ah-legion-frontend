import { toast } from 'react-toastify';
import axiosConfig, { axiosConfigAuth } from '../../axiosConfig';
import {
  FETCH_TOTAL_LIKES,
  HAS_REACTION,
  REMOVE_REACTION,
} from './actionTypes';

export const fetchAllLikes = slug => dispatch => axiosConfig.request({
  method: 'get',
  url: `articles/${slug}/all-likes/`,
})
  .then((response) => {
    dispatch({
      type: FETCH_TOTAL_LIKES,
      payload: response.data,
    });
  })
  .catch(() => {
    toast.error('Something went wrong while getting article likes. Report article issue');
  });

export const fetchUserLikeStatus = slug => dispatch => axiosConfigAuth.request({
  method: 'get',
  url: `articles/${slug}/like/`,
})
  .then((response) => {
    if (response.data.is_like !== 'undefined') {
      dispatch({
        type: HAS_REACTION,
        payload: response.data,
      });
    }
  })
  .catch((error) => {
    dispatch({
      type: REMOVE_REACTION,
      error,
    });
  });

export const createLike = (slug, likeData) => dispatch => axiosConfigAuth.request({
  method: 'post',
  url: `articles/${slug}/like/`,
  data: likeData,
})
  .then((response) => {
    dispatch({
      type: HAS_REACTION,
      payload: response.data,
    });
  })
  .catch(() => {
    dispatch({
      type: REMOVE_REACTION,
    });
  });

export const updateLike = (slug, pk, likeData) => dispatch => axiosConfigAuth.request({
  method: 'patch',
  url: `articles/${slug}/like/${pk}/`,
  data: likeData,
})
  .then((response) => {
    dispatch({
      type: HAS_REACTION,
      payload: response.data,
    });
  })
  .catch(() => {
    dispatch({
      type: REMOVE_REACTION,
    });
  });

export const deleteLike = (slug, pk) => dispatch => axiosConfigAuth.request({
  method: 'delete',
  url: `articles/${slug}/like/${pk}/`,
})
  .then(() => {
    dispatch({
      type: REMOVE_REACTION,
    });
  })
  .catch(() => {
    dispatch({
      type: REMOVE_REACTION,
    });
  });
