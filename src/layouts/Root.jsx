import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";


const Root = () => {
  const location = useLocation()
  const conditionalRendaring = location.pathname.includes('/joinAsEmployee') || location.pathname.includes('/joinAsHrManager') || location.pathname.includes('/login') 
  
  return (
    <div>
      
      {conditionalRendaring || <NavBar></NavBar>}
     
     
     
        <Outlet></Outlet>
      
     
      
      {conditionalRendaring || <Footer></Footer>}
     
    </div>
  );
};

export default Root;