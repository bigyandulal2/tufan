import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/ui/InputField';
import Dropdown from '../../../components/ui/Dropdown';

const ManagerInfo = ({ formData, handleChange }) => {

  const options = [
    { value: 'Koshi Province', label: 'Koshi Province' },
    { value: 'Madhesh Province', label: 'Madhesh Province' },
    { value: 'Bagamati Province', label: 'Bagamati Province' },
    { value: 'Gandaki Province', label: 'Gandaki Province' },
    { value: 'Karnali Province', label: 'Karnali Province' },
    { value: 'Sudurpashchim Province', label: 'Sudurpashchim Province' },

  ];

  return (
    <>
      <div className="mb-[10px]">
        <h2 className="text-[20px] font-medium text-black font-['Plus_Jakarta_Sans'] ">Manager Info:</h2>
        <hr className="border-t border-[##110D0C] mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">

          <Dropdown
            label="Provision:"
            name="provision"
            options={options}
            value={formData.provision}
            onChange={handleChange}
            placeholder="Choose provision"
            required
          />

          <InputField
            label="District:"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />

          <InputField
            label="LocalLevel:"
            name="localLevel"
            value={formData.localLevel}
            onChange={handleChange}
            required
          />


          <InputField
            label="Ward Number:"
            name="wardnumber"
            value={formData.wardnumber}
            onChange={handleChange}
            required
          />
        </div>

        <InputField
          label="Phone:"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          required
        />

      </div>
    </>
  );
};

ManagerInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ManagerInfo;