import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SubmitButtons = ({ buttonText, buttonStyle }) => (
    <Fragment>
        <button
            style={buttonStyle}
            type="submit">
            {buttonText}
        </button>
    </Fragment>
);

SubmitButtons.propTypes={
    buttonText: PropTypes.string.isRequired,
    buttonStyle: PropTypes.objectOf.isRequired
};

export default SubmitButtons