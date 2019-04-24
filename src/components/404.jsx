import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function PageNotFound(props) {
  const { history } = props;
  const { push } = history;

  return (
    <section className="page_404">
      <div className="container">
        <div className="four_zero_four_bg">
          <h1 className="text-center ">404</h1>
        </div>

        <div className="contant_box_404">
          <h3 className="h2">Looks like you are lost</h3>

          <p>We dont have the page you are looking for</p>
          <Button
            className="btn-one"
            onClick={() => {
              push('/');
            }}
          >
            Go home
          </Button>
        </div>
      </div>
    </section>
  );
}
PageNotFound.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default PageNotFound;
