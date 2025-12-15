import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userContext from '../../context/userContext';
import { fetchBranchById } from '../../redux/branchSlice';

const Header = () => {
  const { user } = useContext(userContext);
  const dispatch = useDispatch();

  const branch = useSelector((state) => state.branches.selectedBranch);
  const status = useSelector((state) => state.branches.status);
  const error = useSelector((state) => state.branches.error);

  useEffect(() => {
    if (!user.loading && user.login && user.data.branchId) {
      dispatch(fetchBranchById(user.data.branchId));
    }
  }, [user, dispatch]);

  if (user.loading) return <div>Loading user...</div>;
  if (!user.loading && !user.login) return <div>Please log in</div>;
  if (status === 'loading') return <div>Loading branch...</div>;
  if (status === 'failed') return <div>Error loading branch: {error}</div>;

  return (
    <header className="w-full bg-white border-b border-[#dcdcdc]">
      <div className="container mx-auto py-4 text-center">
        <h1 className="text-[26px] font-bold text-[#f04f18] font-['Plus_Jakarta_Sans']">
          Tufan Transport Pvt. Ltd.
        </h1>
        <p className="text-[24px] font-medium text-black font-['Plus_Jakarta_Sans']">
          Head Office Portal
        </p>

        <p className="text-[18px] font-medium">
          Welcome, <strong className="text-green-500">{user.data.name}</strong>
        </p>

        <p className="text-[18px] font-medium text-gray-700">
          Branch: {branch?.name || 'Branch info not available'}
        </p>
      </div>
    </header>
  );
};

export default Header;
