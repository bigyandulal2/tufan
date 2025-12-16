import React, { useEffect, useRef, useState } from 'react';
import ListTable from '../../../components/ui/BranchTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, resetStatus } from '../../../redux/branchSlice';
import { FiRefreshCw } from 'react-icons/fi'; // circular refresh icon

const AllBranches = () => {
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branches.items);
  const status = useSelector((state) => state.branches.status);

  const fetchedRef = useRef(false); // to avoid double fetch on mount
  const scrollContainerRef = useRef(null); // for scroll detection

  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
   console.log("branch",branch);
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

  // Refresh button handler
  const handleManualRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchBranches());
    setRefreshing(false);
    setShowRefreshButton(false);
  };

  // Scroll logic to show refresh button
  const handleScroll = () => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    // Detect if user scrolled to top (can tweak offset)
    if (scrollEl.scrollTop <= 5) {
      setShowRefreshButton(true);
    } else {
      setShowRefreshButton(false);
    }
  };

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollEl) scrollEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!branch || branch.length === 0) {
    return <p className="text-center mt-10 text-gray-500">Branch not found or still loading...</p>;
  }

  return (
    <div className="flex-1 relative">
      {/* Refresh Button */}
      {showRefreshButton && (
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="absolute right-6 top-4 z-10 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <FiRefreshCw className={`text-xl ${refreshing ? "animate-spin" : ""}`} />
        </button>
      )}

      <div
        className="border border-black rounded-[10px] p-6 min-h-[736px] overflow-y-auto"
        ref={scrollContainerRef}
      >
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Branch List
        </h1>

        <div className="w-full px-2 max-md:ml-0 max-md:w-full">
          <ListTable
            data={branch}
            headers={['Code', 'Name', 'Province', 'Phone']}
            rowDataKeys={['branchCode', 'name', 'province', 'phoneNo']}
            module="branches"
            searchableFields={['branchCode', 'name', 'province']}
          />
        </div>
      </div>
    </div>
  );
};

export default AllBranches;
