import * as XLSX from "xlsx";
import { loadAllVehicle } from "../services/vehicle";

/* Convert Java LocalDateTime array to readable string */
const formatJavaDate = (arr) => {
  if (!Array.isArray(arr)) return "";
  const [y, m, d, h, min, s] = arr;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")} ${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

/* Branch ID → Branch Name */
const BRANCH_MAP = {
  "1": "Bagmati",
  "4": "Koshi",
  "63": "Madhes",
  "64": "Gandaki",
  "65": "Karnali",
  "66": "Sudurpaschim",
  "67": "Durgaprasai",
};

const getBranchName = (branchId) => {
  if (branchId === undefined || branchId === null) {
    return "Not Assigned";
  }
  return BRANCH_MAP[String(branchId)] || "Unknown Branch";
};


export const exportRidersToExcel = async (riders) => {
  if (!Array.isArray(riders) || riders.length === 0) {
    alert("No riders to export");
    return;
  }

  const rows = [];

  for (const rider of riders) {
    const userId = rider?.user?.id;

    let vehicles = [];
    try {
      vehicles = userId ? await loadAllVehicle(userId) : [];
    } catch (err) {
      console.error(`Failed fetching vehicles for user ${userId}`, err);
    }

    /* Rider with NO vehicles */
    if (!vehicles || vehicles.length === 0) {
      rows.push({
        Rider_ID: rider?.id ?? "",
        Name: rider?.user?.name ?? "",
        Email: rider?.user?.email ?? "",
        Mobile: rider?.user?.mobileNo ?? "",
        Status: rider?.status ?? "",
        Category: rider?.category?.categoryTitle ?? "",
        Branch: getBranchName(rider?.user?.branchId),
        Balance: rider?.balance ?? 0,
        Added_Date: formatJavaDate(rider?.addedDate),

        Vehicle_Type: "No Vehicle",
        Vehicle_Brand: "",
        Vehicle_Number: "",
        Production_Year: "",
        Vehicle_Category: "",
        Vehicle_Image: "",
        BillBook_1: "",
        BillBook_2: "",
      });
      continue;
    }

    /* Rider WITH vehicles → one row per vehicle */
    vehicles.forEach((vehicle, index) => {
      rows.push({
        Rider_ID: rider?.id ?? "",
        Name: rider?.user?.name ?? "",
        Email: rider?.user?.email ?? "",
        Mobile: rider?.user?.mobileNo ?? "",
        Status: rider?.status ?? "",
        Category: rider?.category?.categoryTitle ?? "",
        // Branch: getBranchName(rider?.user?.branchId),
        Balance: rider?.balance ?? 0,
        Added_Date: formatJavaDate(rider?.addedDate),

     
        Vehicle_Type: vehicle?.vehicleType ?? "",
        Vehicle_Brand: vehicle?.vehicleBrand ?? "",
        Vehicle_Number: vehicle?.vehicleNumber ?? "",
        Production_Year: vehicle?.productionYear?.split("T")[0] ?? "",
        Vehicle_Category: vehicle?.category?.categoryTitle ?? "",
        Vehicle_Image: vehicle?.vechicleImg ?? "",
        BillBook_1: vehicle?.billBook1 ?? "",
        BillBook_2: vehicle?.billBook2 ?? "",
      });
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Riders & Vehicles");

  XLSX.writeFile(workbook, "riders-with-vehicles.xlsx");
};
