import reportArticleReducer from '../../store/reducers/reportArticleReducer';
import { REPORT_SUCCESS, REPORT_FAILED } from '../../store/actions/actionTypes';

describe('report article reducers tests', () => {
    it('should return the initial state', () => {
      expect(reportArticleReducer(undefined, {})).toEqual(
        {
          "reportArticle": false,
        },
      );
    });
    it('should change state on action type REPORT_SUCCESS', () => {
        expect(
            reportArticleReducer({}, {
            type: REPORT_SUCCESS
          })
        ).toEqual(
          {"reportArticle": true}
        )
    })
    it('should change state on action type REPORT_FAILED', () => {
        expect(
            reportArticleReducer({}, {
            type: REPORT_FAILED
          })
        ).toEqual(
          {"reportArticle": false}
        )
    })
});
