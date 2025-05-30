import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  required = false,
  className = '',
  labelClassName = '',
  selectClassName = '',
  ...props
}) => {


  return (
    <div className={`mb-4 flex items-center gap-4  ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`ml-[31px] block text-[17px] font-light leading-[22px] text-black font-['Lexend'] mb-1 ${labelClassName}`}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`ml-[31px] w-[180px] h-[37px] text-[14px] border border-[#0000003f] rounded-[5px] p-2 focus:outline-none focus:ring-1 focus:ring-[#f04f18] appearance-none bg-white ${selectClassName}`}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  selectClassName: PropTypes.string,
};

export default Dropdown;