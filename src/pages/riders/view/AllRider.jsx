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
  setCurrentPage,
} from '../../../redux/rider/ridersSlice';
import RenderImage from './RiderImage';

const AllRiders = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('All');
  const itemsPerPage = 15;
  const fetchedImagesRef = useRef(new Set());

  // ✅ FORCE ARRAYS (IMPORTANT)
  const riders = useSelector(selectRidersItems) ?? [];
  const pendingRiders = useSelector(selectPendingRidersItems) ?? [];
  const riderImages = useSelector(selectRiderImages) ?? {};
  const ridersStatus = useSelector(selectRidersStatus);
  const pendingStatus = useSelector(selectPendingRidersStatus);
  const branches = useSelector((state) => state.branches.items) ?? [];
  const currentPage = useSelector((state) => state.riders.currentPage) ?? 1;
   console.log("riderssss here",riders);
  const isPendingTab = activeTab === 'Pending';

  const dataToDisplay = isPendingTab ? pendingRiders : riders;
  const dataStatus = isPendingTab ? pendingStatus : ridersStatus;

  // ✅ Reset page on tab change
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [activeTab, dispatch]);

  // Fetch branches
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // Fetch riders based on tab
  useEffect(() => {
    if (isPendingTab) {
      dispatch(fetchPendingRiders());
    } else {
      dispatch(fetchRiders());
    }
  }, [dispatch, isPendingTab]);

  // Fetch rider images
  useEffect(() => {
    if (dataStatus !== 'succeeded' || !Array.isArray(dataToDisplay)) return;

    dataToDisplay.forEach((r) => {
      const img = r?.user?.imageName;
      if (img && !riderImages[img] && !fetchedImagesRef.current.has(img)) {
        fetchedImagesRef.current.add(img);
        dispatch(fetchRiderImage(img));
      }
    });
  }, [dataToDisplay, dataStatus, riderImages, dispatch]);

  // Format table data
  const formattedData = useMemo(() => {
    if (!Array.isArray(dataToDisplay)) return [];

    return dataToDisplay.map((rider) => {
      const imgName = rider?.user?.imageName;
      const imageUrl = riderImages[imgName];
      const branch = branches.find(
        (b) => String(b.id) === String(rider?.user?.branchId)
      );

      return {
        id: rider?.id ?? '—',
        name: rider?.user?.name ?? 'No Name',
        image: <RenderImage imageUrl={imageUrl} />,
        category: rider?.category?.categoryTitle ?? 'N/A',
        BranchName: branch?.name ?? 'N/A',
        balance: rider?.balance ?? 0,
        status: rider?.status ?? 'inactive',
      };
    });
  }, [dataToDisplay, riderImages, branches]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(formattedData.length / itemsPerPage)
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return formattedData.slice(start, start + itemsPerPage);
  }, [formattedData, currentPage]);

  // Rider counts
  const carRiderCount = riders.filter(
    (r) => r?.category?.categoryTitle?.toLowerCase() === 'car'
  ).length;

  const bikeRiderCount = riders.filter(
    (r) => r?.category?.categoryTitle?.toLowerCase() === 'bike'
  ).length;

  const tabButtons = useMemo(
    () => [
      { label: `All (${riders.length})`, value: 'All' },
      { label: `Pending (${pendingRiders.length})`, value: 'Pending' },
    ],
    [riders.length, pendingRiders.length]
  );

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 h-[736px] overflow-auto">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Riders List
        </h1>

        <div className="flex gap-4 mb-4">
          <p className="font-semibold">Car: {carRiderCount}</p>
          <p className="font-semibold">Bike: {bikeRiderCount}</p>
        </div>

        <ListTable
          data={paginatedData}
          headers={['ID', 'Name', 'Image', 'Category', 'Branch Name', 'Balance', 'Status']}
          rowDataKeys={['id', 'name', 'image', 'category', 'BranchName', 'balance', 'status']}
          module="riders"
          searchableFields={['name', 'category', 'status', 'BranchName']}
          buttons={tabButtons}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Prev
          </button>

          <span className="px-3 py-1 bg-blue-500 text-white rounded">
            {currentPage}
          </span>

          <button
            onClick={() =>
              dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllRiders;
