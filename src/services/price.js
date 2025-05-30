import { notifyError, notifyInfo } from "../utils/notify";
import { handleRequest } from "./apiClient";
import { privateAxios } from "./helper";

export const loadAllPrice = async () => {
  try {
    const response = await privateAxios.get("/pricings/");
    notifyInfo("Price Dta loaded.");
    return response.data;
  } catch (error) {
    notifyError("Unable to load Price Data.");
    throw error;
  }
};


export const createPrice = async (userId, categoryId, priceData) => {
  return handleRequest(() => privateAxios.post(`/pricings/user/${userId}/category/${categoryId}`, priceData), {
    onSuccessMessage: "price created successfully!",
    onErrorMessage: "Failed to create price tag.",
  });
};

export const getPriceById = async (priceId) => {
  return handleRequest(() => privateAxios.get(`/pricings/${priceId}`), {
    onErrorMessage: "Price not found.",
  });
};


export const updatePriceApi = async (priceId, priceData) => {
  return handleRequest(() => privateAxios.put(`/pricings/update/${priceId}`, priceData), {
    onSuccessMessage: "Price Data updated successfully!",
    onErrorMessage: "Failed to update Price Data.",
  });
};


export const deletePriceApi = async (priceId) => {
  return handleRequest(() => privateAxios.delete(`/pricings/delete/${priceId}`), {
    onSuccessMessage: "Price Data deleted successfully!",
    onErrorMessage: "Failed to delete price Data.",
  });
};



export const loadAllCategory = async () => {
  try {
    const response = await privateAxios.get("/categories/");
    notifyInfo("Category loaded.");
    return response.data;
  } catch (error) {
    notifyError("Unable to load Category.");
    throw error;
  }
};




// ------------------ READ ------------------
/*export const loadAllPrice = async () => {
  return handleRequest(() => privateAxios.get("/pricings/"), {
    onSuccessMessage: "Branches loaded.",
    onErrorMessage: "Unable to load branches.",
  });
};*/