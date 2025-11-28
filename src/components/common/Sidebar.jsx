import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doLogout, getCurrentUserDetail } from '../../auth';
import plusIcon from '../../assets/plus.jpg';
import { ROLE_MANAGER } from '../../constant/role';
import { PlaneIcon, PlusIcon } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  // ✅ Get user role
  const user = getCurrentUserDetail();
  const roles = user?.roles?.map(role => role.name) || [];

  const isManager = roles.includes(ROLE_MANAGER);

  const menuItems = [
    { name: 'Branches', icon: plusIcon, path: '/admin/branches' },
    { name: 'Manager', icon: plusIcon, path: '/admin/managers', hiddenFor: ['manager'] },
    { name: 'Riders', icon: plusIcon, path: '/admin/riders' },
    { name: 'Price', icon: plusIcon, path: '/admin/prices', hiddenFor: ['manager'] },
    { name: 'Revenue', icon: plusIcon, path: '/admin/revenue' },
    { name: 'Users', icon: plusIcon, path: '/admin/users' },
    { name: 'Blogs', icon: plusIcon, path: '/admin/blogs' },
    { name: 'Theme', icon: plusIcon, path: '/admin/theme' },
    { name: 'Language', icon: plusIcon, path: '/admin/language' },
    { name: 'Map', icon: plusIcon, path: '/admin/maps' },
    { name: 'Announcement', icon: plusIcon, path: '/admin/announcement' },
  ];

  // ✅ Filter out hidden menu based on user roles
  const filteredMenuItems = menuItems.filter(item => {
    if (item.hiddenFor && item.hiddenFor.includes('manager') && isManager) {
      return false;
    }
    return true;
  });

  const handleLogout = () => {
    doLogout(() => {
      navigate("/login");
    });
  };

  return (
    <aside className="border border-black rounded-[10px] w-[200px] p-4 flex flex-col justify-between h-full">
      <div className="mb-4 space-y-4">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center justify-between w-[141px] h-[36px] px-4 py-2 border border-[#0000004c] rounded-[10px] text-[17px] font-medium text-[#110d0c] font-['Plus_Jakarta_Sans'] hover:scale-105 transition-transform duration-200"
          >
            {item.name}
            <img
              src={item.icon}
              alt="Add"
              className="w-[25px] h-[25px] hover:scale-105 transition-transform duration-200"
            />
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-auto w-[140px] bg-[#f04f18] text-white font-bold text-[17px] py-2 px-2 rounded-[8px] shadow-md border border-[#dcdcdc] font-['Plus_Jakarta_Sans']"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
