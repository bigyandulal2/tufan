import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchRiderById } from '../../../redux/rider/ridersSlice';
import RiderDetails from './RiderDetails';
import Button from '../../../components/ui/Button';
import {
  approveRiderApi,
  deleteRiderApi,
  rejectRiderApi,
} from '../../../services/rider';

const RiderDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: riders, selectedRider, status } = useSelector((state) => state.riders);

  const rider = useMemo(() => {
    return riders.find((r) => String(r.id) === String(id)) || selectedRider;
  }, [riders, selectedRider, id]);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    if (!rider) {
      dispatch(fetchRiderById(id));
    }
  }, [dispatch, id]);




  const refreshDetails = () => dispatch(fetchRiderById(id));

  const handleApprove = async () => {
    if (loading) return; // ⛔ Prevent double calls
    setLoading(true);
    try {
      await approveRiderApi(id);
      toast.success('Rider approved successfully');
      refreshDetails();
      navigate('/admin/riders');
    } catch (error) {
      toast.error('Failed to approve rider');
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  const handleReject = async () => {

    if (!rejectReason.trim()) {
      return toast.warning("Please enter a rejection reason.");
    }
    if (rejecting) return; // ⛔ Prevent double calls
    setLoading(true);
    try {
      await rejectRiderApi(id, rejectReason);
      toast.success('Rider rejected successfully');
      refreshDetails();
      setShowRejectModal(false);
      setRejectReason('');
      navigate('/admin/riders');
    } catch (error) {
      toast.error('Failed to reject rider');
    }
    finally {
      setRejecting(false); // ✅ Reset loading state
    }
  };

  const handleDelete = async () => {
    if (loading) return; // ⛔ Prevent double calls
    setLoading(true);
    try {
      await deleteRiderApi(id);
      toast.success('Rider deleted successfully');
      navigate('/admin/riders');
    } catch (error) {
      toast.error('Failed to delete rider');
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  if (status === 'loading') return <p className="text-center mt-10 text-gray-500">Loading rider details...</p>;
  if (status === 'failed') return <p className="text-center mt-10 text-red-500">Failed to load rider.</p>;
  if (!rider) return <p className="text-center mt-10 text-gray-500">Rider not found.</p>;

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mt-6 mb-2">User Information</h1>
        <div className="h-1 mx-4 bg-[#f04f18] border border-[#f04f18] rounded-[4px]"></div>

        <div className="w-full px-2 max-md:ml-0 max-md:w-full">
          <div className="max-w-5xl mx-auto mt-8 p-8 bg-white shadow-xl rounded-2xl border border-[#f04f18]">
            <RiderDetails rider={rider} />

            <div className="flex justify-end gap-4 mt-8 flex-wrap">
              {rider.status === 'PENDING' && (
                <>
                  <Button
                    className="w-[120px] h-[39px] flex justify-center items-center bg-green-600 hover:bg-green-800"
                    onClick={handleApprove}
                  >
                    {loading ? "Approving..." : "Approve"}

                  </Button>
                  <Button
                    className="w-[120px] h-[39px] flex justify-center items-center bg-yellow-500 hover:bg-yellow-700"
                    onClick={() => setShowRejectModal(true)}
                  >
                    {rejecting ? " Rejecting..." : " Reject"}
                  </Button>
                </>
              )}

              {(rider.status === 'APPROVED' || rider.status === 'REJECTED') && (
                <Button
                  className="w-[120px] h-[39px] flex justify-center items-center bg-red-600 hover:bg-red-800"
                  onClick={() => setShowDeleteModal(true)}
                >
                  {loading ? "  Deleteing..." : "Delete"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">Reject Rider</h2>
            <p className="text-gray-700 mb-3">Please provide a reason for rejection:</p>
            <textarea
              className="w-full h-28 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              placeholder="Enter reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="mt-5 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                onClick={handleReject}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">Delete Rider</h2>
            <p className="text-gray-700 mb-4 text-center">
              Are you sure you want to delete this rider? This action cannot be undone.
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

export default RiderDetailsPage;
