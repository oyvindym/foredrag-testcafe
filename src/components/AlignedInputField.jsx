import React, { Component } from 'react';

import ErrorMessage from './AlignedErrorMessage';

class InputField extends Component {
  state = {
    touched: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.touched) {
      this.setState({ touched: nextProps.touched });
    }
  }

  render() {
    const { label, type, value, onChange, name, validator } = this.props;
    const { touched } = this.state;
    return (
      <div className="pure-control-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type={type}
          value={value}
          placeholder={label}
          onChange={onChange}
          onBlur={() => this.setState({ touched: true })}
          name={name}
        />
        {touched &&
          validator &&
          !validator(value) && <ErrorMessage message="Noe er galt her" />}
      </div>
    );
  }
}

export default InputField;
