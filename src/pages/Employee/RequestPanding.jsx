import Swal from "sweetalert2";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../shared/SectionTitle";


const RequestPanding = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuth()

  const { data: myRequestedStatus = [], refetch } = useQuery({
    queryKey: ['myRequestedStatus', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requestsPending/${user?.email}`)
      return res.data
    }
  })


  const handleDelete = (asset) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/requests/${asset._id}`)
            .then(res => {
              if (res.data.deletedCount > 0) {
                refetch()
                Swal.fire({
                  title: `${asset.requesterName}`,
                  text: "Your Request has been deleted.",
                  icon: "success"
                });
            }
          })
        }
      });
    }
  
  return (
    <div className="w-11/12 md:w-10/12 mx-auto my-20 ">

      <SectionTitle heading={'My Pending Requests'}></SectionTitle>
      <div className="flex justify-center items-center gap-10 flex-wrap">

        {
          myRequestedStatus.length > 0 && myRequestedStatus.map((asset, idx) => <div key={idx} className="block w-96 p-6  shadow-xl space-y-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{asset.productName}</h5>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Type: </span> {asset.productType}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Request Date: </span> {asset.requestedDate}</p>
            {
              asset?.approvalDate && <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Approval Date: </span> {asset?.approvalDate}</p>
            }
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Request Status: </span> {asset.status}</p>
            <div className="flex items-center justify-center gap-x-4 mt-4 text-white">
              
              <button onClick={() => handleDelete(asset)} className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer">Cancel Request</button>
            </div>

          </div>
          )
        }

        {
          myRequestedStatus.length === 0 && <h2 className="text-center font-bold text-xl">No pending Request Found</h2>
        }

      </div>
    </div>
  );
};

export default RequestPanding;