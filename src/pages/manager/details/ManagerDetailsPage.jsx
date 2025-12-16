import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchManagerById, deleteManager } from '../../../redux/manager/managersSlice';
import ManagerDetails from './ManagerDetails';
import Button from '../../../components/ui/Button';
import { toast } from 'react-toastify';
import { IoArrowBackCircle } from 'react-icons/io5';
const ManagerDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { items: managers, selectedManager, status, error } = useSelector((state) => state.managers);

  const manager = useMemo(() => {
    return managers.find((m) => String(m.managerId) === String(id)) || selectedManager;
  }, [managers, selectedManager, id]);

  useEffect(() => {
    if (!manager) {
      dispatch(fetchManagerById(id));
    }
  }, [id, dispatch, manager]);

  console.log(manager)

  const handleUpdateClick = () => {
    navigate(`/admin/managers/update/${id}`);
  };

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await dispatch(deleteManager(id)).unwrap();
      toast.success("Manager deleted successfully");
      navigate('/admin/managers');
    } catch (err) {
      toast.error("Failed to delete manager");
    } finally {
      setLoading(false);
    }
  };

  // UI States
  if (status === 'loading') return <p className="text-center mt-10 text-gray-500">Loading manager...</p>;
  if (status === 'failed') return <p className="text-center text-red-600">Failed to load manager: {error}</p>;
  if (!manager) return <p className="text-center text-gray-600">Manager not found.</p>;

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
      <IoArrowBackCircle size={30} className='cursor-pointer hover:text-gray-800' onClick={()=>navigate(-1)}/>
        <h1 className="text-[20px] font-bold text-black text-center mt-6 mb-2">Manager Information</h1>
        <div className="h-1 mx-4 bg-[#f04f18] border border-[#f04f18] rounded-[4px]"></div>

        <div className="w-full px-2 max-md:ml-0 max-md:w-full">
          <div className="max-w-5xl mx-auto mt-8 p-8 bg-white shadow-xl rounded-2xl border border-[#f04f18]">
            <ManagerDetails manager={manager} />

            <div className="flex justify-end gap-4 mt-8 flex-wrap">
              <Button
                className="w-[120px] h-[39px] flex items-center justify-center bg-[#f04f18] hover:bg-orange-800"
                onClick={handleUpdateClick}
              >
                Update
              </Button>
              <Button
                className="w-[120px] h-[39px] flex items-center justify-center bg-red-600 hover:bg-red-800"
                onClick={() => setShowDeleteModal(true)}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">Delete Manager</h2>
            <p className="text-gray-700 mb-4 text-center">
              Are you sure you want to delete this manager? This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                onClick={() => {
                  handleDelete();
                  setShowDeleteModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDetailsPage;
