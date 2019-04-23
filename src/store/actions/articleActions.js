import {
  PERSONAL_ARTICLES_FETCHED,
  AUTHENTICATION_FAILED,
} from './actionTypes';
import { axiosConfigAuth } from '../../axiosConfig';

const fetchPersonalArticles = () => dispatch => axiosConfigAuth.request({
  method: 'get',
  url: '/user/articles/',
})
  .then((response) => {
    dispatch({
      type: PERSONAL_ARTICLES_FETCHED,
      payload: response.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: AUTHENTICATION_FAILED,
      payload: err.response,
    });
  });
export default fetchPersonalArticles;
