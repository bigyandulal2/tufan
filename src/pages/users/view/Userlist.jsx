import { useEffect, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ListTable from '../../../components/ui/BranchTable';
import { fetchBranchById } from '../../../redux/branchSlice';
import { fetchUsers,addBranchNamesToUsers,setCurrentPage } from "../../../redux/loadAllUserSlice";
function UsersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // load all users slice
  const { users, loading, fetched, currentPage } = useSelector(
    (state) => state.users
  );
  //fetch only if not cached
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchUsers());
    }
  }, [dispatch, fetched]);
  // Pagination state
  const itemsPerPage = 8;

  useEffect(() => {
    if (!users.length) return;
    if (users.every(u => u.BranchName)) return;
  
    const fetchBranches = async () => {
      const branchMap = {};
      const uniqueBranchIds = [...new Set(users.map(u => u.branchId).filter(Boolean))];
  
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
          onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {currentPage > 2 && (
          <>
            <button
              onClick={() => dispatch(setCurrentPage(1))}
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
              onClick={() => dispatch(setCurrentPage(page))}
              className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {page}
            </button>
          ))}

        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <span className="px-2">...</span>}
            <button
              onClick={() => dispatch(setCurrentPage(totalPages))}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => dispatch(setCurrentPage((p) => Math.min(p + 1, totalPages)))}
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
