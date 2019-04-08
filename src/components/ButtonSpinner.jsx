import React from 'react';
import { Spinner } from 'react-bootstrap';

const ButtonSpinner = () => (
  <Spinner
    as="span"
    animation="grow"
    size="sm"
    role="status"
    aria-hidden="true"
  />
);

export default ButtonSpinner;
