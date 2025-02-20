import { Helmet } from "react-helmet-async";
import About from "../components/Home/About";
import Hero from "../components/Home/Hero";
import Notice from "../components/Home/Notice";
import { useAuth } from "../hooks/useAuth";
import { useEmployee } from "../hooks/useEmployee";
import { useManager } from "../hooks/useManager";
import RecentRequests from "./Employee/RecentRequests";
import RequestPanding from "./Employee/RequestPanding";
import LimitedStock from "./manager/LimitedStock";
import MostRequest from "./manager/MostRequest";
import PendingAllRequests from "./manager/PendingAllRequests";
import PieChart from "./manager/PieChart";
import ResearchSection from "./manager/ResearchSection";
import InvestMent from "./manager/InvestMent";
import Package from "../components/Home/Package"



const Home = () => {
  const [isManager] = useManager()
  const [isEmployee] = useEmployee()
  const {user} = useAuth()
  return (
    <div>
      <Helmet>
        <title>AssetsManagement | Home</title>
      </Helmet>
     

      <Hero></Hero>
      <Package></Package>
      <About></About>
   
      {
        user ? <></> :
          <>
           
        
        </>
     }
    </div>
  );
};

export default Home;