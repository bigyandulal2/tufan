import React from 'react';
import PropTypes from 'prop-types';

const ManagerDetails = ({ manager }) => {
  return (
    <div >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manager Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Manager Code</h4>
          <p className="text-lg font-semibold text-gray-900">{manager.branchCode}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Manager Name</h4>
          <p className="text-lg font-semibold text-gray-900">{manager.name}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Province</h4>
          <p className="text-lg font-semibold text-gray-900">{manager.province}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
          <p className="text-lg font-semibold text-gray-900">{manager.phoneNo}</p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-medium text-gray-500">Manager Name</h4>
          <p className="text-lg font-semibold text-gray-900">{manager.managerName}</p>
        </div>
      </div>

    </div>
  );
};

ManagerDetails.propTypes = {
  manager: PropTypes.shape({
    branchCode: PropTypes.string,
    name: PropTypes.string,
    province: PropTypes.string,
    phoneNo: PropTypes.string,
    managerName: PropTypes.string,
  }).isRequired,
};

export default ManagerDetails;
