// src/components/common/Privateroute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUserDetail, isLoggedIn } from "../../auth";

const Privateroute = ({ blockedRoles = [] }) => {
  const loggedIn = isLoggedIn();
  const user = getCurrentUserDetail();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  const roles = user?.roles?.map(role => role.name) || [];

  // 🚫 Check if any of the user's roles are in the blocked list
  const isBlocked = roles.some(role => blockedRoles.includes(role));

  if (isBlocked) {
    return <Navigate to="/admin/branches" replace />;
  }

  return <Outlet />;
};

export default Privateroute;
