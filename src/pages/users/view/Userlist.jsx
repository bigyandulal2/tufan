import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ListTable from '../../../components/ui/BranchTable';
import { fetchBranchById } from '../../../redux/branchSlice';
import { loadAllUsers } from "../../../services/userlist";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await loadAllUsers();
        setUsers(data);
        console.log("Fetched users:", data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // After users load, fetch branch info for each unique branchId
  useEffect(() => {
    if (users.length === 0) return;

    const uniqueBranchIds = [...new Set(users.map(u => u.branchId).filter(Boolean))];
    if (uniqueBranchIds.length === 0) return;

    const fetchBranches = async () => {
      try {
        const branchMap = {};

        await Promise.all(
          uniqueBranchIds.map(async (id) => {
            const resultAction = await dispatch(fetchBranchById(id));
            branchMap[id] = resultAction.payload?.name || "Unknown";
          })
        );
        const usersWithBranchNames = users.map(user => ({
          ...user,
          BranchName: branchMap[user.branchId] || "Unknown",
        }));

        setUsers(usersWithBranchNames);
      } catch (error) {
        console.error("Error fetching branch names:", error);
      }
    };

    fetchBranches();
  }, [users, dispatch]);

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangeToRider = (userId) => {
    navigate(`view/${userId}`);
  };

  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="p-4">
      
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      <ListTable
        onClick={handleChangeToRider}
        data={currentUsers}
        headers={['ID', 'Name', 'Email', 'Branch Name', 'mobile No', ]}
        rowDataKeys={['id', 'name', 'email', 'BranchName', 'mobileNo', ]}
        module="Users"
        searchableFields={['id', 'name', 'email', 'mobileNo']}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {currentPage > 2 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              1
            </button>
            {currentPage > 3 && <span className="px-2">...</span>}
          </>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => Math.abs(currentPage - page) <= 1)
          .map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {page}
            </button>
          ))}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <span className="px-2">...</span>}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersList;
