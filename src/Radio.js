import React, {Component} from 'react';
import PropTypes from 'prop-types'

import './css/Radio.scss'

class RadioGroup extends Component {
    static propTypes = {
        canRemoveSelection: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
    };

    static defaultProps = {
        canRemoveSelection: false
    }

    constructor(props) {
        super(props);

        this.state = {
            value: null,
            focused: false,
        }
    }

    handleRadioClicked(value) {
        if (this.props.canRemoveSelection && value === this.state.value) {
            value = null;
        }

        this.setState({
            value,
        });

        this.props.onChange({
            name: this.props.name,
            value: value
        })
    }

    render() {
        const {children, name, onBlur} = this.props;

        let gridTemplateColumns = '';

        children.forEach(() => {
            gridTemplateColumns = `${gridTemplateColumns}1fr `
        });

        return (
            <div className="UIWck__RadioGroup"
                 style={{gridTemplateColumns}}
                 tabIndex={0}
                 onClick={() => this.setState({focused: true})} onBlur={() => {
                if (this.state.focused) {
                    onBlur({
                        name: name,
                        value: this.state.value,
                    });
                    this.setState({
                        focused: false
                    })
                }
            }}>
                {children.map((children, index) => {
                    return React.cloneElement(children, {key: index, onClick: this.handleRadioClicked.bind(this), selected: this.state.value})
                })}
            </div>
        )
    }
}

const Radio = ({children, value, onClick, selected}) => (
    <div className={`UIWck__RadioGroup__radio${selected === value ? '--active' : ''}`}
         onClick={() => onClick(value)}>
        {children}
    </div>
);

export {
    RadioGroup,
    Radio
};