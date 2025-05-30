import React, { useEffect, useMemo } from 'react';
import ListTable from '../../../components/ui/BranchTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManagers } from '../../../redux/manager/managersSlice';

const AllManagers = () => {
  const dispatch = useDispatch();
  const managers = useSelector((state) => state.managers.items);
  const status = useSelector((state) => state.managers.status);


  useEffect(() => {
    if (managers.length === 0) {
      dispatch(fetchManagers());
    }
  }, [dispatch]);

  useEffect(() => {
    const onFocus = () => {
      dispatch(fetchManagers());
    };

    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [dispatch]);

  // 🔁 Transform the raw data for table display
  const transformedData = useMemo(() => {
    return managers.map((m) => ({
      id: m.managerId || '-',                  // user id
      username: m.user?.name || '-',          // manager's username
      branchName: m.branch?.name || '-',      // branch name
      userMobileNo: m.user?.mobileNo || '-',  // user's phone
      branchPhoneNo: m.branch?.phoneNo || '-' // branch phone
    }));
  }, [managers]);

  if (!managers || status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">Managers not found or still loading...</p>;
  }

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Manager List
        </h1>

        <div className="w-full px-2 max-md:ml-0 max-md:w-full">
          <ListTable
            data={transformedData}
            headers={['User ID', 'Username', 'Branch Name', 'User Mobile', 'Branch Phone']}
            rowDataKeys={['id', 'username', 'branchName', 'userMobileNo', 'branchPhoneNo']}
            module="managers"
            searchableFields={['username', 'branchName']}
          />
        </div>
      </div>
    </div>
  );
};

export default AllManagers;
