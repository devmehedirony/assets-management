import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { useAuth } from "../hooks/useAuth";
import { useManager } from "../hooks/useManager";
import { useEmployee } from "../hooks/useEmployee"



const NavBar = () => {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()
  const [isManager] = useManager()
  const [isEmployee] = useEmployee()
  
  
 
  
  const handleLogOut = () => {
    logOut()
      .then(res => {
      navigate('/')
    })
  }

  const links = (<>

      {/* employee navigation */}
      {isEmployee && <>

        <li className="text-lg cursor-pointer">
          <NavLink
            className={({ isActive }) =>
              isActive
              ? 'bg-[#8264FF] text-white  lg:p-6 text-base text-lg  font-medium rounded-none'
                : 'text-base'
            }
            to="/"
          >
            Home
          </NavLink>
        </li>

        <li className="text-lg">
          <NavLink
            className={({ isActive }) =>
              isActive
              ? 'bg-[#8264FF] text-white  lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base'
            }
            to="/my-requested-assets"
          >
            My Assets
          </NavLink>
        </li>

        <li className="text-lg">
          <NavLink
            className={({ isActive }) =>
              isActive
              ? 'bg-[#8264FF] text-white  lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base'
            }
            to="/my-team"
          >
            My Team
          </NavLink>
        </li>

        <li className="text-lg">
          <NavLink
            className={({ isActive }) =>
              isActive
              ? 'bg-[#8264FF] text-white  lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base'
            }
            to="/request-for-assets"
          >
            Request for an Asset

          </NavLink>
        </li>

        <li className="text-lg">
          <NavLink
            className={({ isActive }) =>
              isActive
              ? 'bg-[#8264FF] text-white  lg:p-6 text-lg  font-medium rounded-none' 
                : 'text-base'
            }
            to="/profile"
          >
            Profile

          </NavLink>
        </li>

      </>}


      {/* manager navigation */}
      {
        isManager && <><li className="text-lg">
          <NavLink
            className={({ isActive }) =>
              isActive
              ? 'bg-[#8264FF] text-white px-3 py-2 xl:p-6 xl:text-lg  font-medium rounded-none'
                : 'text-base'
            }
            to="/"
          >
            Home
          </NavLink>
        </li>

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF] text-white px-3 py-2 xl:p-6 xl:text-lg  font-medium rounded-none'
                  : 'text-base'
              }
              to="/asset-list"
            >
              Asset List
            </NavLink>
          </li>

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF] text-white  px-3 py-2 xl:p-6 xl:text-lg  font-medium rounded-none'
                  : 'text-base'
              }
              to="/add-assets"
            >
              Add an Asset

            </NavLink>
          </li>

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF] text-white px-3 py-2 xl:p-6 xl:text-lg  font-medium rounded-none'
                  : 'text-base'
              }
              to="/all-request"
            >
              All Requests


            </NavLink>
          </li>

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF] text-white  px-3 py-2 xl:p-6 xl:text-lg  font-medium rounded-none'
                  : 'text-base'
              }
              to="/my-employees"
            >
              My Employee List


            </NavLink>
          </li>

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF] text-white px-3 py-2 xl:p-6 xl:text-lg  font-medium rounded-none'
                  : 'text-base'
              }
              to="/add-employees"
            >
              Add an Employee

            </NavLink>
          </li>

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF] text-white px-3 py-2 xl:p-6 xl:text-lg text-base  font-medium rounded-none'
                  : 'text-base'
              }
              to="/profile"
            >
              Profile

            </NavLink>
          </li>
        </>
      }

      {
        user ? <></> : <>

        <li className="text-lg  ">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF] text-white  lg:p-6 text-lg  font-medium rounded-none'
                  : 'text-base'
              }
              to="/"
            >
              Home
            </NavLink>
          </li>

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF]  text-white  lg:p-6 text-lg  font-medium rounded-none'
                  : 'text-base'
              }
              to="/joinAsEmployee"
            >
              Join as Employee
            </NavLink>
          </li>

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-[#8264FF]  text-white lg:p-6 text-lg  font-medium rounded-none'
                  : 'text-base'
              }
              to="/joinAsHrManager"
            >
              Join as HR Manager
            </NavLink>
          </li>







        </>
      }
    
  
  
  </>)


  return (
    <div className="navbar py-0 w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        {
          isManager && <img className="h-14" src={user.photoURL} alt="" />
        }

        
        
          {
            isEmployee && <img className="h-10  " src={user.photoURL} />
          }
    
        
        {
          user ? <></> : <div className="flex items-center gap-2 ">
            <img src={logo} className="lg:h-16 h-10" alt="" />
            <h2 className="xl:text-3xl text-xl font-bold hidden md:block">Smart Assets</h2>
          </div>
       }

      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal xl:px-1 xl:gap-x-6 gap-x-3  items-center py-0">
         {links}
        </ul>
      </div>
      <div className="navbar-end">
       
          {
            user ? <div className="flex gap-4 ">
              <div className="avatar avatar-online " >
                <div className="h-16 xl:w-18  rounded-full" >
                  <img  src={user?.photoURL} />
                </div>
              </div>
              <button onClick={handleLogOut} className="bg-[#8264FF] px-4 text-white xl:py-6 xl:px-14  cursor-pointer">Logout</button>
            </div> :

              <Link to='/login'> <button className="bg-[#8264FF] text-white py-5 xl:py-6 px-14  cursor-pointer">Login</button></Link>
          }
       
      </div>
    </div>
  );
};

export default NavBar;