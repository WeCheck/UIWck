import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/Input.css'
import './css/Select.css'

class Select extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
    };

    static defaultProps = {
        onChange: () => {},
        onBlur: () => {}
    };

    constructor(props) {
        super(props);

        const children = props.children && (props.children.length ? props.children[0] : props.children);

        this.state = {
            value: !props.placeholder && children.props.value,
            display: props.placeholder || children.props.children,
            focusedOnce: false,
            open: false
        };

        if (!props.placeholder && children) {
            this.props.onChange({
                name: props.name,
                value: children.props.value
            })
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleBlur, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleBlur, false)
    }

    handleBlur = (e) => {
        if (!this.node.contains(e.target)) {
            this.setState({
                open: false
            });

            if (this.state.focusedOnce) {
                this.props.onBlur({
                    name: this.props.name,
                    value: this.state.value
                })
            }
        }
    };

    onChange = (value, display) => {
        this.setState({
            value,
            display,
        });

        setTimeout(() => {
            this.setState({
                open: false
            })
        }, 100);

        this.props.onChange({
            name: this.props.name,
            value: value
        })
    };

    render() {
        const {children} = this.props;
        const {display, open} = this.state;
        return (
            <div className="UIWck UIWck__select" ref={node => this.node = node}>
                <div className={`UIWck__select__label${open ? '--open' : ''}`} onClick={() => {
                    this.setState({
                        open: !open,
                        focusedOnce: true
                    })
                }}>{display}</div>
                <ul className={`UIWck__select__dropdown ${open ? 'dropdown--open' : ''}`}>
                    {children.length ? children.map(child => React.cloneElement(child, {
                        onClick: this.onChange,
                        selected: child.props.value === this.state.value
                    })) : React.cloneElement(children, {
                        onClick: this.onChange,
                        selected: children.props.value === this.state.value
                    })}
                </ul>
            </div>
        )
    }
}

const Option = ({children, value, onClick, selected}) => (
    <li tabIndex={0} onClick={() => onClick(value, children)} className={selected ? 'selected' : ''}>{children}</li>
);

export {
    Select,
    Option
};