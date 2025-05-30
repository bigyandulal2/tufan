// Statement.jsx
import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

const Statement = ({ formData, handleChange }) => {
  return (
    <div className="mb-4">
      <InputField
        label="Branch Code:"
        name="branchCode"
        value={formData.branchCode}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        <InputField
          label="Date:"
          name="date"
          type="date"
          placeholder="Choose Date"
          value={formData.date}
          onChange={handleChange}
          required
          inputClassName="w-full cursor-pointer"
        />

        <InputField
          label="Duration:"
          name="duration"
          type="date"
          placeholder="Choose Duration"
          value={formData.duration}
          onChange={handleChange}
          required
          inputClassName="w-full cursor-pointer"
        />

        <div className="flex items-end">
          <Button
            type="submit"
            variant="secondary"
            className="ml-6 flex items-center justify-center w-[140px] h-[32px] shadow-md hover:scale-105 transition-transform duration-200"
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

Statement.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Statement;
