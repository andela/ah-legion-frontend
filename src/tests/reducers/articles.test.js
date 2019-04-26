import {
  FETCH_ALL_ARTICLES,
  CREATE_ARTICLE,
  FETCH_ARTICLES_BY_AUTHOR,
  EDIT_ARTICLE,
  FETCH_ALL_ARTICLES_FAIL,
  FETCH_ARTICLES_BY_AUTHOR_FAIL,
  EDIT_ARTICLE_FAIL,
  PUBLISH_ARTICLE,
  PUBLISH_ARTICLE_FAIL,
  ONE_ARTICLE,
  ONE_ARTICLE_FAIL,
  DELETE_ARTICLE,
  DELETE_ARTICLE_FAIL,
} from '../../store/actions/actionTypes';
import reducer from '../../store/reducers/articlesReducer';
import { mapDispatchToProps, mapStateToProps } from '../../containers/UpdateArticleView';
import {
  articles, error, article,
} from '../testData';


describe('Articles reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        articles: [],
        article: [],
        authorArticles: [],
        editedArticle: [],
        publishedArticle: [],
        oneArticle: [],
        deletedArticle: [],
        isLoading: false,
      },
    );
  });
  it('should change state on action type FETCH_ALL_ARTICLES', () => {
    expect(
      reducer({}, {
        type: FETCH_ALL_ARTICLES,
        articles: {
          articles,
        },
      }),
    ).toEqual(
      {
        articles: { articles },
      },
    );
  });
  it('should change state on action type FETCH_ALL_ARTICLES_FAIL', () => {
    expect(
      reducer({}, {
        type: FETCH_ALL_ARTICLES_FAIL,
        error: {
          error,
        },
      }),
    ).toEqual(
      {
        articles: { error },
      },
    );
  });
  it('should change state on action type CREATE_ARTICLE', () => {
    expect(
      reducer({}, {
        type: CREATE_ARTICLE,
        article: {
          article,
        },
      }),
    ).toEqual(
      {
        article: { article },
      },
    );
  });
  it('should change state on action type FETCH_ALL_ARTICLES_BY_AUTHOR', () => {
    expect(
      reducer({}, {
        type: FETCH_ARTICLES_BY_AUTHOR,
        authorArticles: {
          articles,
        },
      }),
    ).toEqual(
      {
        authorArticles: { articles },
      },
    );
  });
  it('should change state on action type FETCH_ARTICLES_BY_AUTHOR_FAIL', () => {
    expect(
      reducer({}, {
        type: FETCH_ARTICLES_BY_AUTHOR_FAIL,
        authorArticles: {
          error,
        },
      }),
    ).toEqual(
      {
        authorArticles: { error },
      },
    );
  });
  it('should change state on action type EDIT_ARTICLE', () => {
    expect(
      reducer({}, {
        type: EDIT_ARTICLE,
        editedArticle: {
          article,
        },
        slug: 'dragons',
      }),
    ).toEqual(
      {
        editedArticle: { article },
      },
    );
  });
  it('should change state on action type EDIT_ARTICLE_FAIL', () => {
    expect(
      reducer({}, {
        type: EDIT_ARTICLE_FAIL,
        editedArticle: {
          error,
        },
      }),
    ).toEqual(
      {
        editedArticle: { error },
      },
    );
  });
  it('should change state on action type PUBLISH_ARTICLE', () => {
    expect(
      reducer({}, {
        type: PUBLISH_ARTICLE,
        publishedArticle: {
          article,
        },
        slug: 'dragons',
      }),
    ).toEqual(
      {
        publishedArticle: { article },
      },
    );
  });
  it('should change state on action type PUBLISH_ARTICLE_FAIL', () => {
    expect(
      reducer({}, {
        type: PUBLISH_ARTICLE_FAIL,
        publishedArticle: {
          error,
        },
      }),
    ).toEqual(
      {
        publishedArticle: { error },
      },
    );
  });

  it('should change state on action type ONE_ARTICLE', () => {
    expect(
      reducer({}, {
        type: ONE_ARTICLE,
        oneArticle: {
          article,
        },
        slug: 'dragons',
      }),
    ).toEqual(
      {
        oneArticle: { article },
      },
    );
  });
  it('should change state on action type ONE_ARTICLE_FAIL', () => {
    expect(
      reducer({}, {
        type: ONE_ARTICLE_FAIL,
        error: {
          error,
        },
      }),
    ).toEqual(
      {
        oneArticle: { error },
      },
    );
  });
  it('should change state on action type DELETE_ARTICLE', () => {
    expect(
      reducer({}, {
        type: DELETE_ARTICLE,
        deletedArticle: {
          article,
        },
        slug: 'dragons',
      }),
    ).toEqual(
      {
        deletedArticle: { article },
      },
    );
  });
  it('should change state on action type DELETE_ARTICLE_FAIL', () => {
    expect(
      reducer({}, {
        type: DELETE_ARTICLE_FAIL,
        error: {
          error,
        },
      }),
    ).toEqual(
      {
        deletedArticle: { error },
      },
    );
  });
});

describe('Update Article  MapDispatchToProps', () => {
  const dispatch = jest.fn();
  it('fetchOneArticle and edit article function is called', () => {
    mapDispatchToProps(dispatch).fetchOneArticle();
    mapDispatchToProps(dispatch).edit();
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('Update Article  map props to state', () => {
  const oneArticle = article;
  it('should return the initial state', () => {
    expect(mapStateToProps({ oneArticle })).toEqual({
      oneArticle,
    });
  });
});
