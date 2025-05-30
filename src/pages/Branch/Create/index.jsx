import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Branch from './Branch';
import { createBranch } from '../../../services/branch';
import { notifyError, notifyInfo } from '../../../utils/notify';
import { useNavigate } from 'react-router-dom';

const BranchCreationPage = () => {
  const [managerCreated, setManagerCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [branchData, setBranchData] = useState({
    branchCode: '', name: '', province: '', district: '',
    localLevel: '', wardNumber: '', phoneNo: '', email: ''
  });

  const handleBranchChange = (e) => {
    const { name, value } = e.target;
    setBranchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (loading || managerCreated) return;
    // Validate and submit Branch Form
    const requiredFields = Object.keys(branchData);
    const emptyFields = requiredFields.filter(field => !branchData[field]);
    if (emptyFields.length > 0) {
      notifyInfo(`Please fill in all required branch fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      setLoading(true);
      await createBranch(branchData);
      setManagerCreated(true); // 🔒 lock further submits
      navigate("/admin/branches");
    } catch (error) {
      notifyError(error);

      // small delay to show message
    } finally {
      setLoading(false);
    }
  }





  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 ">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Branch Creation
        </h1>
        <div className="h-2 bg-white border border-[#f04f18] rounded-[4px] mb-[10px]"></div>
        <form onSubmit={handleNext}>
          {/* Step 1: Branch Form */}
          <Branch formData={branchData} handleChange={handleBranchChange} />
          <div className="flex justify-end">
            <Button
              className="w-[120px] h-[39px] flex items-center justify-center"
              type="submit"
              variant="secondary">
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchCreationPage;
