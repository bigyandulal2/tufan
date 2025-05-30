
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses = 'font-bold text-[20px] py-2 px-4 rounded-[8px] shadow-md border border-[#dcdcdc] font-[\'Plus_Jakarta_Sans\']';

  const variants = {
    primary: 'bg-[#f04f18] text-white',
    secondary: 'bg-[#737373] text-white',
    outline: 'bg-white text-[#110d0c] border-[#0000004c]',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;