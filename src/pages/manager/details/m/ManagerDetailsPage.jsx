import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import { toast } from 'react-toastify';
import ManagerDetails from './ManagerDetails';

const ManagerDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const managers = useSelector((state) => state.managers.items);
  const selectedManager = useSelector((state) => state.managers.selectedManager);

  const manager =
    managers.find((b) => String(b.id) === String(id)) || selectedManager;
  const status = useSelector((state) => state.managers.status);

  useEffect(() => {

    if (!manager) {
      dispatch(fetchManagerById(id));
    }
  }, [dispatch, id, manager]);

  const handleUpdateClick = (id) => {
    navigate(`/admin/managers/update/${id}`);
  };

  const handleDeleteManager = async (branch) => {
    try {
      await deleteBranchApi(manager.id);
      toast.success("Manager deleted successfully");
      navigate(`/admin/managers`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete manager");
    }
  };

  // ✅ Show loading state
  if (status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">Loading manager data...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center mt-10 text-red-500">Failed to load manager. Please try again.</p>;
  }

  if (!manager) {
    return <p className="text-center mt-10 text-gray-500">Manager not found or still loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <ManagerDetails manager={manager} />
      <div className="flex justify-end gap-4 mt-8">
        <Button
          className="w-[120px] h-[39px] flex items-center justify-center bg-[#f04f18] hover:bg-orange-800"
          type="submit"
          onClick={() => handleUpdateClick(manager.id)}
          variant="secondary"
        >
          Update
        </Button>
        <Button
          className="w-[120px] h-[39px] flex items-center justify-center bg-red-600 hover:bg-red-800"
          type="submit"
          variant="secondary"
          onClick={() => handleDeleteManager(manager)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ManagerDetailsPage;
