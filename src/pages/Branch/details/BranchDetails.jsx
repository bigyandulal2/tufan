import React from 'react';
import PropTypes from 'prop-types';
import { IoArrowBackCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
const BranchDetails = ({ branch }) => {
   const navigate=useNavigate();
  return (
    <div >
    <IoArrowBackCircle size={30} className='cursor-pointer hover:text-gray-800' onClick={()=>navigate(-1)}/>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Branch Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Branch Code</h4>
          <p className="text-lg font-semibold text-gray-900">{branch.branchCode}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Branch Name</h4>
          <p className="text-lg font-semibold text-gray-900">{branch.name}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Province</h4>
          <p className="text-lg font-semibold text-gray-900">{branch.province}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Locel Level</h4>
          <p className="text-lg font-semibold text-gray-900">{branch.localLevel}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Distirct</h4>
          <p className="text-lg font-semibold text-gray-900">{branch.district}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Ward Number</h4>
          <p className="text-lg font-semibold text-gray-900">{branch.wardNumber}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
          <p className="text-lg font-semibold text-gray-900">{branch.phoneNo}</p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-medium text-gray-500">Email</h4>
          <p className="text-lg font-semibold text-gray-900">{branch.email}</p>
        </div>
      </div>

    </div>
  );
};

BranchDetails.propTypes = {
  branch: PropTypes.shape({
    branchCode: PropTypes.string,
    name: PropTypes.string,
    province: PropTypes.string,
    phoneNo: PropTypes.string,
    managerName: PropTypes.string,
  }).isRequired,
};

export default BranchDetails;
