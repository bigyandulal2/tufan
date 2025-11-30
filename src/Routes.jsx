import { useEffect, useState } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Pages
import LoginPage from './pages/auth/Authindexs';
import BranchCreationPage from './pages/Branch/Create';
import BranchDetailsPage from './pages/Branch/details/BranchDetailsPage';
import UpdateBranchPage from './pages/Branch/update/UpdateBranch';
import AllBranches from './pages/Branch/view/Allbranch';
// Components
import MapComponent from '../src/pages/Map/MapComponent.jsx';
import Privateroute from './components/common/Privateroute';
import SplashScreen from './components/common/SplashScreen';
import { ROLE_MANAGER } from './constant/role';
import AdminLayout from './pages';
import UnderDevelopment from './pages/future/UnderDevelopment';
import ManagerCreationPage from './pages/manager/create/ManagerCreationPage';
import ManagerDetailsPage from './pages/manager/details/ManagerDetailsPage';
import UpdateManagerPage from './pages/manager/update/UpdateManagerPage';
import AllManagers from './pages/manager/view/AllManager';
import AllPrice from './pages/price/AllPrice';
import PriceCreationPage from './pages/price/create/PriceCreationPage';
import PriceDetailsPage from './pages/price/details/PriceDetailsPage';
import UpdatePricePage from './pages/price/update/UpdatePricePage';
import ShowStatementPage from './pages/revenue/ShowStatement';
import RiderDetailsPage from './pages/riders/details/RiderDetailsPage';
import AllRiders from './pages/riders/view/AllRider';
import UpdateRider from './pages/riders/view/UpdateRider';
import AddRiderdata from './pages/users/view/AddRiderForm.jsx';
import AddVehichledata from './pages/users/view/AddVehicle.jsx';
import UsersList from './pages/users/view/Userlist.jsx';
import Userdetails from './pages/users/details/userdetails.jsx';
import Announcement from './pages/Announcement/Announcement.jsx';

const AppRoutes = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;


  return (
    <Router>
      <ToastContainer position="top-right" autoClose={1000} />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<Privateroute />}>
          <Route element={<AdminLayout />}>


            <Route path="blogs" element={<UnderDevelopment />} />
            <Route path="theme" element={<UnderDevelopment />} />
            <Route path="language" element={<UnderDevelopment />} />

            {/* Rider & Manager can see branches */}
            <Route path="branches/create" element={<BranchCreationPage />} />
            <Route path="branches" element={<AllBranches />} />
            <Route path="branches/:id" element={<BranchDetailsPage />} />
            <Route path="branches/update/:id" element={<UpdateBranchPage />} />

            {/* 🚫 Managers should NOT access these routes */}
            <Route element={<Privateroute blockedRoles={[ROLE_MANAGER]} />}>
              <Route path="managers" element={<AllManagers />} />
              <Route path="managers/create" element={<ManagerCreationPage />} />
              <Route path="managers/:id" element={<ManagerDetailsPage />} />
              <Route path="managers/update/:id" element={<UpdateManagerPage />} />

              <Route path="prices" element={<AllPrice />} />
              <Route path="prices/create" element={<PriceCreationPage />} />
              <Route path="prices/:id" element={<PriceDetailsPage />} />
              <Route path="prices/update/:id" element={<UpdatePricePage />} />
              <Route path="maps" element={<MapComponent />} />
              <Route path='announcement' element={<Announcement />} />

            </Route>

            {/* Riders, Managers can see */}
            <Route path="revenue" element={<ShowStatementPage />} />
            <Route path="riders" element={<AllRiders />} />
            <Route path="riders/:id" element={<RiderDetailsPage />} />
            <Route path="riders/update/:id" element={< UpdateRider />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/addRider/:id" element={<AddRiderdata />} />
            <Route path="users/addVehicle/:id" element={<AddVehichledata />} />
            <Route path="users/:id" element={< Userdetails />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;
