import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import ManagerInfo from '../Create/ManagerInfo';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/ui/Button';
import ManagerInfo from '../create/ManagerInfo';
import { fetchManagerById } from '../../../redux/manager/managersSlice';
import { updateManagerApi } from '../../../services/manager';
import { fetchBranches } from '../../../redux/branchSlice';

const UpdateManagerPage = () => {

  const [managerData, setManagerData] = useState({
    name: '', provision: '', district: '',
    localLevel: '', wardnumber: '', mobileNo: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const manager = useSelector((state) => state.managers.selectedManager);
  const status = useSelector((state) => state.managers.status);
  const branches = useSelector((state) => state.branches.items);

  const [selectedBranchId, setSelectedBranchId] = useState('');

  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerData((prev) => ({ ...prev, [name]: value }));
  };
  // Get branch ID from URL
  //const manager = useSelector(selectSelectedManager);
  //const status = useSelector((state) => state.managers.status);


  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  //manager change in input fiel


  useEffect(() => {

    dispatch(fetchManagerById(id));
  }, [dispatch, id]);


  useEffect(() => {
    if (manager) {
      setManagerData({
        name: manager.user?.name || '',
        provision: manager.provision || '',
        localLevel: manager.localLevel || '',
        district: manager.district || '',
        wardnumber: manager.wardnumber || '',
        mobileNo: manager.user?.mobileNo || '',
      });
      setSelectedBranchId(manager.branch?.id)

    }

  }, [manager]);


  const handleNext = async (e) => {
    e.preventDefault();
    if (loading) return; // ⛔ Prevent double calls
    setLoading(true);
    // Validate and submit manager Form
    const requiredFields = Object.keys(managerData);
    const emptyFields = requiredFields.filter(field => !managerData[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in all required manager fields: ${emptyFields.join(', ')}`);
      return;
    }

    /*const requestBody = {
      ...managerData,
      branch: {
        id: parseInt(selectedBranchId)
      }
    };*/

    try {
      const response = await updateManagerApi(id, managerData);
      navigate(`/admin/managers/${id}`); // Adjust the URL as per your route setup
    } catch (err) {
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  return (


    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          manager update
        </h1>

        <div className="h-1 mx-4 bg-[#f04f18] border border-[#f04f18] rounded-[4px] mb-6"></div>


        <form onSubmit={handleNext}>
          {/* Step 1: manager Form */}
          <ManagerInfo formData={managerData} handleChange={handleManagerChange} />
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

export default UpdateManagerPage;
