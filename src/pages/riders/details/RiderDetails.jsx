import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRiderImage } from '../../../redux/rider/ridersSlice';
import { selectRiderImages } from '../../../redux/rider/riderSelectors';
import userFallbackImage from '../../../assets/user.jpg';
import documentPlaceholder from '../../../assets/document-placeholder.png';

const RiderDetails = ({ rider }) => {
  const dispatch = useDispatch();
  const riderImages = useSelector(selectRiderImages);
  const fetchedImagesRef = useRef(new Set());
  const [modalImage, setModalImage] = useState(null);

  const imageFields = [
    'selfieWithIdCard',
    'license_Image',
    'citizen_Front',
    'citizen_Back',
    'nid_Img',
    'imageName', // Profile image
  ];

  useEffect(() => {
    imageFields.forEach((field) => {
      const imageName = rider.user?.[field] || rider?.[field];
      if (imageName && !riderImages[imageName] && !fetchedImagesRef.current.has(imageName)) {
        fetchedImagesRef.current.add(imageName);
        dispatch(fetchRiderImage(imageName));
      }
    });
  }, [rider, riderImages, dispatch]);

  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 5) return 'N/A';
    const [year, month, day, hour, minute] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  const getImageUrl = (imageName) => imageName ? riderImages[imageName] || null : null;

  const profileImageName = rider?.user?.imageName;
  const profileImageUrl = getImageUrl(profileImageName);

  return (
    <div className="px-4 md:px-10 pb-10">
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        {rider?.user?.imageName && !profileImageUrl ? (
          <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-100 border shadow text-gray-500 text-sm italic">
            Loading...
          </div>
        ) : (
          <img
            src={profileImageUrl || userFallbackImage}
            alt="Rider Profile"
            className="w-40 h-40 rounded-full object-cover border shadow cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setModalImage(profileImageUrl || userFallbackImage)}
          />
        )}
      </div>

      <Section title="👤 User Information">
        <InfoItem label="Name" value={rider.user?.name || 'N/A'} />
        <InfoItem label="Email" value={rider.user?.email || 'N/A'} />
        <InfoItem label="Mobile No" value={rider.user?.mobileNo || 'N/A'} />
        <InfoItem label="Branch" value={rider.user?.branch_Name || 'N/A'} />
      </Section>

      <Section title="🛵 Rider Information">
        <InfoItem label="Date of Birth" value={rider.date_Of_Birth || 'N/A'} />
        <InfoItem label="License Number" value={rider.driver_License || 'N/A'} />
        <InfoItem label="Citizenship Number" value={rider.citizen_No || 'N/A'} />
        <InfoItem label="NID Number" value={rider.nid_No || 'N/A'} />
      </Section>

      <Section title="🚗 Vehicle Category">
        <InfoItem label="Category" value={rider.category?.categoryTitle || 'N/A'} />
      </Section>

      <Section title="📊 Status & Meta Info">
        <InfoItem label="Status" value={rider.status || 'N/A'} className="text-green-600" />
        <InfoItem label="Balance" value={`Rs. ${rider.balance ?? 0}`} />
        <InfoItem label="Added Date" value={formatDate(rider.addedDate)} />
        <InfoItem label="Updated Date" value={formatDate(rider.updatedDate)} />
      </Section>

      <Section title="📁 Documents">
        {['selfieWithIdCard', 'license_Image', 'citizen_Front', 'citizen_Back', 'nid_Img'].map((field) => {
          const labelMap = {
            selfieWithIdCard: 'Selfie with ID Card',
            license_Image: 'License Image',
            citizen_Front: 'Citizenship Front',
            citizen_Back: 'Citizenship Back',
            nid_Img: 'NID Image',
          };

          const imageName = rider[field];
          const imageUrl = getImageUrl(imageName);
          const isLoading = imageName && !imageUrl;

          return (
            <ImageItem
              key={field}
              label={labelMap[field]}
              src={imageUrl}
              loading={isLoading}
              fallback={documentPlaceholder}
              onClick={() => imageUrl && setModalImage(imageUrl)}
            />
          );
        })}
      </Section>

      {/* Modal for Image Preview */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Full Preview"
            className="max-h-[90%] max-w-[90%] rounded shadow-xl transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

// Reusable Section Wrapper
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold text-gray-700 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

// Reusable Info Item
const InfoItem = ({ label, value, className }) => (
  <div>
    <h4 className="text-sm text-gray-500">{label}</h4>
    <p className={`text-lg font-medium text-gray-900 ${className || ''}`}>{value}</p>
  </div>
);

// Image Item with loading + fallback + click preview
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

RiderDetails.propTypes = {
  rider: PropTypes.object.isRequired,
};

export default RiderDetails;
