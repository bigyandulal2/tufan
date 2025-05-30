import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({
  label,
  name,
  value,
  checked,
  onChange,
  className = '',
  labelClassName = '',
  ...props
}) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-[#f04f18] border-[#0000003f] focus:ring-[#f04f18]"
        {...props}
      />
      <span className={`ml-2 text-[17px] font-light text-black font-['Lexend'] ${labelClassName}`}>
        {label}
      </span>
    </label>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default RadioButton;