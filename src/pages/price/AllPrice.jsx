import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListTable from '../../components/ui/BranchTable';
import { loadAllPrice } from '../../services/price';
import { useState } from 'react';

const AllPrice = () => {
  const dispatch = useDispatch();
  const prices = useSelector((state) => state.prices.items);
  const status = useSelector((state) => state.prices.status);
  const [formedData, setTransformedData] = useState([]);



  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await loadAllPrice();
        setTransformedData(data)
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  /*useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPrices());
    }
  }, [dispatch, status]);*/

  // 🔁 Transform the raw data for table display
  /*const transformedData = useMemo(() => {
    return formedData.map((m) => ({
      id: m.id || '-',
      province: m.province || '-',                 // user id
      categoryTitle: m.category?.categoryTitle || '-',          // manager's username
      baseFare: m.baseFare || '-',      // branch name
      perKmRate: m.perKmRate || '-',  // user's phone
      active: m.active || '-' // branch phone
    }));
  }, [formedData]);*/


  const transformedData = useMemo(() =>
    formedData.map((m) => ({
      id: m.id || '-',
      province: m.province || '-',
      categoryTitle: m.category?.categoryTitle || '-',
      baseFare: m.baseFare || '-',
      perKmRate: m.perKmRate || '-',
      active: m.active != null ? m.active : '-' // Check for undefined or null explicitly
    })), [formedData]);




  if (!prices || status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">price data not found or still loading...</p>;
  }

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Price List
        </h1>

        <div className="w-full px-2 max-md:ml-0 max-md:w-full">
          <ListTable
            data={transformedData}
            headers={['ID', 'Province', 'CategoryTitle', 'BaseFare', 'PerKmRate']}
            rowDataKeys={['id', 'province', 'categoryTitle', 'baseFare', 'perKmRate']}
            module="prices"
            searchableFields={['id', 'province', 'categoryTitle', 'baseFare', 'perKmRate']}
          />
        </div>
      </div>
    </div>
  );
};

export default AllPrice;
