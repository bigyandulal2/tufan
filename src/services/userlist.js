import { handleRequest } from "./apiClient";
import { privateAxios } from "./helper";


// ✅ Load all riders
export const loadAllUsers = async () => {
  return handleRequest(() => privateAxios.get("/users/"), {
    onSuccessMessage: "Users loaded.",
    onErrorMessage: "Unable to load Riders.",
  });
};