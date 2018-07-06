import React from 'react';
import PropTypes from 'prop-types'

import './css/Button.css'

class Button extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        icon: PropTypes.any,
        arrows: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        type: 'primary',
        arrows: false,
    };

    render() {
        const {type, icon, arrows, onClick, children} = this.props;

        return (
            <button className={`UIWck wecForm__Button--${type}`} onClick={onClick && onClick}>
                {icon && <img src={icon} alt="" />}
                {children}
                {arrows && <span className="wecForm__Button__arrows" />}
            </button>
        )
    }
}

export default Button;