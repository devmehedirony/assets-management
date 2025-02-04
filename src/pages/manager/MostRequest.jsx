import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import moment from "moment";
import { MdDoneOutline } from "react-icons/md";
import { IoMdCloudDone } from "react-icons/io";
import { useAuth } from "../../hooks/useAuth";


const MostRequest = () => {
  const {  loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: mostRequests = [], refetch } = useQuery({
    queryKey: ['mostRequests'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/mostRequestsItem`)
      return res.data
    }
  })


   const handleApprove = (asset) => {
        
        const approve = {
          status: 'Approved',
          approvalDate: moment().format('dddd, MMMM Do YYYY'),
          productId: asset.productId
        }
        axiosSecure.patch(`/requests/${asset._id}`, approve)
          .then(res => {
           
            if (res.data.result.modifiedCount > 0) {
              refetch()
              Swal.fire("Approved Successfull");
            }
        })
        
    }
  return (
    <div>
      <SectionTitle heading={'most request'}></SectionTitle>

       <div className="flex justify-center items-center gap-10 my-20 flex-wrap">
            
                    {
          mostRequests.length > 0 && mostRequests.map((asset, idx) => <div key={idx} className="block w-96 p-6  shadow-xl space-y-2">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{asset.productName}</h5>
                        <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Type: </span> {asset.productType}</p>
                        <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Requester Mail: </span> {asset.requesterMail}</p>
                        <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Requester Name: </span> {asset.requesterName}</p>
                        <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Requested: </span> {asset.requestedDate}</p>
                        <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Note: </span> {asset?.additionalNote}</p>
                        <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Status: </span> {asset?.status}</p>
                        <div className="flex items-center justify-center gap-x-4 mt-4 text-white">
                          
                          {
                            asset.status === 'Approved' ? <button className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer" >  Approved This Request  <MdDoneOutline /></button> : <>
                              <button className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer" onClick={() => handleApprove(asset)}>  Approve  <IoMdCloudDone /></button>
            
                              <button  className="bg-red-500 flex items-center gap-x-2 px-4 py-2 cursor-pointer">  Reject  <RxCross2 className="text-xl" /></button>
                            </>
                         }
                        </div>
            
                      </div>
                      )
                    }
            
                    {
          mostRequests.length === 0 && <h2 className="text-center font-bold text-xl">No Requests Found</h2>
                    }
            
                  </div>
    </div>
  );
};

export default MostRequest;