import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { toast } from 'react-toastify';
import { deletePriceApi, getPriceById } from '../../../services/price';
import PriceDetails from './PriceDetails';
import { notifyError } from '../../../utils/notify';

const PriceDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [priceDataById, setPriceDataById] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      setStatus('loading');
      try {
        const data = await getPriceById(id);
        setPriceDataById(data || null);
        setStatus('succeeded');
      } catch (err) {
        setStatus('failed');
        setError('Failed to fetch price details.');
        notifyError('Failed to fetch price details');
      }
    };

    fetchInitialData();
  }, [id]);

  const handleUpdateClick = () => {
    navigate(`/admin/prices/update/${id}`);
  };

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await deletePriceApi(id); // 👈 just call it directly
      setShowDeleteModal(false);
      navigate('/admin/prices'); // ✅ will now navigate properly
    } catch (err) {
      toast.error('Failed to delete price');
    } finally {
      setLoading(false);
    }
  };

  // UI States
  if (status === 'loading')
    return <p className="text-center mt-10 text-gray-500">Loading price details...</p>;
  if (status === 'failed')
    return <p className="text-center text-red-600">{error}</p>;
  if (!priceDataById)
    return <p className="text-center text-gray-600">Price record not found.</p>;

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mt-6 mb-2">Price Information</h1>
        <div className="h-1 mx-4 bg-[#f04f18] border border-[#f04f18] rounded-[4px]" />

        <div className="w-full px-2">
          <div className="max-w-5xl mx-auto mt-8 p-8 bg-white shadow-xl rounded-2xl border border-[#f04f18]">
            <PriceDetails price={priceDataById} />

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
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">Delete Price</h2>
            <p className="text-gray-700 mb-4 text-center">
              Are you sure you want to delete this price data? This action cannot be undone.
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

export default PriceDetailsPage;
