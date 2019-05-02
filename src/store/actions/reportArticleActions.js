import { toast } from 'react-toastify';
import { axiosConfigAuth } from '../../axiosConfig';
import { REPORT_SUCCESS, REPORT_FAILED, REPORTED_ARTICLE } from './actionTypes';

const reportAnArticle = (slug, reportData) => dispatch => axiosConfigAuth.request({
  method: 'post',
  url: `/articles/${slug}/report/`,
  data: reportData,
})
  .then(() => {
    dispatch({ type: REPORT_SUCCESS });
    dispatch({ type: REPORTED_ARTICLE });
  })
  .catch(() => {
    dispatch({ type: REPORT_FAILED });
    toast.error('Something went wrong while reporting the article.');
  });

export default reportAnArticle;
