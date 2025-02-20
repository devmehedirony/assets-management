import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import JoinEpoyee from "../pages/JoinEployee";
import JoinManager from "../pages/JoinManager";
import Login from "../pages/Login";
import AddAssets from "../pages/manager/AddAssets";
import AssetList from "../pages/manager/AssetList";
import RequestAssets from "../pages/Employee/RequestAssets";
import MyRequestedAssets from "../pages/Employee/MyRequestedAssets";
import AllRequest from "../pages/manager/AllRequest";
import UpdateAssets from "../pages/manager/UpdateAssets";
import Print from "../pages/Employee/Print";
import AddEmployee from "../pages/manager/AddEmployee";
import Payment from "../pages/Payment";
import MyEmployee from "../pages/manager/MyEmployee";
import MyTeam from "../pages/Employee/MyTeam";
import Profile from "../pages/Profile";
import PrivateRoutes from "./PrivateRoute";
import DashBoard from "../pages/DashBoard";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'joinAsEmployee',
        element: <JoinEpoyee></JoinEpoyee>
      },
      {
        path: 'joinAsHrManager',
        element: <JoinManager></JoinManager>,
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      
    ]
  },
  {
    path: 'dashboard',
    element: <DashBoard></DashBoard>,
    children: [
    
      // manager routes
      {
        path: 'add-assets',
        element: <PrivateRoutes><AddAssets></AddAssets></PrivateRoutes>,
      },
      {
        path: 'asset-list',
        element: <PrivateRoutes><AssetList></AssetList></PrivateRoutes>
      },
      {
        path: 'update/:id',
        element: <PrivateRoutes><UpdateAssets></UpdateAssets></PrivateRoutes>

      },
      {
        path: 'add-employees',
        element: <PrivateRoutes><AddEmployee></AddEmployee></PrivateRoutes>
      },
      {
        path: 'my-employees',
        element: <PrivateRoutes><MyEmployee></MyEmployee></PrivateRoutes>
      },


      // employee
      {
        path: 'request-for-assets',
        element: <PrivateRoutes><RequestAssets></RequestAssets></PrivateRoutes>
      },
      {
        path: 'my-requested-assets',
        element: <PrivateRoutes><MyRequestedAssets></MyRequestedAssets></PrivateRoutes>,
      },
      {
        path: 'all-request',
        element: <PrivateRoutes><AllRequest></AllRequest></PrivateRoutes>
      },
      {
        path: 'printDocument/:id',
        element: <PrivateRoutes><Print></Print></PrivateRoutes>
      },

      {
        path: 'my-team',
        element: <PrivateRoutes><MyTeam></MyTeam></PrivateRoutes>
      },
     

    ]
  },

  {
    path: '/profile',
    element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
  },

  {
    path: 'payment',
    element: <Payment></Payment>
  }
    
  
]);

