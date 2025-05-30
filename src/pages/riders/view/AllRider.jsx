import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRidersItems,
  selectRidersStatus,
  selectRiderImages,
  selectPendingRidersItems,
  selectPendingRidersStatus,
} from '../../../redux/rider/riderSelectors';
import {
  fetchRiders,
  fetchRiderImage,
  fetchPendingRiders,
} from '../../../redux/rider/ridersSlice';
import ListTable from '../../../components/ui/BranchTable';
import RenderImage from './RiderImage';

const AllRiders = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('All');

  const riders = useSelector(selectRidersItems);
  const pendingRiders = useSelector(selectPendingRidersItems);
  const riderImages = useSelector(selectRiderImages);
  const ridersStatus = useSelector(selectRidersStatus);
  const pendingStatus = useSelector(selectPendingRidersStatus);
  const fetchedImagesRef = useRef(new Set());

  const isPendingTab = activeTab === 'Pending';
  const dataToDisplay = isPendingTab ? pendingRiders : riders;
  const dataStatus = isPendingTab ? pendingStatus : ridersStatus;

  useEffect(() => {
    dispatch(isPendingTab ? fetchPendingRiders() : fetchRiders());
  }, [dispatch, activeTab]);



  useEffect(() => {
    if (dataStatus !== 'succeeded') return;

    const imagesToFetch = dataToDisplay
      .map((r) => r?.user?.imageName)
      .filter(
        (img) => img && !riderImages[img] && !fetchedImagesRef.current.has(img)
      );

    imagesToFetch.forEach((img) => {
      fetchedImagesRef.current.add(img);
      dispatch(fetchRiderImage(img));
    });
  }, [dataToDisplay, dataStatus, riderImages, dispatch]);

  const formattedData = useMemo(() => {
    return (dataToDisplay || []).map((rider) => {
      const imgName = rider?.user?.imageName;
      const imageUrl = riderImages[imgName];

      return {
        id: rider.id,
        name: rider.user?.name || 'No Name',
        image: <RenderImage imageUrl={imageUrl} />,

        /* imageUrl ? (
        <img
          src={imageUrl}
          alt="Rider"
          className="h-20 w-15 object-cover rounded-full"
        />
        ) : (
        <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full text-xs text-gray-500">
          Loading...
        </div>
        ),*/
        category: rider.category?.categoryTitle || 'N/A',
        balance: rider.balance ?? 0,
        status: rider.status || 'inactive',
      };
    });
  }, [dataToDisplay, riderImages]);

  const tabButtons = useMemo(() => [
    { label: `All (${riders.length})`, value: 'All' },
    { label: `Pending (${pendingRiders.length})`, value: 'Pending' },
  ], [riders.length, pendingRiders.length]);

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Riders List
        </h1>

        <ListTable
          data={formattedData}
          headers={['ID', 'Name', 'Image', 'Category', 'Balance', 'Status']}
          rowDataKeys={['id', 'name', 'image', 'category', 'balance', 'status']}
          module="riders"
          searchableFields={['name', 'category', 'status']}
          buttons={tabButtons}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default AllRiders;
