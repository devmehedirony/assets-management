
import { FaLightbulb, FaChartBar, FaSearch, FaChartPie } from "react-icons/fa";
import SectionTitle from "../../shared/SectionTitle";


const ResearchSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle heading={'  Research Approach'}></SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top-Down Research */}
          <div className="border border-purple-400 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">
              Top-Down Research
            </h3>
            <p className="text-gray-600 mb-6">
              To define the investment universe, ARK&apos;s investment process initially examines how the world is changing and where it is headed.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaLightbulb className="text-purple-500 text-2xl" />
                <div>
                  <h4 className="font-bold text-gray-800">Ideation</h4>
                  <p className="text-gray-600">Identify Disruptive Innovation</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaSearch className="text-purple-500 text-2xl" />
                <div>
                  <h4 className="font-bold text-gray-800">Sizing The Opportunity</h4>
                  <p className="text-gray-600">Define The Potential Universe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-Up Research */}
          <div className="border border-green-400 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-green-600 mb-4">
              Bottom-Up Research
            </h3>
            <p className="text-gray-600 mb-6">
              To refine the investment opportunity, ARK's bottom-up analysis evaluates potential investments based on our defined key metrics.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaChartBar className="text-green-500 text-2xl" />
                <div>
                  <h4 className="font-bold text-gray-800">Stock Selection And Valuation</h4>
                  <p className="text-gray-600">Select Portfolio Companies</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaChartPie className="text-green-500 text-2xl" />
                <div>
                  <h4 className="font-bold text-gray-800">Portfolio And Risk Management</h4>
                  <p className="text-gray-600">Monitor Conviction & Market Volatility</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className='bg-[#8264FF] text-white py-3 px-6 text-xl   cursor-pointer'>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default ResearchSection;
