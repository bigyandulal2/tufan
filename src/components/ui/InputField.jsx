import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  className = '',
  labelClassName = '',
  inputClassName = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <div
      className={`flex flex-col gap-[8px] md:flex-row md:items-start md:gap-[8px] mb-[8px] relative hover:scale-105 transition-transform duration-200 ${className}`}
    >
      {label && (
        <label
          htmlFor={name}
          className={`ml-[31px] w-[115px] h-[21px] text-[17px] font-light leading-[22px] text-black font-['Lexend'] ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative w-full max-w-[155px]">
        <input
          type={inputType}
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete="new-password"
          inputMode={isPasswordField ? 'text' : undefined}
          className={`appearance-none w-full h-[26px] border border-[#0000003f] rounded-[5px] px-2 py-1 text-[14px] pr-8 focus:outline-none focus:ring-1 focus:ring-[#f04f18] ${inputClassName}`}
          {...props}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-gray-600 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default InputField;
