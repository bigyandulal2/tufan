import React from "react";
import PropTypes from "prop-types";

// 🔹 Reusable Info Item
const InfoItem = ({ label, value }) => (
  <div className="ml-4">
    <h4 className="text-sm font-medium text-gray-600">{label}</h4>
    <p className="text-base font-semibold text-gray-900">{value ?? "N/A"}</p>
  </div>
);

// 🔹 Section Wrapper
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3 ml-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 ml-8 gap-4">{children}</div>
  </div>
);

// 🔹 Category ID to Name Mapper
const getCategoryName = (id) => {
  switch (id) {
    case 1:
      return "Bike";
    case 2:
      return "Car";
    default:
      return "Unknown";
  }
};

// 🔹 Main PriceDetails Component
const PriceDetails = ({ price }) => {
  const categoryId = price?.category?.categoryId;
  const categoryName = getCategoryName(categoryId);

  return (
    <div className="bg-white shadow rounded-xl p-6 border border-gray-300">
      <Section title="💰 Price Info">
        <InfoItem label="Province" value={price?.province} />
        <InfoItem label="Base Fare" value={price?.baseFare} />
        <InfoItem label="Per KM Rate" value={price?.perKmRate} />
      </Section>

      <Section title="📦 Category Info">
        <InfoItem label="Category ID" value={categoryId ?? "N/A"} />
        <InfoItem label="Category Name" value={categoryName} />
      </Section>
    </div>
  );
};

PriceDetails.propTypes = {
  price: PropTypes.object.isRequired,
};

export default PriceDetails;
