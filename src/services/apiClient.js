import { notifySuccess, notifyError, notifyInfo } from "../utils/notify";

/**
 * Handles API requests with unified error/success/info handling.
 *
 * @param {Function} apiCall - The API function to be executed.
 * @param {Object} options - Optional settings.
 * @param {string} options.onSuccessMessage - Toast message for success.
 * @param {string} options.onErrorMessage - Default error message.
 * @param {string} options.onInfoMessage - Toast message before starting.
 * @param {boolean} options.silent - If true, suppresses toast notifications.
 * @param {Object} options.fallbackOn500 - Optional fallback config for 500 errors.
 */
export const handleRequest = async (
  apiCall,
  {
    onInfoMessage = null,
    onSuccessMessage = null,
    onErrorMessage = "Something went wrong.",
    silent = false,
    fallbackOn500 = null,
  } = {}
) => {
  try {
    if (!silent && onInfoMessage) {
      notifyInfo(onInfoMessage);
    }

    const response = await apiCall();

    if (!silent && onSuccessMessage) {
      notifySuccess(onSuccessMessage);
    }

    return response.data;
  } catch (error) {
    // Network error: no response from server
    if (!error.response) {
      if (!silent) {
        notifyError("🚫 Unable to connect to server. Please check your internet or try again later.");
      }
      console.error("Network error:", error);
      throw error;
    }

    const status = error.response.status;
    const serverMessage = error.response.data?.message;
    let errorMessage = serverMessage || onErrorMessage;

    console.error(`Request failed with status ${status}:`, error.response);

    // Handle 500 fallback before generic error display
    if (status === 500 && fallbackOn500) {
      const fallbackMsg = fallbackOn500.notifyMessage || "⚠️ Server error. Handled with fallback.";
      if (!silent) {
        notifySuccess(fallbackMsg);
      }
      throw new Error(fallbackMsg); // prevent showing generic error as well
    }

    // Set custom messages by status code
    if (!silent) {
      switch (status) {
        case 400:
          errorMessage = serverMessage || "❗ Validation failed. Please check your input.";
          break;
        case 401:
          errorMessage = "🔒 Session expired. Please log in again.";
          break;
        case 403:
          errorMessage = "⛔ You don’t have permission to perform this action.";
          break;
        case 404:
          errorMessage = serverMessage || "🔍 Resource not found.";
          break;
        case 500:
          errorMessage = serverMessage || "💥 Internal server error. Please try again later.";
          break;
        default:
          // retain existing errorMessage
          break;
      }

      notifyError(errorMessage);
    }

    throw error;
  }
};
