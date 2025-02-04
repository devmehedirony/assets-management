import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';

const Notice = () => {
  return (
    <div className=" py-8 px-4 w-10/12 mx-auto my-20 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 justify-center">
        <AiOutlineInfoCircle className="text-blue-500" /> Important Notice Form Company
      </h2>
      <div className="mt-6 space-y-6">
        {/* Notice 1 */}
        <div className=" rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Maintenance Downtime
          </h3>
          <p className="text-gray-700 mt-2">
            Our servers will be down for maintenance on January 30th from 12 AM to 6 AM. Please plan accordingly.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4 justify-center">
            <MdDateRange className="text-gray-400" />
            <span>January 29, 2025</span>
          </div>
        </div>

        {/* Notice 2 */}
        <div className=" rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            New Feature Release
          </h3>
          <p className="text-gray-700 mt-2">
            We’re excited to announce a new dashboard update available starting February 1st. Stay tuned for details!
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4 justify-center">
            <MdDateRange className="text-gray-400" />
            <span>January 28, 2025</span>
          </div>
        </div>

        {/* Notice 3 */}
        <div className=" rounded-lg shadow p-6 text-center ">
          <h3 className="text-lg font-semibold text-gray-900">
            Holiday Announcement
          </h3>
          <p className="text-gray-700 mt-2">
            The office will remain closed on February 14th for Valentine’s Day. We hope you enjoy the holiday!
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4 justify-center">
            <MdDateRange className="text-gray-400" />
            <span>January 28, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
