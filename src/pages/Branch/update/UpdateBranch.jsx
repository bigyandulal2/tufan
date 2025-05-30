import React, { useEffect, useState } from 'react';
import { getBranchById, updateBranchApi } from '../../../services/branch';
import { useNavigate, useParams } from 'react-router-dom';
//import ManagerInfo from '../Create/ManagerInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchById, fetchBranches } from '../../../redux/branchSlice';
import Branch from '../Create/Branch';
import Button from '../../../components/ui/Button';

const UpdateBranchPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [branchData, setBranchData] = useState({
    branchCode: '', name: '', province: '', district: '',
    localLevel: '', wardNumber: '', phoneNo: '', email: ''
  });

  const handleBranchChange = (e) => {
    const { name, value } = e.target;
    setBranchData((prev) => ({ ...prev, [name]: value }));
  };
  // Get branch ID from URL
  const branch = useSelector((state) => state.branches.selectedBranch);
  const status = useSelector((state) => state.branches.status);

  useEffect(() => {

    dispatch(fetchBranchById(id));

  }, [dispatch, id]);

  useEffect(() => {
    if (branch) {
      setBranchData({
        branchCode: branch.branchCode || '',
        name: branch.name || '',
        province: branch.province || '',
        district: branch.district || '',
        localLevel: branch.localLevel || '',
        wardNumber: branch.wardNumber || '',
        phoneNo: branch.phoneNo || '',
        email: branch.email || '',
      });
    }
  }, [branch]);



  const handleNext = async (e) => {
    e.preventDefault();
    if (loading) return; // ⛔ Prevent double calls
    setLoading(true);
    // Validate and submit Branch Form
    const requiredFields = Object.keys(branchData);
    const emptyFields = requiredFields.filter(field => !branchData[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in all required branch fields: ${emptyFields.join(', ')}`);
      return;
    }
    try {
      const response = await updateBranchApi(id, branchData);
      await new Promise(resolve => setTimeout(resolve, 200));
      navigate(`/admin/branches/${id}`); // Adjust the URL as per your route setup
    } catch (err) {
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  return (


    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Branch Creation
        </h1>

        <div className="h-2 bg-white border border-[#f04f18] rounded-[4px] mb-[10px]"></div>

        <form onSubmit={handleNext}>
          {/* Step 1: Branch Form */}
          <Branch formData={branchData} handleChange={handleBranchChange} />
          {/* Step 2: Manager Form */}
          <hr className="border-t border-[#110d0c7f] my-4" />
          <div className="flex justify-end">
            <Button
              className="w-[120px] h-[39px] flex items-center justify-center"
              type="submit"
              variant="secondary"
            >
              {loading ? "Updating..." : "Update"}

            </Button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default UpdateBranchPage;
