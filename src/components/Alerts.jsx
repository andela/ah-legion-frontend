import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Alerts(props) {
  const {
    variant, showAlert, onAlertClick, alertHeading, alertBody,
  } = props;
  return (
    <div>
      <Alert dismissible variant={variant} show={showAlert} onClick={onAlertClick}>
        <Alert.Heading>{alertHeading}</Alert.Heading>
        <p>{alertBody}</p>
      </Alert>
    </div>
  );
}
Alerts.propTypes = {
  variant: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  onAlertClick: PropTypes.func.isRequired,
  alertHeading: PropTypes.string.isRequired,
  alertBody: PropTypes.string.isRequired,
};
export default Alerts;
