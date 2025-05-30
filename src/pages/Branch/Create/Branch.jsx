import React from 'react';
import BranchInfoSection from './BranchInfoSection';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';

const Branch = ({ formData, handleChange }) => {
  return (
    <>
      <BranchInfoSection formData={formData} handleChange={handleChange} />
      <AddressSection formData={formData} handleChange={handleChange} />
      <ContactSection formData={formData} handleChange={handleChange} />
      {/* <hr className="border-t border-[#110d0c7f] my-4" />
                  <ManagerInfo formData={formData} handleChange={handleChange} />
  <AddressSection formData={formData} handleChange={handleChange} />*/}
      <hr className="border-t border-[#110d0c7f] my-4" />
    </>
  );
};

export default Branch;