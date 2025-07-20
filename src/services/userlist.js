import { handleRequest } from "./apiClient";
import { privateAxios } from "./helper";

// ✅ Load all users 
export  const loadAllUsers = async () => {
  return handleRequest(
    () => privateAxios.get("/users/"),
    {
      onSuccessMessage: "Users loaded successfully.",
      onErrorMessage: "Failed to load users.",
    }
  );
};


// change role to rider
export const changeRoleToRider = async (userId) => {
  return handleRequest(
    () => privateAxios.post(`user/${userId}/category/1/riders`),
    {
      onSuccessMessage: "User role changed to rider successfully.",
      onErrorMessage: "Failed to change user role.",
    }
  );
}