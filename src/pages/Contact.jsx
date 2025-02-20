import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import NavBar from "../shared/NavBar";

const Contact = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <NavBar></NavBar>
      </div>
      <div className="max-w-4xl mx-auto p-6  shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-[#8264FF] mb-6">Contact Us</h2>
  
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-blue-500 text-2xl" />
            <p>+880 123***322*</p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-red-500 text-2xl" />
            <p>support@example.com</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-green-500 text-2xl" />
            <p >Dhaka, Bangladesh</p>
          </div>
        </div>
  
        {/* Contact Form */}
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 focus:outline-[#8264FF]" />
          <input type="email" placeholder="Your Email" className="w-full p-3 border  focus:outline-[#8264FF]" />
          <textarea rows="4" placeholder="Your Message" className="w-full p-3 border  focus:outline-[#8264FF]"></textarea>
          <button type="submit" className="w-full bg-[#8264FF] text-white py-3 rounded-xl hover:bg-blue-600 transition">Send Message</button>
        </form>
  
        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://www.facebook.com/" className="text-blue-600 text-2xl hover:text-blue-800"><FaFacebook /></a>
          <a href="https://www.x.com/" className="text-blue-400 text-2xl hover:text-blue-600"><FaTwitter /></a>
          <a href="https://www.linkedin.com/" className="text-blue-700 text-2xl hover:text-blue-900"><FaLinkedin /></a>
        </div>
      </div>
 </div>
  );
};

export default Contact;
