
import { FaArrowRight } from 'react-icons/fa';
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import SectionTitle from '../../shared/SectionTitle';

const InvestMent = () => {
  return (
    <div>
     
      <section className=" pt-2  text-center">
        <SectionTitle heading={'Investment Team'}></SectionTitle>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 w-11/12  grid-cols-1 gap-6  mx-auto">
          <div className=" shadow-lg rounded-xl overflow-hidden text-center p-6">
            <img
              src={img1}
              alt="Catherine Wood"
              className="w-full h-100 object-center object-cover"
            />
            <h3 className="text-lg font-semibold mt-4">Catherine Wood</h3>
            <p className="text-sm  mt-2">Chief Executive Officer, Chief Investment Officer</p>
          </div>
          <div className=" shadow-lg rounded-xl overflow-hidden text-center p-6">
            <img
              src={img2}
              alt="Tasha Keeney, CFA"
              className="w-full h-100 object-cover"
            />
            <h3 className="text-lg font-semibold mt-4">Tasha Keeney, CFA</h3>
            <p className="text-sm  mt-2">Director of Investment Analysis & Institutional Strategies</p>
          </div>
          <div className=" shadow-lg rounded-xl overflow-hidden text-center p-6">
            <img
              src={img3}
              alt="Brett Winton"
              className="w-full h-100 object-cover"
            />
            <h3 className="text-lg font-semibold mt-4">Brett Winton</h3>
            <p className="text-sm  mt-2">Chief Futurist, ARK Venture Investment Committee Member</p>
          </div>
        </div>
      <div className='flex justify-center my-10'>  <button className='bg-[#8264FF] text-white py-3 px-6 text-xl  flex justify-center gap-x-4 items-center cursor-pointer'> View All Team Members <FaArrowRight /></button></div>
      </section>
    </div>
  );
};

export default InvestMent;