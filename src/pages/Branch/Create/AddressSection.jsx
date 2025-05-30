import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/ui/InputField';
import Dropdown from '../../../components/ui/Dropdown';

const AddressSection = ({ formData, handleChange }) => {


  const options = [
    { value: 'Koshi Province', label: 'Koshi Province' },
    { value: 'Madhesh Province', label: 'Madhesh Province' },
    { value: 'Bagamati Province', label: 'Bagamati Province' },
    { value: 'Gandaki Province', label: 'Gandaki Province' },
    { value: 'Karnali Province', label: 'Karnali Province' },
    { value: 'Sudurpashchim Province', label: 'Sudurpashchim Province' },

  ];
  return (
    <div className="mb-[10px]">
      <h2 className="text-[20px] font-medium text-black font-['Plus_Jakarta_Sans'] ">Address:</h2>
      <hr className="border-t border-[##110D0C] mb-2" />


      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 ">
        <Dropdown
          label="Provision:"
          name="province"
          options={options}
          value={formData.province}
          onChange={handleChange}
          placeholder="Choose provision"
          className='gap-x-4'
          required
        />
        <div className=''>
          <InputField
            label="District:"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>

        <InputField
          label="Local Level:"
          name="localLevel"
          value={formData.localLevel}
          onChange={handleChange}
          required
        />

        <InputField
          label="Ward Number:"
          name="wardNumber"
          value={formData.wardNumber}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

AddressSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddressSection;