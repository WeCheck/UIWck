import React from 'react';
import PropTypes from 'prop-types';

import './css/Label.scss'

const Input = ({children, htmlFor}) => (
    <label className="UIWck__label" htmlFor={htmlFor}>{children}</label>
);

Input.propTypes = {
    htmlFor: PropTypes.string,
};

export default Input;