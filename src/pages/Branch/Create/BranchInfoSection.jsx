import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/ui/InputField';

const BranchInfoSection = ({ formData, handleChange }) => {
  return (
    //
    <div className="mb-[10px]">
      <h2 className="text-[20px] font-medium text-black font-['Plus_Jakarta_Sans'] ">Branch Info:</h2>
      <hr className="border-t border-[##110D0C] mb-2" />
      <InputField
        label="Branch Code:"
        name="branchCode"
        value={formData.branchCode}
        onChange={handleChange}
        required
      />
      <InputField
        label="Branch Name:"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>
  );
};

BranchInfoSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BranchInfoSection;