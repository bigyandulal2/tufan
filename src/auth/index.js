import { ROLE_ADMIN, ROLE_MANAGER } from "../constant/role";

// 🔐 Configuration
const STORAGE_KEY = "authData"; // avoid generic names like "data"
const useSessionStorage = true; // change to true if you prefer sessionStorage

// 🌐 Choose appropriate storage
const storage = useSessionStorage ? sessionStorage : localStorage;

// 🧠 Parse JWT token to decode payload
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// ✅ Check if user is logged in and token is valid
export const isLoggedIn = () => {
  const data = storage.getItem(STORAGE_KEY);
  if (!data) return false;

  try {
    const parsed = JSON.parse(data);
    const token = parsed?.token;

    if (!token) return false;

    const decoded = parseJwt(token);

    // Check token expiration
    if (!decoded || Date.now() >= decoded.exp * 1000) {
      doLogout(() => { }); // clear storage if token is expired
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};

// 🔐 Perform login and store auth data
export const doLogin = (data, onSuccess, onFail) => {
  const allowedRoles = [ROLE_ADMIN, ROLE_MANAGER]; // define allowed roles

  // ✅ Properly extract roles from user
  const roles = data?.user?.roles?.map(r => r.name);

  if (roles?.some(r => allowedRoles.includes(r))) {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
    onSuccess?.();
  } else {
    onFail?.("Unauthorized role. Access denied.");
  }
};


/*export const doLogin = (data, onSuccess, onFail) => {
  if (!data?.user || !data?.token) {
    onFail?.("Invalid login data.");
    return;
  }

  // ✅ Store the data without checking roles
  storage.setItem(STORAGE_KEY, JSON.stringify(data));
  onSuccess?.();
};*/

// 🔓 Logout user and clear storage
export const doLogout = (onLogout) => {
  storage.removeItem(STORAGE_KEY);
  onLogout?.();
};

// 👤 Get current logged-in user's details
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    return parsed?.user;
  }
  return undefined;
};

// 🎟️ Get JWT token if valid
export const getToken = () => {
  if (isLoggedIn()) {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    return parsed?.token;
  }
  return null;
};
