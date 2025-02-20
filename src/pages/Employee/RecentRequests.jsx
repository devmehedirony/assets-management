import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../shared/SectionTitle";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const RecentRequests = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: recentRequests = [] } = useQuery({
    queryKey: ['recentRequests', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/recentRequests/${user?.email}`)
      return res.data
    }
  })

  return (
    <div className=" w-10/12 mx-auto">
   
      <SectionTitle heading={'Recent Requests'}></SectionTitle>

      <div className="flex justify-center items-center gap-10 flex-wrap">

        {
          recentRequests.length > 0 && recentRequests.map((asset, idx) => <div key={idx} className="block w-96 p-6  shadow-xl space-y-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{asset.productName}</h5>
            <p className="font-normal "><span className="text-lg text-[#3085d6] font-bold">Type: </span> {asset.productType}</p>
            <p className="font-normal  "><span className="text-lg text-[#3085d6] font-bold">Request Date: </span> {asset.requestedDate}</p>
            {
              asset?.approvalDate && <p className="font-normal  "><span className="text-lg text-[#3085d6] font-bold">Approval Date: </span> {asset?.approvalDate}</p>
            }
            <p className="font-normal  "><span className="text-lg text-[#3085d6] font-bold">Request Status: </span> {asset.status}</p>
          </div>
          )
        }

        {
          recentRequests.length === 0 && <h2 className="text-center font-bold text-xl">No Request Found</h2>
        }

      </div>
    </div>
  );
};

export default RecentRequests;