import React, { useState } from "react";
import PropTypes from "prop-types";
import userIcon from "../../../assets/user.jpg";
import { MapPin } from "lucide-react";
import RenderImage from "../../riders/view/RiderImage";

// Reusable info display
const InfoItem = ({ label, value }) => (
  <div className="ml-4">
    <h4 className="text-sm font-medium text-gray-600">{label}</h4>
    <p className="text-base font-semibold text-gray-900">{value ?? "N/A"}</p>
  </div>
);

// Section layout
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3 ml-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 ml-8 gap-4">{children}</div>
  </div>
);

// Image component with zoom, using RenderImage inside
const ImageBox = ({ imageName, fallback, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="mb-6 text-center">
        <h4 className="text-sm font-medium text-gray-500 mb-1">Manager Image</h4>
        <div
          className="w-24 h-24 rounded-full border mx-auto cursor-pointer overflow-hidden"
          onClick={() => setIsZoomed(true)}
        >
          <RenderImage
            imageName={imageName}
            fallback={fallback}
            className="w-24 h-24 rounded-full object-cover"
            alt={alt}
          />
        </div>
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="max-w-full max-h-full rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <RenderImage
              imageName={imageName}
              fallback={fallback}
              className="max-w-full max-h-full rounded-xl object-contain"
              alt={alt}
            />
          </div>
        </div>
      )}
    </>
  );
};

// Main manager details component
const ManagerDetails = ({ manager }) => {
  if (!manager || !manager.user || !manager.branch) {
    return (
      <div className="bg-white p-6 rounded-xl border text-center text-gray-700">
        Loading manager details...
      </div>
    );
  }

  const { user, branch } = manager;
  const device = user.deviceInfo || {};
  const role = user?.roles?.[0]?.name;

  return (
    <div className="bg-white shadow rounded-xl p-6 border border-gray-300">
      {/* 👤 Image with zoom */}
      <ImageBox imageName={user?.imageName} fallback={userIcon} alt={user?.name || "Manager"} />

      {/* 👤 User Info */}
      <Section title="👤 User Info">
        <InfoItem label="Manager ID" value={manager.managerId} />
        <InfoItem label="Name" value={user?.name} />
        <InfoItem label="Email" value={user?.email} />
        <InfoItem label="Mobile No" value={user?.mobileNo} />
        <InfoItem label="Modes" value={user?.modes} />
        <InfoItem label="Role" value={role} />
      </Section>

      {/* 📱 Device Info */}
      <Section title="📱 Device Info">
        <InfoItem label="Brand" value={device.brand} />
        <InfoItem label="Model" value={device.model} />
        <InfoItem label="Android Version" value={device.androidVersion} />
        <InfoItem label="SDK Version" value={device.sdkInt} />
        <InfoItem label="Device Name" value={device.device} />
        <InfoItem label="Device ID" value={device.deviceId} />
      </Section>

      {/* 🏡 Address Info */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <MapPin size={18} className="text-gray-700" />
            <span className="font-bold">Address Info</span>
          </span>
        }
      >
        <InfoItem label="Province" value={manager.provision} />
        <InfoItem label="District" value={manager.district} />
        <InfoItem label="Local Level" value={manager.localLevel} />
        <InfoItem label="Ward No." value={manager.wardnumber} />
      </Section>

      {/* 🏢 Branch Info */}
      <Section title="🏢 Branch Info">
        <InfoItem label="Branch Name" value={branch.name} />
        <InfoItem label="Branch Code" value={branch.branchCode} />
        <InfoItem label="Branch Email" value={branch.email} />
        <InfoItem label="Branch Phone" value={branch.phoneNo} />
        <InfoItem label="Province" value={branch.province} />
        <InfoItem label="District" value={branch.district} />
        <InfoItem label="Local Level" value={branch.localLevel} />
        <InfoItem label="Ward No." value={branch.wardNumber} />
      </Section>
    </div>
  );
};

ManagerDetails.propTypes = {
  manager: PropTypes.object,
};

export default ManagerDetails;
