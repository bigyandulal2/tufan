import { handleRequest } from "./apiClient";
import { myAxios } from "./helper";

// ------------------ SIGN UP ------------------
export const signUp = async (user) => {
  return handleRequest(() => myAxios.post("/auth/register", user), {
    onSuccessMessage: "Account created successfully!",
    onErrorMessage: "Failed to register. Please try again.",
  });
};

// ------------------ LOGIN ------------------
export const loginUser = async (loginDetail) => {
  return handleRequest(() => myAxios.post("/auth/login", loginDetail), {
    onSuccessMessage: "Logged in successfully!",
    onErrorMessage: "Invalid credentials. Please try again.",
  });
};

// ------------------ GET USER ------------------
export const getUser = async (userId) => {
  return handleRequest(() => myAxios.get(`/users/${userId}`), {
    onErrorMessage: "Failed to fetch user details.",
  });
};
