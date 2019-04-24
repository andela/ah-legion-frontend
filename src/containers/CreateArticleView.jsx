import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {
  createAnArticle,
  editAnArticle,
  publishAnArticle,
} from '../store/actions/articles';
import CreateArticle from '../components/CreateArticle';

export class CreateArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      editorState: EditorState.createEmpty(),
      tagsInputValue: '',
      tags: [],
      count: 0,
      draftStatus: '',
      show: false,
    };
  }

  onEditorStateChange = (editorState) => {
    const { count } = this.state;
    this.setState(
      {
        count: count + 1,
        draftStatus: 'saving...',
        editorState,
      },
      () => {
        this.create();
      },
    );
  };

  onPublish = () => {
    const { count } = this.state;

    if (count < 2) {
      this.setState({
        show: true,
      });
    } else {
      this.publish();
    }
  };

  create = () => {
    const {
      title, description, tags, count, editorState,
    } = this.state;
    const { article, create, edit } = this.props;
    const articleSlug = article.article.slug;
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const tag = tags.map(item => item.text);
    const articleData = {
      article: {
        body: body || 'No Content',
        draft: body || 'No Content',
        title: title || 'Untitled article',
        description: description || 'No description',
        tagList: tag,
      },
    };
    if (count === 2) {
      create(articleData);
    } else if (count > 2) {
      edit(articleData, articleSlug);
      this.setState({
        draftStatus: 'saved',
      });
    }
  };

  publish = () => {
    const { article, history, publish } = this.props;
    const articleSlug = article.article.slug;
    publish(articleSlug);
    history.push('/articles/drafts');
  };

  handleChange = (e) => {
    const { count } = this.state;
    this.setState(
      {
        [e.target.id]: e.target.value,
        count: count + 1,
      },
      () => {
        this.create();
      },
    );
  };

  handleDelete = (position) => {
    const { count, tags } = this.state;
    this.setState(
      {
        tags: tags.filter((tag, index) => index !== position),
        count: count + 1,
      },
      () => {
        this.create();
      },
    );
  };

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  render() {
    const {
      draftStatus, tags, tagsInputValue, show,
    } = this.state;
    return (
      <CreateArticle
        onSubmit={this.onSubmit}
        handleChange={this.handleChange}
        onEditorStateChange={this.onEditorStateChange}
        addTag={this.addTag}
        updateTagValue={this.updateTagValue}
        removeTag={this.removeTag}
        updateTags={this.updateTags}
        tagsInputValue={tagsInputValue}
        tags={tags}
        uploadImageCallBack={this.uploadImageCallBack}
        draftStatus={draftStatus}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
        handleDrag={this.handleDrag}
        onPublish={this.onPublish}
        show={show}
      />
    );
  }
}

export const mapStateToProps = (state) => {
  const {
    article, editedArticle, publishedArticle,
  } = state;
  return {
    article,
    editedArticle,
    publishedArticle,
  };
};

export const mapDispatchToProps = dispatch => ({
  create: articleData => dispatch(createAnArticle(articleData)),
  edit: (articleData, slug) => dispatch(editAnArticle(articleData, slug)),
  publish: slug => dispatch(publishAnArticle(slug)),
});

CreateArticleView.propTypes = {
  article: PropTypes.string,
  history: PropTypes.string,
  create: PropTypes.func,
  edit: PropTypes.func,
  publish: PropTypes.func,
};

CreateArticleView.defaultProps = {
  article: '',
  history: '/',
  create: () => {},
  edit: () => {},
  publish: () => {},
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateArticleView);
