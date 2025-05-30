import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBranchById } from '../../../redux/branchSlice';
import BranchDetails from './BranchDetails';
import Button from '../../../components/ui/Button';
import { deleteBranchApi } from '../../../services/branch';
import { toast } from 'react-toastify';

const BranchDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const branches = useSelector((state) => state.branches.items);
  const selectedBranch = useSelector((state) => state.branches.selectedBranch);

  const branch =
    branches.find((b) => String(b.id) === String(id)) || selectedBranch;
  const status = useSelector((state) => state.branches.status);


  useEffect(() => {

    if (!branch) {
      dispatch(fetchBranchById(id));
    }
  }, [dispatch, id, branch]);

  const handleUpdateClick = (id) => {
    navigate(`/admin/branches/update/${id}`);
  };

  const handleDeleteBranch = async (branch) => {
    if (loading) return;
    setLoading(true);

    try {
      await deleteBranchApi(branch.id)
      navigate(`/admin/branches`);
    } catch (err) {
      toast.error(err);
    }
  };

  // ✅ Show loading state
  if (status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">Loading branch data...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center mt-10 text-red-500">Failed to load branch. Please try again.</p>;
  }

  if (!branch) {
    return <p className="text-center mt-10 text-gray-500">Branch not found or still loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-2xl rounded-2xl border- border-gray-200">
      <BranchDetails branch={branch} />
      <div className="flex justify-end gap-4 mt-8">
        <Button
          className="w-[120px] h-[39px] flex items-center justify-center bg-[#f04f18] hover:bg-orange-800"
          type="submit"
          onClick={() => handleUpdateClick(branch.id)}
          variant="secondary"
        >
          Update
        </Button>
        <Button
          className="w-[120px] h-[39px] flex items-center justify-center bg-red-600 hover:bg-red-800"
          type="submit"
          variant="secondary"
          onClick={() => handleDeleteBranch(branch)}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default BranchDetailsPage;
