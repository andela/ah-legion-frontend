import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { editAnArticle, publishAnArticle, fetchAnArticle } from '../store/actions/articles';
import CreateArticle from '../components/CreateArticle';

export class UpdateArticleView extends Component {
  state = {
    activated: false,
    title: '',
    description: '',
    tags: [],
    draftStatus: '',
    show: false,
    editorState: EditorState.createEmpty(),
  };

  componentWillMount() {
    const { slug, fetchOneArticle } = this.props;
    const articleSlug = this.props.match.params.slug;
    fetchOneArticle(articleSlug);
  }

  componentWillReceiveProps(nextProps) {
    let article = [];
    article.push(nextProps.oneArticle.oneArticle);
    article = article[0];
    const {
 title, description, body, activated 
} = article;
    const contentBlock = htmlToDraft(body);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);

    this.setState({
      editorState,
      title,
      description,
      activated,
    });
  }


  onEditorStateChange = (editorState) => {
    this.setState(
      {
        draftStatus: 'saving...',
        editorState,
      },
    );
  };

  onSavePublish = () => {
    const {
      title, description, editorState,
    } = this.state;
    const { edit, history, publish } = this.props;
    const articleSlug = this.props.match.params.slug;
    const body = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    const articleData = {
      article: {
        title: title || 'Untitled article',
        description: description || 'No description',
        body,
      },
    };
    edit(articleData, articleSlug);
    publish(articleSlug);
    history.push('/articles/drafts');
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const {
      draftStatus, tags, show, editorState, description, title, activated,
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
        tags={tags}
        uploadImageCallBack={this.uploadImageCallBack}
        draftStatus={draftStatus}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
        handleDrag={this.handleDrag}
        onPublish={this.onPublish}
        show={show}
        title={title}
        activated={activated}
        description={description}
        editorState={editorState}
        onSavePublish={this.onSavePublish}
      />
    );
  }
}

export const mapStateToProps = (state) => {
  const { oneArticle } = state;
  return { oneArticle };
};

export const mapDispatchToProps = dispatch => ({
  fetchOneArticle: slug => dispatch(fetchAnArticle(slug)),
  edit: (articleData, slug) => dispatch(editAnArticle(articleData, slug)),
  publish: slug => dispatch(publishAnArticle(slug)),
});
UpdateArticleView.propTypes = {
  fetchOneArticle: PropTypes.func,
  history: PropTypes.string,
  edit: PropTypes.func,
  publish: PropTypes.func,
  match: PropTypes.shape({}).isRequired,
  params: PropTypes.shape({}).isRequired,
};

UpdateArticleView.defaultProps = {
  history: '/',
  edit: () => {},
  publish: () => {},
  fetchOneArticle: () => {},
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateArticleView);
