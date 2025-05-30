import React, { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import ManagerInfo from '../../manager/create/ManagerInfo';
import { notifyError, notifyInfo } from '../../../utils/notify';
import { createManager } from '../../../services/manager';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBranches } from '../../../redux/branchSlice';

const ManagerCreationPage = () => {
  const [managerCreated, setManagerCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const branches = useSelector((state) => state.branches.items);
  const status = useSelector((state) => state.branches.status);

  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [managerData, setManagerData] = useState({
    provision: '',
    localLevel: '',
    district: '',
    wardnumber: '',
    mobileNo: ''
  });

  // Fetch all branches on load
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  //manager change in input field
  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerData((prev) => ({ ...prev, [name]: value }));
  };


  const handleFormData = async (e) => {
    e.preventDefault();
    if (loading || managerCreated) return; // 🔐 Prevent re-submit

    if (!selectedBranchId) {
      notifyInfo("Please select a branch.");
      return;
    }

    const requiredFields = Object.keys(managerData);
    const emptyFields = requiredFields.filter((field) => !managerData[field]);

    if (emptyFields.length > 0) {
      notifyInfo(`Please fill in all fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      setLoading(true);
      await createManager(selectedBranchId, managerData);
      setManagerCreated(true); // 🔒 lock further submits
      navigate("/admin/managers");
    } catch (error) {
      notifyError("Something went wrong, but the manager might be created. Redirecting...");

      navigate("/admin/managers");
      // small delay to show message
    } finally {
      setLoading(false);
    }
  };



  //branch status
  if (status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">Loading branch data...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center mt-10 text-red-500">Failed to load branch. Please try again.</p>;
  }


  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[350px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Manager Creation
        </h1>

        <div className="h-2 bg-[#f04f18] border border-[#f04f18] rounded-[4px] mb-[10px]"></div>
        <h2 className="text-[20px] font-medium text-black font-['Plus_Jakarta_Sans'] ">Select Branch Name:</h2>



        <div className={`mb-4 flex items-center gap-4 `}>


          <label htmlFor="branch" className={`ml-[31px] block text-[17px] font-light leading-[22px] text-black font-['Lexend'] mb-1 `}>
            Select Branch
          </label>
          <select
            id="branch"
            className={`ml-[31px] w-[180px] h-[36  px] text-[14px] border border-[#0000003f] rounded-[5px] p-2 focus:outline-none focus:ring-1 focus:ring-[#f04f18] appearance-none bg-white `}
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
          >
            <option value="">-- Select Branch --</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleFormData}>
          {/*  Manager Form */}

          <ManagerInfo
            formData={managerData}
            handleChange={handleManagerChange} />

          <hr className="border-t border-[#110d0c7f] my-4" />
          <div className="flex justify-end">
            <Button
              className="w-[120px] h-[39px] flex items-center bg-[#f04f18] justify-center"
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

export default ManagerCreationPage;
