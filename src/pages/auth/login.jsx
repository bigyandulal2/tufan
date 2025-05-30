import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../components/ui/InputField';

const LoginSection = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Login</h2>
      <InputField
        label="Phone No"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>
  );
};

LoginSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default LoginSection;
