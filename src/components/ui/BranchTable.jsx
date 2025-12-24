import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, User } from 'lucide-react';
import { isManager } from '../../auth';

const ListTable = ({
  data,
  headers,
  rowDataKeys,
  module,
  onRowClick,
  onCreate,
  searchableFields,
  buttons = [],
  activeTab,
  setActiveTab,
  isRider=true
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleRowClick = (row) => {
    if (onRowClick) {
      onRowClick(row);
    } else {
      navigate(`/admin/${module}/${row.id}`);
    }
  };
console.log("data from the branch table hereeee",data);
  const handleOnCreate = () => {
    if (onCreate) {
      onCreate();
    } else {
      navigate(`/admin/${module}/create`);
    }
  };

  const filteredData = Array.isArray(data)
    ? data.filter((row) =>
      (searchableFields || Object.keys(row)).some((key) =>
        String(row[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    : [];

   

  const renderCell = (key, value) => {
    if (key === 'image') {
      return value || (
        <div className="min-h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full">
          <User className="text-gray-500" size={20} />
        </div>
      );
    }
    return value;
  };

  return (
    <>
      <div className="h-2 border border-[#f04f18] rounded-[4px] mb-5 bg-[#f04f18]"></div>

      {/* 🔹 Top Controls */}
      <div className="flex flex-wrap justify-end items-center gap-4 mb-4">

       <div className="flex items-center gap-2">
       {isRider &&    <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="pl-5 w-[140px] py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#f04f18]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>   }
       

          <div className="flex gap-2 ">
            {Array.isArray(buttons) && buttons.length > 0 ? (
              buttons.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(btn.value)}
                  className={`px-4 items-end py-1 rounded-md text-sm ${activeTab === btn.value
                    ? 'bg-[#f04f18] text-white'
                    : 'bg-gray-200 text-black'
                    }`}
                >
                  {btn.label}
                </button>
              ))
            ) : (
              <>
               
              {
                !isManager() && <button
                onClick={handleOnCreate}
                className="flex items-center gap-2 bg-[#f04f18] text-white px-4 py-1 rounded-full hover:bg-[#d34313] transition"
              >
                <Plus size={18} /> Create
              </button>
              }  
              </>

            )}
          </div>
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[17px] border border-black border-collapse">
          <thead className="bg-[#f9f9f9]">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="py-3 px-4 border border-black text-black">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-gray-100 transition"
                onClick={() => handleRowClick(row)}
              >
                {rowDataKeys.map((key, i) => (
                  <td key={i} className="py-3 px-4 border border-black text-black">
                    {renderCell(key, row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

ListTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowDataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  module: PropTypes.string.isRequired,
  onRowClick: PropTypes.func,
  onCreate: PropTypes.func,
  searchableFields: PropTypes.arrayOf(PropTypes.string),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default ListTable;
