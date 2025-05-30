// ShowStatementPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, resetStatus } from '../../redux/branchSlice';
import Statement from './Statement';

const ShowStatementPage = () => {
  const dispatch = useDispatch();
  const fetchedRef = useRef(false);
  const branches = useSelector((state) => state.branches.items);
  const status = useSelector((state) => state.branches.status);

  useEffect(() => {
    if (!fetchedRef.current && status === 'idle') {
      fetchedRef.current = true;
      dispatch(fetchBranches());
    }

    if (status === 'created' || status === 'deleted') {
      dispatch(fetchBranches()).then(() => {
        dispatch(resetStatus());
      });
    }
  }, [status, dispatch]);

  const [formData, setFormData] = useState({
    branchCode: '',
    date: '',
    duration: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormData = (e) => {
    e.preventDefault();

    const requiredFields = ['branchCode', 'date', 'duration'];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    // ✅ Handle data submission here
    console.log('Generating statement with data:', formData);
    // e.g., send to backend
  };

  return (
    <div className="flex-1 p-4">
      <div className="border border-gray-300 rounded-lg p-6 min-h-[350px] bg-white">
        <h1 className="text-xl font-semibold text-center mb-4">Statement</h1>
        <div className="h-1 bg-red-500 rounded mb-4"></div>

        <form onSubmit={handleFormData}>
          <Statement formData={formData} handleChange={handleFormChange} />
        </form>
      </div>
    </div>
  );
};

export default ShowStatementPage;
