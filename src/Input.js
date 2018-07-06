import React from 'react';
import PropTypes from 'prop-types'

import './css/Input.css'

class Input extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        value: PropTypes.string,
    };

    static defaultProps = {
        type: 'text',
        onChange: () => {},
        onBlur: () => {}
    };

    componentDidMount() {
        this.props.onChange({
            name: this.props.name,
            value: this.props.value ? this.props.value : null,
        })
    }

    handleBlur = (e) => {
        this.props.onBlur({
            name: this.props.name,
            value: e.target.value
        })
    };

    handleChange = (e) => {
        this.props.onChange({
            name: this.props.name,
            value: e.target.value,
        });
    };

    render() {
        const {name, type, placeholder} = this.props;

        return (
            <input
                name={name}
                type={type}
                id={name}
                placeholder={placeholder}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className='UIWck UIWck__input'
                autoComplete="off" />
        )
    }
}

export default Input;