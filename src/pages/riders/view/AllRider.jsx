import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../../components/ui/BranchTable";
import { fetchBranches } from "../../../redux/branchSlice";
import { isManager } from "../../../auth";
import {
  selectRiderImages,
  selectRidersItems,
  selectRidersStatus,
  selectRidersPages,
} from "../../../redux/rider/riderSelectors";
import {
  fetchPaginatedRiders,
  fetchPaginatedRidersWithFilters,
  fetchRiderImage,
  setCurrentPage,
  setFilterBranch,
  setFilterStatus,
  setFilterCategory,
} from "../../../redux/rider/ridersSlice";
import RenderImage from "./RiderImage";
import { exportRidersToExcel } from "../../../utils/exportRidersToExcel";

const STATUS_OPTIONS = [
  { label: "All Riders", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Rejected", value: "Rejected" },
  { label: "Approved", value: "" },
];
const BRANCH_OPTIONS = [
  { label: "All Branches", value: "All" },
  { label: "Bagmati", value: "1" },
  { label: "Koshi", value: "4" },
  { label: "Madhes", value: "63" },
  { label: "Gandaki", value: "64" },
  { label: "Karnali", value: "65" },
  { label: "Sudurpaschim", value: "66" },
  { label: "Durgaprasai", value: "67" },
];
const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "All" },
  { label: "Bike", value: "1" },
  { label: "Car", value: "2" },
];

const AllRiders = () => {
  const dispatch = useDispatch();

  const fetchedImagesRef = useRef(new Set());

  // Redux state
  const riders = useSelector(selectRidersItems) ?? [];
  const riderImages = useSelector(selectRiderImages) ?? {};
  const ridersStatus = useSelector(selectRidersStatus);
  const branches = useSelector((state) => state.branches.items) ?? [];
  const currentPage = useSelector((state) => state.riders.currentPage) ?? 1;
  const riderPages = useSelector(selectRidersPages) ?? 1;
  const pageNumbers = Array.from({ length: riderPages }, (_, i) => i + 1);
  const filterBranch = useSelector((state) => state.riders.filterBranch);
  const filterCategory = useSelector((state) => state.riders.filterCategory);
  const filterStatus = useSelector((state) => state.riders.filterStatus);
  console.log(riders,"riders hereeee");
  // branch name
  const branch = useSelector((state) => state.branches.selectedBranch);
  // console.log(branch, "branch name hereee");

  // Fetch branches once
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // Fetch riders for current page & filter
  useEffect(() => {
    const filters = {
      pageNumber: currentPage - 1,
    };

    if (filterStatus !== "All") {
      filters.status = filterStatus;
    }

    if (filterBranch !== "All") {
      filters.branchId = filterBranch;
    }

    if (filterCategory !== "All") {
      filters.categoryId = filterCategory;
    }

    if (
      filterStatus === "All" &&
      filterBranch === "All" &&
      filterCategory === "All"
    ) {
      dispatch(fetchPaginatedRiders(currentPage - 1));
    } else {
      dispatch(fetchPaginatedRidersWithFilters(filters));
    }
  }, [dispatch, currentPage, filterStatus, filterBranch, filterCategory]);

  // Fetch rider images
  useEffect(() => {
    if (ridersStatus !== "succeeded" || !Array.isArray(riders)) return;

    riders.forEach((r) => {
      const img = r?.user?.imageName;
      if (img && !riderImages[img] && !fetchedImagesRef.current.has(img)) {
        fetchedImagesRef.current.add(img);
        dispatch(fetchRiderImage(img));
      }
    });
  }, [riders, ridersStatus, riderImages, dispatch]);

  // Format table data
  const formattedData = useMemo(() => {
    if (!Array.isArray(riders)) return [];

    return riders.map((rider) => {
      const imgName = rider?.user?.imageName;
      const imageUrl = riderImages[imgName];
      const branch = branches.find(
        (b) => String(b.id) === String(rider?.user?.branchId)
      );

      return {
        id: rider?.id ?? "—",
        name: rider?.user?.name ?? "No Name",
        image: <RenderImage imageUrl={imageUrl} />,
        category: rider?.category?.categoryTitle ?? "N/A",
        BranchName: branch?.name ?? "N/A",
        balance: rider?.balance ?? 0,
        status: rider?.status ?? "inactive",
      };
    });
  }, [riders, riderImages, branches]);

  // Rider counts for current page
  const totalRidersInView = riders.length;
  const carRiderCount = riders.filter(
    (r) => r?.category?.categoryTitle?.toLowerCase() === "car"
  ).length;
  const bikeRiderCount = riders.filter(
    (r) => r?.category?.categoryTitle?.toLowerCase() === "bike"
  ).length;

  return (
    <div className="flex-1 w-[60vw] overflow-auto">
      <div className="border border-black rounded-[10px] p-6 h-[736px] overflow-auto">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Riders List
        </h1>

        {/* Status Dropdown */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-6 items-center mb-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="rider-status-filter" className="font-semibold">
                Status:
              </label>
              <select
                id="rider-status-filter"
                value={filterStatus}
                onChange={(e) => dispatch(setFilterStatus(e.target.value))}
                className="p-2 border border-gray-300 rounded"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch Filter */}
            {!isManager() && (
              <div className="flex items-center gap-2">
                <label htmlFor="rider-branch-filter" className="font-semibold">
                  Branch:
                </label>
                <select
                  id="rider-branch-filter"
                  value={filterBranch}
                  onChange={(e) => dispatch(setFilterBranch(e.target.value))}
                  className="p-2 border border-gray-300 rounded"
                >
                  {BRANCH_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="rider-category-filter" className="font-semibold">
                Category:
              </label>
              <select
                id="rider-category-filter"
                value={filterCategory}
                onChange={(e) => dispatch(setFilterCategory(e.target.value))}
                className="p-2 border border-gray-300 rounded"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <ListTable
          data={formattedData}
          headers={[
            "ID",
            "Name",
            "Image",
            "Category",
            "Branch Name",
            "Balance",
            "Status",
          ]}
          rowDataKeys={[
            "id",
            "name",
            "image",
            "category",
            "BranchName",
            "balance",
            "status",
          ]}
          module="riders"
          searchableFields={["name", "category", "status", "BranchName"]}
        />
{/* excel converting button starts */}
<div className="flex justify-end my-4">
  <button
    onClick={() => exportRidersToExcel(riders)}
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
  >
    Export to Excel
  </button>
</div>
{/* excel converting button ends */}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {/* Prev */}
          <button
            onClick={() =>
              dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))
            }
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {/* First page + left dots */}
          {currentPage > 2 && (
            <>
              <button
                onClick={() => dispatch(setCurrentPage(1))}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                1
              </button>
              {currentPage > 3 && <span className="px-2">...</span>}
            </>
          )}

          {/* Middle pages */}
          {Array.from({ length: riderPages }, (_, i) => i + 1)
            .filter((page) => Math.abs(currentPage - page) <= 1)
            .map((page) => (
              <button
                key={page}
                onClick={() => dispatch(setCurrentPage(page))}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

          {/* Right dots + last page */}
          {currentPage < riderPages - 1 && (
            <>
              {currentPage < riderPages - 2 && (
                <span className="px-2">...</span>
              )}
              <button
                onClick={() => dispatch(setCurrentPage(riderPages))}
                className={`px-3 py-1 rounded ${
                  currentPage === riderPages
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {riderPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            onClick={() =>
              dispatch(setCurrentPage(Math.min(currentPage + 1, riderPages)))
            }
            disabled={currentPage === riderPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllRiders;
