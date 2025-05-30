import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/ui/InputField';

const ContactSection = ({ formData, handleChange }) => {
  return (
    <div className="mb-[10px]">
      <h2 className="text-[20px] font-medium text-black font-['Plus_Jakarta_Sans'] ">Contact:</h2>
      <hr className="border-t border-[##110D0C] mb-2" />
      <InputField
        label="Phone:"
        name="phoneNo"
        type="tel"
        value={formData.phoneNo}
        onChange={handleChange}
        required
      />
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 ">
        <InputField
          label="E-mail:"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          inputClassName='w-[222px]'
          required
        />
      </div>
    </div>
  );
};

ContactSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ContactSection;