import * as XLSX from "xlsx";

const formatJavaDate = (arr) => {
  if (!Array.isArray(arr)) return "";
  const [y, m, d, h, min, s] = arr;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")} ${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const exportRidersToExcel = (riders) => {
  if (!Array.isArray(riders) || riders.length === 0) {
    alert("No data to export");
    return;
  }

  const formattedData = riders.map((rider) => ({
    /* Rider Info */
    Rider_ID: rider?.id ?? "",
    Status: rider?.status ?? "",
    Status_Message: rider?.statusMessage ?? "",
    Balance: rider?.balance ?? 0,

    /* Category */
    Category_ID: rider?.category?.categoryId ?? "",
    Category_Name: rider?.category?.categoryTitle ?? "",

    /* Dates */
    Added_Date: formatJavaDate(rider?.addedDate),
    Updated_Date: formatJavaDate(rider?.updatedDate),
    Date_of_Birth: rider?.date_Of_Birth ?? "",

    /* Documents */
    Citizenship_Front: rider?.citizen_Front ?? "",
    Citizenship_Back: rider?.citizen_Back ?? "",
    Citizenship_No: rider?.citizen_No ?? "",
    Driving_License_No: rider?.driver_License ?? "",
    Driving_License_Image: rider?.license_Image ?? "",
    NID_No: rider?.nid_No ?? "",
    NID_Image: rider?.nid_Img ?? "",
    Selfie_With_ID: rider?.selfieWithIdCard ?? "",

    /* User Info */
    User_ID: rider?.user?.id ?? "",
    Name: rider?.user?.name ?? "",
    Email: rider?.user?.email ?? "",
    Mobile: rider?.user?.mobileNo ?? "",
    Branch_ID: rider?.user?.branchId ?? "",
    Modes: rider?.user?.modes ?? "",
    Profile_Image: rider?.user?.imageName ?? "",

    // /* Device Info */
    // Device_Brand: rider?.user?.deviceInfo?.brand ?? "",
    // Device_Model: rider?.user?.deviceInfo?.model ?? "",
    // Android_Version: rider?.user?.deviceInfo?.androidVersion ?? "",

    // /* Location */
    // Latitude: rider?.user?.currentLocation?.latitude ?? "",
    // Longitude: rider?.user?.currentLocation?.longitude ?? "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Riders");

  XLSX.writeFile(workbook, "riders-export.xlsx");
};
