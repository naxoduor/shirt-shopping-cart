import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { linkStyle } from './ButtonStyles'

const LinkButtons = ({ buttonText, buttonStyle, link}) => (
    <Fragment>
        <Link style={linkStyle} to={link}>
        <button style={buttonStyle}>{buttonText}</button>
        </Link>
    </Fragment>
);

LinkButtons.propTypes = {
    buttonText: PropTypes.string,
    buttonStyle: PropTypes.object.isRequired,
    link: PropTypes.string
}

LinkButtons.defaultProps = {
    link: '/',
    buttonText: 'Default Button Text'
}

export default LinkButtons;