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
