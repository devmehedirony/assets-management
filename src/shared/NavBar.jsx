import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { useAuth } from "../hooks/useAuth";
import { useManager } from "../hooks/useManager";
import { useEmployee } from "../hooks/useEmployee"
import { useEffect, useState } from "react";



const NavBar = () => {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()
  const [isManager] = useManager()
  const [isEmployee] = useEmployee()
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  const handleToogle = e => {
    if (e.target.checked) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')
    document.querySelector('html').setAttribute('data-theme', localTheme)
  }, [theme])
  
  
 
  
  const handleLogOut = () => {
    logOut()
      .then(res => {
      navigate('/')
    })
  }

  const links = (
    
    <>
      
    <li className="text-lg  ">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'bg-white text-[#8264FF]  lg:p-6 text-lg  font-medium rounded-none'
            : 'text-base text-white'
        }
        to="/"
      >
        Home
      </NavLink>
    </li>

      
      {
      user ? <>
        
        

        <li className="text-lg  ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-[#8264FF]  lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base text-white'
            }
              to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>

        <li className="text-lg  ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-[#8264FF]  lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base text-white'
            }
            to="/about"
          >
            About
          </NavLink>
        </li>

        <li className="text-lg  ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-[#8264FF]  lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base text-white'
            }
            to="/profile"
          >
            Profile
          </NavLink>
        </li>

        <li className="text-lg  ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-[#8264FF]  lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base text-white'
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </li>
      
      </> : <>

        

          <li className="text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                ? 'bg-white text-[#8264FF]  lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base text-white'
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
                ? 'bg-white text-[#8264FF] lg:p-6 text-lg  font-medium rounded-none'
                : 'text-base text-white'
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
   <div className="bg-[#8264FF] fixed top-0 left-0 z-50 w-full">
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
            isManager && <img className="h-12 rounded-2xl" src={user.photoURL} alt="" />
          }
  
          
          
            {
              isEmployee && <img className="h-12  rounded-2xl" src={user.photoURL} />
            }
      
          
          {
            user ? <></> : <div className="flex items-center gap-2 ">
              <img src={logo} className="lg:h-14 h-10 rounded-2xl" alt="" />
              <h2 className="xl:text-3xl text-xl font-bold hidden md:block text-white">Smart Assets</h2>
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
              <button onClick={handleLogOut} className="bg-white text-[#8264FF] px-4 font-bold xl:py-6 xl:px-14  cursor-pointer">Logout</button>
              </div> :
  
              <Link to='/login'> <button className="bg-white text-[#8264FF] py-5 xl:py-6 px-14  cursor-pointer">Login</button></Link>
          }
          
          {/* dark mode switch */}
          <label className="toggle text-base-content ml-4">
            <input type="checkbox" value="synthwave" className="theme-controller h-10" onChange={handleToogle}/>

              <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

              <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

          </label>
         
        </div>
      </div>
   </div>
  );
};

export default NavBar;