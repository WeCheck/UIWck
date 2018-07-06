import React from 'react';
import PropTypes from 'prop-types';

import './css/Label.css'

const Input = ({children, htmlFor}) => (
    <label className="UIWck UIWck__label" htmlFor={htmlFor}>{children}</label>
);

Input.propTypes = {
    htmlFor: PropTypes.string,
};

export default Input;