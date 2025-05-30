import React from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#dcdcdc]">
      <Header />

      <div className="flex-grow container sm:px-6 lg:px-[40px] mx-auto px-4 py-4">
        <div className="w-full bg-white border border-[#dcdcdc] rounded-[10px] p-6 mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-0.5/4">
              <Sidebar />
            </div>
            <div className="flex-1">
              <div className="border border-black rounded-[10px] p-6 ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default AdminLayout;
