import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchById } from '../../redux/branchSlice';
import { getCurrentUserDetail, isLoggedIn } from '../../auth';

const Header = () => {
  const [user, setUser] = useState({ data: null, login: false });
  const dispatch = useDispatch();

  const branch = useSelector((state) => state.branches.selectedBranch);
  const status = useSelector((state) => state.branches.status);
  const error = useSelector((state) => state.branches.error);

  // ✅ Load user when Header mounts
  useEffect(() => {
    const currentUser = getCurrentUserDetail();
    const login = isLoggedIn();
    setUser({ data: currentUser, login });
  }, []);

  // ✅ Fetch branch when user info is ready
  useEffect(() => {
    if (user.login && user.data?.branchId) {
      dispatch(fetchBranchById(user.data.branchId));
    }
  }, [user, dispatch]);

  if (!user.data) return null;
  if (!user.login) return <div className='hidden'>Please log in</div>;
  if (status === 'loading') return <div>Loading branch...</div>;
  if (status === 'failed') return <div>Error loading branch: {error}</div>;

  return (
    <header className="w-full bg-white border-b border-[#dcdcdc]">
      <div className="container mx-auto py-4 text-center">
        <h1 className="text-[26px] font-bold text-[#f04f18] font-['Plus_Jakarta_Sans']">
          Tufan Transport Pvt. Ltd.
        </h1>
        <p className="text-[24px] font-medium text-black font-['Plus_Jakarta_Sans']">
          {branch?.name} Office Portal
        </p>

        <p className="text-[18px] font-medium flex items-center justify-end gap-2">
  Welcome,
  <strong className="relative  text-[#f04f18] flex items-center gap-2">
    {user.data.name}
  </strong>
</p>

      </div>
    </header>
  );
};

export default Header;
