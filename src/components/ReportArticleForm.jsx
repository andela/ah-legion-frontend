import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { SHOW_MODAL } from '../store/actions/actionTypes';
import reportAnArticle from '../store/actions/reportArticleActions';
import store from '../store/store';

export class ReportArticleForm extends Component {
  constructor() {
    super();
    this.state = {
      reportedArticle: '',
    };
  }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };

    reportArticle = (event) => {
      event.preventDefault();
      const { slug, articleReporter } = this.props;
      const { reportedArticle } = this.state;
      const payload = {
        message: reportedArticle,
      };
      articleReporter(slug, payload);
      store.dispatch({ type: SHOW_MODAL, payload: { modalShow: false } });
    };

    render() {
      const { isLoading } = this.props;
      return (
        <div className="center">
          <br />
          <br />
          <Form>
            <Form.Group>
              <Form.Label>Report Article</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                onChange={this.handleChange}
                name="reportedArticle"
              />
            </Form.Group>
            <Button
              className="btn-one"
              type="submit"
              disabled={isLoading}
              onClick={this.reportArticle}
            >
              { isLoading ? 'Loading...' : 'Report' }
            </Button>
            <p className="swap-modal-text">
                Type an report above.
            </p>

          </Form>
        </div>
      );
    }
}

ReportArticleForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  slug: PropTypes.string,
  articleReporter: PropTypes.func.isRequired,
};

ReportArticleForm.defaultProps = {
  slug: '',
};

export const mapStateToProps = state => ({
  slug: state.modalState.slug,
});

export const mapDispatchToProps = dispatch => ({
  articleReporter: (slug, reportData) => {
    dispatch(reportAnArticle(slug, reportData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportArticleForm);
