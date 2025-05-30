import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-[#dcdcdc]">
      <div className="container mx-auto py-4 text-center">
        <h1 className="text-[26px] font-bold text-[#f04f18] font-['Plus_Jakarta_Sans']">
          Tufan Transport Pvt. Ltd.
        </h1>
        <p className="text-[24px] font-medium text-black font-['Plus_Jakarta_Sans']">
          Damak-9, Jhapa
        </p>
        <p className="text-[24px] font-medium text-black font-['Plus_Jakarta_Sans']">
          Head Office Portal
        </p>
      </div>
    </header>
  );
};

export default Header;