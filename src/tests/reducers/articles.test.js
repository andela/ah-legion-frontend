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
  VIEW_ARTICLES
} from "../../store/actions/actionTypes";
import reducer from "../../store/reducers/articlesReducer";
import { articles, error, article, containerArticles } from "../testData";
import articlesReducer from "../../store/reducers/articlesReducer";

describe("register reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      article: [],
      articles: [],
      authorArticles: [],
      editedArticle: [],
      loading: false,
      publishedArticle: [],
      results: []
    });
  });
  it("should change state on action type FETCH_ALL_ARTICLES", () => {
    expect(
      reducer(
        {},
        {
          type: FETCH_ALL_ARTICLES,
          articles: {
            articles
          }
        }
      )
    ).toEqual({
      articles: { articles }
    });
  });
  it("should change state on action type FETCH_ALL_ARTICLES_FAIL", () => {
    expect(
      reducer(
        {},
        {
          type: FETCH_ALL_ARTICLES_FAIL,
          error: {
            error
          }
        }
      )
    ).toEqual({
      articles: { error }
    });
  });
  it("should change state on action type CREATE_ARTICLE", () => {
    expect(
      reducer(
        {},
        {
          type: CREATE_ARTICLE,
          article: {
            article
          }
        }
      )
    ).toEqual({
      article: { article }
    });
  });
  it("should change state on action type FETCH_ALL_ARTICLES_BY_AUTHOR", () => {
    expect(
      reducer(
        {},
        {
          type: FETCH_ARTICLES_BY_AUTHOR,
          authorArticles: {
            articles
          }
        }
      )
    ).toEqual({
      authorArticles: { articles }
    });
  });
  it("should change state on action type FETCH_ARTICLES_BY_AUTHOR_FAIL", () => {
    expect(
      reducer(
        {},
        {
          type: FETCH_ARTICLES_BY_AUTHOR_FAIL,
          authorArticles: {
            error
          }
        }
      )
    ).toEqual({
      authorArticles: { error }
    });
  });
  it("should change state on action type EDIT_ARTICLE", () => {
    expect(
      reducer(
        {},
        {
          type: EDIT_ARTICLE,
          editedArticle: {
            article
          },
          slug: "dragons"
        }
      )
    ).toEqual({
      editedArticle: { article }
    });
  });
  it("should change state on action type EDIT_ARTICLE_FAIL", () => {
    expect(
      reducer(
        {},
        {
          type: EDIT_ARTICLE_FAIL,
          editedArticle: {
            error
          }
        }
      )
    ).toEqual({
      editedArticle: { error }
    });
  });
  it("should change state on action type PUBLISH_ARTICLE", () => {
    expect(
      reducer(
        {},
        {
          type: PUBLISH_ARTICLE,
          publishedArticle: {
            article
          },
          slug: "dragons"
        }
      )
    ).toEqual({
      publishedArticle: { article }
    });
  });
  it("should change state on action type PUBLISH_ARTICLE_FAIL", () => {
    expect(
      reducer(
        {},
        {
          type: PUBLISH_ARTICLE_FAIL,
          publishedArticle: {
            error
          }
        }
      )
    ).toEqual({
      publishedArticle: { error }
    });
  });
});

it("should dispatch success action on login success", () => {
  const initialState = {
    articles,
    results: []
  };
  const viewSuccess = {
    type: VIEW_ARTICLES,
    payload: containerArticles.articles.Articles
  };
  const successState = {
    articles,
    results: articles
  };
  expect(articlesReducer(initialState, viewSuccess)).toEqual(successState);
});
