import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListTable from "../../../components/ui/BranchTable";
import { fetchBranchById } from "../../../redux/branchSlice";
import {
  fetchPaginatedUsers,
  addBranchNamesToUsers,
  setCurrentPage,
  setFilterBranch,
  setKeyword,
} from "../../../redux/loadAllUserSlice";
import { isManager } from "../../../auth";
const BRANCH_OPTIONS = [
  { label: "All Branches", value: "" },
  { label: "Bagmati", value: "1" },
  { label: "Koshi", value: "4" },
  { label: "Madhesh", value: "63" },
  { label: "Gandaki", value: "64" },
  { label: "Karnali", value: "65" },
  { label: "Sudurpaschim", value: "66" },
  { label: "Lumbini", value: "67" },
];

function UsersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, loading, currentPage, totalPages, pageSize, branch, keyword } =
    useSelector((state) => state.users);

  const [searchText, setSearchText] = useState(keyword || "");

  // Fetch users whenever page, branch, or keyword changes
  useEffect(() => {
    dispatch(
      fetchPaginatedUsers({
        pageNumber: currentPage - 1,
        pageSize,
        branchId: branch,
        keyword,
      })
    );
  }, [dispatch, currentPage, pageSize, branch, keyword]);

  // Fetch branch names for users
  useEffect(() => {
    if (!users.length) return;
    if (users.every((u) => u.BranchName)) return;

    const fetchBranches = async () => {
      const branchMap = {};
      const uniqueBranchIds = [
        ...new Set(users.map((u) => u.branchId).filter(Boolean)),
      ];

      await Promise.all(
        uniqueBranchIds.map(async (id) => {
          const res = await dispatch(fetchBranchById(id));
          branchMap[id] = res.payload?.name || "Unknown";
        })
      );

      dispatch(addBranchNamesToUsers(branchMap));
    };

    fetchBranches();
  }, [dispatch, users]);

  const handleChangeToRider = (userId) => {
    navigate(`view/${userId}`);
  };

  const handleBranchChange = (e) => {
    dispatch(setFilterBranch(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleSearch = () => {
    dispatch(setKeyword(searchText));
    dispatch(setCurrentPage(1));
  };

  if (loading) return <div className="p-4">Loading users...</div>;

  const userPages = totalPages;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        {/* Branch filter */}
      {!isManager() &&  <select
          value={branch}
          onChange={handleBranchChange}
          className="border px-3 py-1 rounded"
        >
          {BRANCH_OPTIONS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>   }  

        {/* Keyword search below */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchText}
            placeholder="Search by Mobile"
            onChange={(e) => setSearchText(e.target.value)}
            className="border px-3 py-1 rounded"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-[#f04f18] text-white px-4 py-1 rounded-full hover:bg-[#d34313] transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* User Table */}
      <ListTable
        onClick={handleChangeToRider}
        data={users}
        headers={["ID", "Name", "Email", "Branch Name", "Mobile No"]}
        rowDataKeys={["id", "name", "email", "BranchName", "mobileNo"]}
        module="Users"
        searchableFields={["id", "name", "email", "mobileNo"]}
        isRider={false}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {/* Prev */}
        <button
          onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Left pages */}
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
        {Array.from({ length: userPages }, (_, i) => i + 1)
          .filter((page) => Math.abs(currentPage - page) <= 1)
          .map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={`px-3 py-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}

        {/* Right pages */}
        {currentPage < userPages - 1 && (
          <>
            {currentPage < userPages - 2 && <span className="px-2">...</span>}
            <button
              onClick={() => dispatch(setCurrentPage(userPages))}
              className={`px-3 py-1 rounded ${
                currentPage === userPages ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {userPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          onClick={() =>
            dispatch(setCurrentPage(Math.min(currentPage + 1, userPages)))
          }
          disabled={currentPage === userPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersList;
