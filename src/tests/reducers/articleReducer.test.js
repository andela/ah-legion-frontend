import articleReducer from '../../store/reducers/personalArticlesReducer';
import articleReducerComp from '../../store/reducers/articlesReducer';
import * as types from '../../store/actions/actionTypes';

describe('article reducer', () => {
  it('should return the initial state', () => {
    expect(articleReducer(undefined, {})).toEqual(
      {
        personalArticles: [],
        errors: {},
      },
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducer({}, {
        type: types.PERSONAL_ARTICLES_FETCHED,
        payload: [],
      }),
    ).toEqual(
      {
        personalArticles: [],
      },
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducer({}, {
        type: types.ARTICLE_FETCH_FAILED,
        payload: [],
      }),
    ).toEqual(
      {
        errors: [],
      },
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducerComp({}, {
        type: types.AUTHOR_ARTICLES_FETCHED,
        payload: [],
      }),
    ).toEqual(
      {},
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducerComp({}, {
        type: types.CREATE_ARTICLE,
        payload: [],
      }),
    ).toEqual(
      {},
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducerComp({}, {
        type: types.CREATE_ARTICLE_FAIL,
        payload: [],
      }),
    ).toEqual(
      {},
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducerComp({}, {
        type: types.FETCH_ARTICLES_BY_AUTHOR,
        payload: [],
      }),
    ).toEqual(
      {},
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducerComp({}, {
        type: types.FETCH_ARTICLES_BY_AUTHOR_FAIL,
        payload: [],
      }),
    ).toEqual(
        {},
    );
  });
});
