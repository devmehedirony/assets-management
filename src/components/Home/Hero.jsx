import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hr from '../../assets/hr-manager.jpg'
import employee from '../../assets/employee.jpg'
import './css/Banner.css'
import { Link } from 'react-router-dom';
import { MdDoubleArrow } from 'react-icons/md';
import { useAuth } from '../../hooks/useAuth';

const Hero = () => {
  const {user} = useAuth()
  return (
    <div>
      <Carousel autoPlay infiniteLoop  showThumbs={false}>
        <div className='bg-black'>
          <div className="xl:h-[700px] h-[350px] object-cover">
            <img src={hr} className='opacity-50 object-cover'/>
            <div className='flex justify-center items-center'>
              <div className='absolute top-25 md:top-32 xl:top-75 space-y-5'>
                {
                  user ? <div className='flex justify-center flex-col items-center gap-4'>
                 
                    <p className='text-white font-bold text-2xl'>Dashboard! Here you can manage everything.</p>
                    <Link className='' to={`/dashboard`}><button className='bg-[#8264FF] text-white px-6 xl:px-14 py-6  font-semibold cursor-pointer  xl:text-lg flex items-center gap-2'>Your DashBoard<MdDoubleArrow className='text-2xl' /></button></Link>
                  </div> : <>
                    <Link to='/joinAsHrManager'><button className='bg-[#8264FF] text-white px-6 xl:px-14 py-6  font-semibold cursor-pointer  xl:text-lg flex items-center gap-2'>Join as HR Manager <MdDoubleArrow className='text-2xl' /></button> </Link>
                  </>
               }
              </div>
            </div>
  
  
          </div>
        </div>
        <div className='bg-black'>
          <div className="xl:h-[700px] h-[350px] object-cover">
            <img src={employee} className='opacity-50 object-cover' />
            <div className='flex justify-center items-center'>
              <div className='absolute top-25 md:top-32 xl:top-75 space-y-5'>
                {
                  user ? <div className='flex justify-center flex-col items-center gap-4'>

                    <p className='text-white font-bold text-2xl'>Dashboard! Here you can manage everything.</p>
                    <Link className='' to={`/dashboard`}><button className='bg-[#8264FF] text-white px-6 xl:px-14 py-6  font-semibold cursor-pointer  xl:text-lg flex items-center gap-2'>Your DashBoard<MdDoubleArrow className='text-2xl' /></button></Link>
                  </div> : <>
                      <Link to='/joinAsEmployee'><button className='bg-[#8264FF] text-white px-14 py-6  font-semibold cursor-pointer text-lg flex items-center gap-2'>Join as Employee <MdDoubleArrow className='text-2xl' /></button> </Link>
                  </>
                }
              </div>
            </div>


          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;