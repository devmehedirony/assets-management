import NavBar from "../shared/NavBar";
import SectionTitle from "../shared/SectionTitle";


const About = () => {
  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
     <div className="mt-32">
        <SectionTitle heading={'About'}></SectionTitle>
        <div className="max-w-4xl mx-auto p-6  shadow-lg rounded-2xl text-center">
          <h2 className="text-3xl font-bold  mb-6">About Our Asset Management System</h2>
          <div className="xl:w-10/12 w-11/12 text-center mx-auto mb-10 ">
            Our Asset Management System is designed to streamline the management, tracking, and optimization of your organization&apos;s assets. With powerful tools for inventory tracking, real-time asset monitoring, and maintenance scheduling, our system ensures that you can maximize the utilization of your resources while minimizing downtime. Whether you&apos;re managing IT equipment, machinery, or other physical assets, our platform provides an intuitive and user-friendly interface to help you stay in control. Empower your team with data-driven insights and efficient workflows to drive productivity and reduce costs.
          </div>
        </div>
     </div>
    </div>
  );
};

export default About;