import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRiderImage } from '../../../redux/rider/ridersSlice';
import { selectRiderImages } from '../../../redux/rider/riderSelectors';
import { fetchBranchById } from '../../../redux/branchSlice';
import { fetchVehicleImage, fetchVehicles } from '../../../redux/vehicleSlice';
import { selectVehicleImages } from '../../../redux/vehicleSelectors';
import userFallbackImage from '../../../assets/user.jpg';
import documentPlaceholder from '../../../assets/document-placeholder.png';

const RiderDetails = ({ rider }) => {
  const dispatch = useDispatch();
  const riderImages = useSelector(selectRiderImages);
  const vehicleImages = useSelector(selectVehicleImages);
  const fetchedRiderImagesRef = useRef(new Set());
  const fetchedVehicleImagesRef = useRef(new Set());

  const [modalImage, setModalImage] = useState(null);
  const [branchData, setBranchData] = useState(null);
  const [vehicleModalImage, setVehicleModalImage] = useState(null);

  const branches = useSelector((state) => state.branches.items);
  const selectedBranch = useSelector((state) => state.branches.selectedBranch);
  const vehicles = useSelector((state) => state.vehicles.items);

  const branchId = rider.user?.branchId;
  const userId = rider.user?.id;

  const riderImageFields = [
    'selfieWithIdCard',
    'license_Image',
    'citizen_Front',
    'citizen_Back',
    'nid_Img',
    'imageName',
  ];

  useEffect(() => {
    if (userId) {
      dispatch(fetchVehicles(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (branchId && !branchData) {
      const existingBranch =
        branches.find((b) => String(b.id) === String(branchId)) || selectedBranch;
      if (existingBranch) {
        setBranchData(existingBranch);
      } else {
        dispatch(fetchBranchById(branchId)).then((res) => {
          if (res?.payload) {
            setBranchData(res.payload);
          }
        });
      }
    }
  }, [branchId, branchData, branches, selectedBranch, dispatch]);

  useEffect(() => {
    riderImageFields.forEach((field) => {
      const imageName = rider.user?.[field] || rider?.[field];
      if (imageName && !riderImages[imageName] && !fetchedRiderImagesRef.current.has(imageName)) {
        fetchedRiderImagesRef.current.add(imageName);
        dispatch(fetchRiderImage(imageName));
      }
    });
  }, [rider, riderImages, dispatch]);

  useEffect(() => {
    vehicles.forEach((vehicle) => {
      ['billBook1', 'billBook2', 'vechicleImg'].forEach((field) => {
        const imageName = vehicle?.[field];
        if (imageName && !vehicleImages[imageName] && !fetchedVehicleImagesRef.current.has(imageName)) {
          fetchedVehicleImagesRef.current.add(imageName);
          dispatch(fetchVehicleImage(imageName));
        }
      });
    });
  }, [vehicles, vehicleImages, dispatch]);

  const getImageUrl = (imageName, source) => imageName ? source[imageName] || null : null;
  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray)) return 'Not Provided';
    const [year, month, day, hour, minute] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  const profileImageUrl = getImageUrl(rider?.user?.imageName, riderImages);

  return (
    <div className="px-4 md:px-10 pb-10">
      <div className="flex justify-center mb-6">
        <img
          src={profileImageUrl || userFallbackImage}
          alt="Rider Profile"
          className="w-40 h-40 rounded-full object-cover border shadow cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setModalImage(profileImageUrl || userFallbackImage)}
        />
      </div>
      <hr className="border-t border-[#f04f18] mb-2" />


      <Section title="👤 User Information">
        <InfoItem label="Name" value={rider.user?.name || 'Not Provided'} />
        <InfoItem label="Email" value={rider.user?.email || 'Not Provided'} />
        <InfoItem label="Mobile No" value={rider.user?.mobileNo || 'Not Provided'} />
        <InfoItem label="Branch Name" value={branchData?.name || 'Not Provided'} />
      </Section>
      <hr className="border-t border-[#f04f18] mb-2" />


      <Section title="🚗 Vehicle Information">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <React.Fragment key={index}>
              <InfoItem label={`Vehicle ${index + 1} - Type`} value={vehicle.vehicleType || 'Not Provided'} />
              <InfoItem label="Brand Name" value={vehicle.vehicleBrand || 'Not Provided'} />
              <InfoItem label="Vehicle Number" value={vehicle.vehicleNumber || 'Not Provided'} />
              <InfoItem label="Production Year" value={vehicle.productionYear?.split('T')[0] || 'Not Provided'} />
              <InfoItem label="Category" value={vehicle.category?.categoryTitle || 'Not Provided'} />
              {['vechicleImg', 'billBook1', 'billBook2',].map((field) => {
                const imgName = vehicle[field];
                const imgUrl = getImageUrl(imgName, vehicleImages);
                return (
                  <ImageItem
                    key={field}
                    label={field}
                    src={imgUrl}
                    loading={imgName && !imgUrl}
                    fallback={documentPlaceholder}
                    onClick={() => imgUrl && setVehicleModalImage(imgUrl)}
                  />
                );
              })}
            </React.Fragment>
          ))
        ) : (
          <div className="text-center text-gray-500 italic mt-6">No vehicles found.</div>
        )}
      </Section>
      <hr className="border-t border-[#f04f18] mb-2" />


      <Section title="📁 Documents">
        {riderImageFields.filter((field) => field !== 'imageName').map((field) => {
          const imageName = rider[field];
          const imageUrl = getImageUrl(imageName, riderImages);
          return (
            <ImageItem
              key={field}
              label={field}
              src={imageUrl}
              loading={imageName && !imageUrl}
              fallback={documentPlaceholder}
              onClick={() => imageUrl && setModalImage(imageUrl)}
            />
          );
        })}
      </Section>
      <hr className="border-t border-[#f04f18] mb-2" />


      {/* Modals */}
      {modalImage && (
        <ModalImage src={modalImage} onClose={() => setModalImage(null)} />
      )}
      {vehicleModalImage && (
        <ModalImage src={vehicleModalImage} onClose={() => setVehicleModalImage(null)} />
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

const ImageItem = ({ label, src, loading, fallback, onClick }) => (
  <div>
    <h4 className="text-sm text-gray-500 mb-1">{label}</h4>
    {loading ? (
      <div className="w-full h-32 flex items-center justify-center bg-gray-100 border rounded-lg text-gray-500 italic">
        Loading...
      </div>
    ) : (
      <img
        src={src || fallback}
        alt={label}
        className="rounded-lg shadow-md max-h-32 object-cover border cursor-pointer hover:scale-105 transition-transform"
        onClick={onClick}
      />
    )}
  </div>
);

const ModalImage = ({ src, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
    onClick={onClose}
  >
    <img
      src={src}
      alt="Preview"
      className="max-h-[90%] max-w-[90%] rounded shadow-xl"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
);

RiderDetails.propTypes = {
  rider: PropTypes.object.isRequired,
};

export default RiderDetails;