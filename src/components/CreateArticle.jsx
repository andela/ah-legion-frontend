import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import debounce from 'lodash.debounce';
import uploadImageCallBack from '../utils/imageUpload';

const CreateArticle = ({ ...props }) => {
  const {
    onSubmit,
    onEditorStateChange,
    handleChange,
    tags,
    draftStatus,
    handleDelete,
    handleAddition,
    handleDrag,
    onPublish,
    show,
  } = props;
  return (
    <Container>
      <Row>
        <Col>
          <div className="draft">
            <span className="draft">Draft</span>
            <span className="status">{draftStatus}</span>
            {show ? (
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={(
                  <Popover className="user-profile-container">
                  Publishing will become available after you start writing.
                  </Popover>
)}
                rootClose
              >
                <Button
                  variant="primary"
                  className="btn-publish"
                  onClick={onPublish}
                >
                Publish Article
                </Button>
              </OverlayTrigger>
            ) : (
              <Button
                variant="primary"
                className="btn-publish"
                onClick={onPublish}
              >
              Publish Article
              </Button>
            )}
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  rows="1"
                  placeholder="Title Here"
                  id="title"
                  className="draft-title-input"
                  onBlur={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  rows="2"
                  placeholder="Description Here"
                  id="description"
                  className="draft-text-area"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <br />
                <p>Now tell your story...</p>
                <br />
                <div className="draft-editor">
                  <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    toolbar={{
                      options: ['inline', 'image'],
                      inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                        bold: { className: 'bordered-option-classname' },
                        italic: { className: 'bordered-option-classname' },
                        underline: { className: 'bordered-option-classname' },
                        strikethrough: { className: 'bordered-option-classname' },
                        code: { className: 'bordered-option-classname' },
                      },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                      image: {
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                        alt: { present: true, mandatory: true },
                      },
                    }}
                    onEditorStateChange={debounce(onEditorStateChange, 1000)}
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <br />
                <p>Add or change tags so readers know what your story is about</p>
                <ReactTags
                  tags={tags}
                  classNames={{ remove: 'removeClass' }}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
CreateArticle.propTypes = {
  onSubmit: PropTypes.func,
  onEditorStateChange: PropTypes.func,
  handleChange: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  draftStatus: PropTypes.string,
  handleDelete: PropTypes.func,
  handleAddition: PropTypes.func,
  handleDrag: PropTypes.func,
  onPublish: PropTypes.func,
  show: PropTypes.bool,
};

CreateArticle.defaultProps = {
  onSubmit: () => {},
  onEditorStateChange: () => {},
  handleChange: () => {},
  tags: [],
  draftStatus: () => {},
  handleDelete: () => {},
  handleAddition: () => {},
  handleDrag: () => {},
  onPublish: () => {},
  show: false,
};
export default CreateArticle;
