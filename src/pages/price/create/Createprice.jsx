import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/ui/InputField';
import Dropdown from '../../../components/ui/Dropdown';

const PriceInfo = ({ formData, handleChange }) => {



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
        <h2 className="text-[20px] font-medium text-black font-['Plus_Jakarta_Sans'] ">Price Info:</h2>
        <hr className="border-t border-[##110D0C] mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-8">

          <Dropdown
            label="Provision:"
            name="province"
            options={options}
            value={formData.province}
            onChange={handleChange}
            placeholder="Choose provision"
            required
          />



          <InputField
            label="BaseFare:"
            name="baseFare"
            value={formData.baseFare}
            onChange={handleChange}
            required
          />

          <InputField
            label="perKmRate:"
            name="perKmRate"
            value={formData.perKmRate}
            onChange={handleChange}
            required
          />

        </div>


      </div>
    </>
  );
};

PriceInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PriceInfo;