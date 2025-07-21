import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loadAllUsers } from "../../../services/userlist";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //for navigation
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await loadAllUsers();
        setUsers(data);
        setLoading(false);
        console.log("Loaded users:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

const handleChangeToRider = async (userId) => {
  navigate(`view/${userId}`);
};


  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="border border-gray-300 rounded-lg p-4 text-md">
        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-md text-left font-medium ">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr >
                <th className="px- py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Mobile</th>
                <th className="px-4 py-2 border">Chanage</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-2 border">{user.id}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.mobileNo}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={(e) => {
                        
                          handleChangeToRider(user.id);
                        }}
                        className="bg-orange-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-orange-600 transition duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        Change to Rider
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(p - 1, 1))
            }
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
              {currentPage > 3 && (
                <span className="px-2">...</span>
              )}
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
              {currentPage < totalPages - 2 && (
                <span className="px-2">...</span>
              )}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
