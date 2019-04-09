import React from 'react';

const AllArticles = ({ articles }) => (
  articles ? (
    articles.map(article => (
      <div key={article.id}>
        <span>{article.title}</span><br />
        <span>{article.description}</span>
      </div>
    ))
  ) : (
    <div>Loading...</div>
  )
);
export default AllArticles;
