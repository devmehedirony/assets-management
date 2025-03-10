import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import SectionTitle from '../../shared/SectionTitle';

const Notice = () => {
  return (
    <div className=" py-8 px-4 w-10/12 mx-auto mb-20 rounded-2xl shadow-lg">
      <SectionTitle heading={'Important Notice Form Company'}></SectionTitle>
      <div className="mt-6 space-y-6">
        {/* Notice 1 */}
        <div className=" rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold ">
            Maintenance Downtime
          </h3>
          <p className=" mt-2">
            Our servers will be down for maintenance on January 30th from 12 AM to 6 AM. Please plan accordingly.
          </p>
          <div className="flex items-center gap-2 text-sm  mt-4 justify-center">
            <MdDateRange className="" />
            <span>January 29, 2025</span>
          </div>
        </div>

        {/* Notice 2 */}
        <div className=" rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            New Feature Release
          </h3>
          <p className=" mt-2">
            We’re excited to announce a new dashboard update available starting February 1st. Stay tuned for details!
          </p>
          <div className="flex items-center gap-2 text-sm  mt-4 justify-center">
            <MdDateRange className="" />
            <span>January 28, 2025</span>
          </div>
        </div>

        {/* Notice 3 */}
        <div className=" rounded-lg shadow p-6 text-center ">
          <h3 className="text-lg font-semibold">
            Holiday Announcement
          </h3>
          <p className=" mt-2">
            The office will remain closed on February 14th for Valentine’s Day. We hope you enjoy the holiday!
          </p>
          <div className="flex items-center gap-2 text-sm  mt-4 justify-center">
            <MdDateRange  />
            <span>January 28, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
