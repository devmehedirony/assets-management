import {  FaHome, FaList, FaUsers } from "react-icons/fa";
import { FaMoneyBillWheat } from "react-icons/fa6";
import { IoIosAdd, IoMdGitPullRequest } from "react-icons/io";
import { MdOutlineRequestQuote } from "react-icons/md";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useManager } from "../hooks/useManager";
import { GiTeamIdea } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import PieChart from "./manager/PieChart";
import SectionTitle from "../shared/SectionTitle";


const DashBoard = () => {
  const [isManager] = useManager()
  const location = useLocation()
  const isDashBoardHome = location.pathname === "/dashboard"
  return (
    <div className="flex flex-col lg:flex-row gap-4 min-h-screen">

      <div className=" px-6 py-4 lg:w-72 w-full   bg-[#8264FF]">
        <div className="mt-6 mb-8 text-center"> <Link className="text-xl text-white"><h2 className='font-Cinzel text-2xl font-bold'>ASSETS</h2> <h2 className='font-Cinzel text-lg  tracking-[.47em]'>Management</h2></Link></div>

        <ul className="space-y-2 font-medium">
          {
            isManager ? <>
              <li>
                <NavLink to='/dashboard/asset-list' className={({ isActive }) =>
                  `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
                  }`
                }>
                  <FaList />
                  <span className="ms-3">Assets List</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/add-assets' className={({ isActive }) =>
                  `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
                  }`
                }>
                  <IoIosAdd />
                  <span className="flex-1 ms-3 whitespace-nowrap">Add Assets</span>

                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/all-request' className={({ isActive }) =>
                  `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
                  }`
                }>
                  <IoMdGitPullRequest />
                  <span className="flex-1 ms-3 whitespace-nowrap">All Requests</span>

                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/my-employees' className={({ isActive }) =>
                  `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
                  }`
                }>
                  <FaUsers />

                  <span className="flex-1 ms-3 whitespace-nowrap">My Employees</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/add-employees' className={({ isActive }) =>
                  `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
                  }`
                }>
                  <IoIosAdd />
                  <span className="flex-1 ms-3 whitespace-nowrap">Add Employees</span>
                </NavLink>
              </li>

            </> : <>

              <li>
                  <NavLink to='/dashboard/my-requested-assets' className={({ isActive }) =>
                  `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
                  }`
                }>
                    <MdOutlineRequestQuote />
                  <span className="ms-3">My Requested Assets</span>
                </NavLink>
              </li>
              <li>
                  <NavLink to='/dashboard/my-team' className={({ isActive }) =>
                  `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
                  }`
                }>
                    <GiTeamIdea />
                  <span className="flex-1 ms-3 whitespace-nowrap">My Team</span>

                </NavLink>
              </li>
              <li>
                  <NavLink to='/dashboard/request-for-assets' className={({ isActive }) =>
                  `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
                  }`
                }>
                    <FaMoneyBillWheat />
                  <span className="flex-1 ms-3 whitespace-nowrap">Assets Request</span>

                </NavLink>
                </li>
                
                
             
            </>
          }

          {/* shard item */}
          <li className="py-4"> <div className="border-b border  border-white"></div></li>
          <li>
            <NavLink to='/' className={({ isActive }) =>
              `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
              }`
            }>
              <FaHome />
              <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' className={({ isActive }) =>
              `flex items-center p-2  rounded-lg  hover:text-white group ${isActive ? 'text-white' : 'text-black'
              }`
            }>
              <CgProfile />
              <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
            </NavLink>
          </li>
        
         
        </ul>
      </div>

      <div className="flex-1">
      
        {
          isDashBoardHome && <>
            <SectionTitle heading={'WELCOME TO OUR DESHBOARD'}></SectionTitle>
            {isManager && <PieChart></PieChart>}
          </>
        }
         
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;