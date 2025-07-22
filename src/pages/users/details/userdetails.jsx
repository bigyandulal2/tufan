import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { fetchBranchById } from '../../../redux/branchSlice';
import { loadUserById, getRiderVehicleData } from '../../../services/userlist';

import userFallbackImage from '../../../assets/user.jpg';

const RiderDetailsStandalone = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [branchData, setBranchData] = useState(null);
  const [riderData, setRiderData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);

  
  const Navigate = useNavigate();

  const branches = useSelector((state) => state.branches.items);
  const selectedBranch = useSelector((state) => state.branches.selectedBranch);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const userRes = await loadUserById(id);
        setUser(userRes);

        const { rider, vehicle } = await getRiderVehicleData(id);
        setRiderData(rider);
        setVehicleData(vehicle);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!user?.branchId || branchData) return;

    const existingBranch =
      branches.find((b) => String(b.id) === String(user.branchId)) || selectedBranch;

    if (existingBranch) {
      setBranchData(existingBranch);
    } else {
      dispatch(fetchBranchById(user.branchId)).then((res) => {
        if (res?.payload) setBranchData(res.payload);
      });
    }
  }, [user?.branchId, branchData, branches, selectedBranch, dispatch]);

  if (!user) {
    return <div className="p-4 text-center">Loading user data...</div>;
  }

  return (
    <div className="px-4 md:px-10 pb-10">
      <div className="flex justify-center mb-6">
        <img
          src={userFallbackImage}
          alt="Rider Profile"
          className="w-40 h-40 rounded-full object-cover border shadow cursor-pointer hover:scale-105 transition-transform"
        />
      </div>

      <hr className="border-t border-[#f04f18] mb-2" />

      <Section title="👤 User Information">
        <InfoItem label="Name" value={user?.name || 'Not Provided'} />
        <InfoItem label="Email" value={user?.email || 'Not Provided'} />
        <InfoItem label="Mobile No" value={user?.mobileNo || 'Not Provided'} />
        <InfoItem label="Branch Name" value={branchData?.name || 'Not Provided'} />
      </Section>

      <hr className="border-t border-[#f04f18] mb-2" />

      <Section title="🛵 Rider Information">
        <InfoItem label="Date of Birth" value={riderData?.date_Of_Birth || 'N/A'} />
        <InfoItem label="License Number" value={riderData?.driver_License || 'N/A'} />
        <InfoItem label="Citizenship Number" value={riderData?.citizen_No || 'N/A'} />
        <InfoItem label="NID Number" value={riderData?.nid_No || 'N/A'} />
      </Section>

      <hr className="border-t border-[#f04f18] mb-2" />

      <Section title="🚗 Vehicle Information">
        {vehicleData ? (
          <>
            <InfoItem label="Vehicle Type" value={vehicleData.vehicleType || 'Not Provided'} />
            <InfoItem label="Brand Name" value={vehicleData.vehicleBrand || 'Not Provided'} />
            <InfoItem label="Vehicle Number" value={vehicleData.vehicleNumber || 'Not Provided'} />
            <InfoItem
              label="Production Year"
              value={vehicleData.productionYear?.split('T')[0] || 'Not Provided'}
            />
            <InfoItem
              label="Category"
              value={vehicleData.category?.categoryTitle || 'Not Provided'}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 italic mt-6">No vehicle data found.</div>
        )}
      </Section>
     {!vehicleData && (
  <div className="text-center mt-6">
    <button 
    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
    onClick={ () => Navigate(`/admin/users/addVehicle/${id}`)}
    >
      Add Vehicle
    </button>
  </div>
)}

{!riderData && (
  <div className="text-center mt-6">
    <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
    onClick={() => Navigate(`/admin/users/addRider/${id}`)}

    >
      Add Rider Info
    </button>
  </div>
)}

    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold text-gray-700 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const InfoItem = ({ label, value, className }) => (
  <div>
    <h4 className="text-sm text-gray-500">{label}</h4>
    <p className={`text-lg font-medium text-gray-900 ${className || ''}`}>{value}</p>
  </div>
);

// PropTypes
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

export default RiderDetailsStandalone;
