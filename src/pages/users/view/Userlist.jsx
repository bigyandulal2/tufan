import { useEffect, useState } from "react";
import { loadAllUsers } from "../../../services/userlist";
import ListTable from '../../../components/ui/BranchTable';

function UsersList() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch and log users when the component mounts
  useEffect(() => {
    const fetchAndLogUsers = async () => {
      try {
        const data = await loadAllUsers();
        setUsers(data);
        setLoading(false);
        console.log("Loaded users:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAndLogUsers();
  }, []);

  if (loading) return <div className="p-4">Loading users...</div>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="border border-gray-300 rounded-lg p-4">
       <ListTable
          data={users}
          headers={['ID', 'Name', 'Email', 'Mobile', , ]}
          rowDataKeys={['id', 'name', 'email', 'mobileNo', ,]}
          module="users"
          searchableFields={['name', 'email', 'mobileNo', ]}
        />

      </div>
    </div>

  );
}

export default UsersList;
