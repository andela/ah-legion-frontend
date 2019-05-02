import { toast } from 'react-toastify';
import axiosConfig, { axiosConfigAuth } from '../../axiosConfig';
import store from '../store';
import {
  FETCH_AN_ARTICLE,
  FETCH_ARTICLE_COMMENTS,
  FETCH_AN_ARTICLE_404,
  CREATE_COMMENT_SUCCESS,
  CREATE_REPLY_SUCCESS,
  EDITED_COMMENT,
  DELETED_COMMENT,
} from './actionTypes';

const getItem = (actionType, data) => ({
  type: actionType,
  payload: data,
});

export const fetchAnArticle = slug => dispatch => axiosConfig.request({
  method: 'get',
  url: `articles/${slug}/`,
})
  .then((response) => {
    dispatch({
      type: FETCH_AN_ARTICLE,
      payload: response.data.Article,
    });
  })
  .catch((error) => {
    dispatch(getItem(FETCH_AN_ARTICLE_404, error));
    toast.error(error, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  });

export const fetchArticleComments = slug => dispatch => axiosConfig.request({
  method: 'get',
  url: `articles/${slug}/comments/`,
})
  .then((response) => {
    dispatch(getItem(FETCH_ARTICLE_COMMENTS, response.data.Comments));
  })
  .catch((error) => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  });


export const createAComment = (slug, data) => dispatch => axiosConfigAuth.request({
  method: 'post',
  url: `articles/${slug}/comments/`,
  data: { body: data },
})
  .then(() => {
    dispatch({ type: CREATE_COMMENT_SUCCESS });
    store.dispatch(fetchArticleComments(slug));
  })
  .catch((error) => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  });


export const createAReply = (slug, pk, data) => dispatch => axiosConfigAuth.request({
  method: 'post',
  url: `articles/${slug}/comments/${pk}/`,
  data: { body: data },
})
  .then(() => {
    dispatch(getItem(CREATE_REPLY_SUCCESS));
    store.dispatch(fetchArticleComments(slug));
  })
  .catch((error) => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  });

export const editAComment = (slug, pk, data) => dispatch => axiosConfigAuth.request({
  method: 'patch',
  url: `articles/${slug}/comments/${pk}/`,
  data: { body: data },
})
  .then(() => {
    dispatch(getItem(EDITED_COMMENT));
    store.dispatch(fetchArticleComments(slug));
  })
  .catch((error) => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  });


export const deleteAComment = (slug, pk) => dispatch => axiosConfigAuth.request({
  method: 'delete',
  url: `articles/${slug}/comments/${pk}/`,
})
  .then(() => {
    dispatch(getItem(DELETED_COMMENT, pk));
    store.dispatch(fetchArticleComments(slug));
  })
  .catch((error) => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  });
