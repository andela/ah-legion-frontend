import { axiosConfigAuth } from '../../axiosConfig';
import { NOT_BOOKMARKED, BOOKMARKED, BOOKMARKS_FETCHED } from './actionTypes';

export function getUserBookmarks() {
  return dispatch => axiosConfigAuth.request({
    method: 'get',
    url: 'articles/user/bookmarks/',
  })
    .then((response) => {
      dispatch({
        type: BOOKMARKS_FETCHED,
        payload: response.data.bookmarks,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
}

export function bookmarkArticle(payload) {
  return dispatch => axiosConfigAuth.request({
    method: payload.method,
    url: `articles/${payload.article.slug}/bookmark/`,
  })
    .then((response) => {
      if (response.status === 201) {
        dispatch({
          type: BOOKMARKED,
          payload: payload.article,
        });
      } else if (response.status === 204) {
        dispatch({
          type: NOT_BOOKMARKED,
          payload: payload.article,
        });
      }
    });
}
