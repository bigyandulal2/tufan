import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListTable from '../../../components/ui/BranchTable';
import { fetchBranches } from '../../../redux/branchSlice';
import {
  selectPendingRidersItems,
  selectPendingRidersStatus,
  selectRiderImages,
  selectRidersItems,
  selectRidersStatus,
} from '../../../redux/rider/riderSelectors';
import {
  fetchPendingRiders,
  fetchRiderImage,
  fetchRiders,
} from '../../../redux/rider/ridersSlice';
import RenderImage from './RiderImage';

const AllRiders = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('All');
  const fetchedImagesRef = useRef(new Set());

  const riders = useSelector(selectRidersItems);
  const pendingRiders = useSelector(selectPendingRidersItems);
  const riderImages = useSelector(selectRiderImages);
  const ridersStatus = useSelector(selectRidersStatus);
  const pendingStatus = useSelector(selectPendingRidersStatus);
  const branches = useSelector((state) => state.branches.items);

  const isPendingTab = activeTab === 'Pending';
  const dataToDisplay = isPendingTab ? pendingRiders : riders;
  const dataStatus = isPendingTab ? pendingStatus : ridersStatus;



  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // Fetch riders based on active tab
  useEffect(() => {
    if (isPendingTab) {
      dispatch(fetchPendingRiders());
    } else {
      dispatch(fetchRiders());
    }
  }, [dispatch, activeTab, isPendingTab]);

  // Fetch rider images if not already loaded
  useEffect(() => {
    if (dataStatus !== 'succeeded') return;

    const imagesToFetch = dataToDisplay
      .map((r) => r?.user?.imageName)
      .filter((img) => img && !riderImages[img] && !fetchedImagesRef.current.has(img));

    imagesToFetch.forEach((img) => {
      fetchedImagesRef.current.add(img);
      dispatch(fetchRiderImage(img));
    });
  }, [dataToDisplay, dataStatus, riderImages, dispatch]);

  // Format data for the table
  const formattedData = useMemo(() => {
    return (dataToDisplay || []).map((rider) => {
      const imgName = rider?.user?.imageName;
      const imageUrl = riderImages[imgName];
      const riderBranchId = rider?.user?.branchId;
      console.log('Branch ID:',);
      console.log('Branch :',);




      // Get branch name using branchId
      const branch = branches.find((b) => String(b.id) === String(riderBranchId));
      const branchName = branch?.name || 'N/A';

      return {
        id: rider.id,
        name: rider.user?.name || 'No Name',
        image: <RenderImage imageUrl={imageUrl} />,
        category: rider.category?.categoryTitle || 'N/A',
        BranchName: branchName,
        balance: rider.balance ?? 0,
        status: rider.status || 'inactive',
      };
    });
  }, [dataToDisplay, riderImages, branches]);

  // Tab button labels
  const tabButtons = useMemo(
    () => [
      { label: `All (${riders.length})`, value: 'All' },
      { label: `Pending (${pendingRiders.length})`, value: 'Pending' },
    ],
    [riders.length, pendingRiders.length]
  );

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Riders List
        </h1>

        <ListTable
          data={formattedData}
          headers={['ID', 'Name', 'Image', 'Category', 'Branch Name', 'Balance', 'Status']}
          rowDataKeys={['id', 'name', 'image', 'category', 'BranchName', 'balance', 'status']}
          module="riders"
          searchableFields={['name', 'category', 'status', 'BranchName']}
          buttons={tabButtons}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default AllRiders;