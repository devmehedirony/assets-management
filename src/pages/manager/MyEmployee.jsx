import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const MyEmployee = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  
  const { data: myEmployee = [] , refetch } = useQuery({
    queryKey: ['myEmployee'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/team/${user.email}`)
      return res.data
    }
  })

  const handleTeamRemove = (member) => {
    axiosSecure.patch(`/removeTeam/${member._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            title: `${member.name}`,
            text: "Removed From Team",
            icon: "success"
          });
        }
    })
  }


  return (
    <div className="my-20">
      <Helmet>
        <title>My Employees</title>
      </Helmet>
      <SectionTitle heading={'My Employess'}></SectionTitle>

    <div className="flex justify-center flex-col xl:flex-row">
       
          <h2 className=" text-xl lg:text-3xl  font-bold my-4 lg:mb-12 text-center">All Members ({myEmployee.length})</h2>
        
    </div>
      
      <div className=" max-w-2xl mx-auto mb-20">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              myEmployee.length > 0 && myEmployee.map((member, idx) => <tr key={idx}>
              
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={member?.image}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {member.name}
                </td>
                <td>
                  <button onClick={()=> handleTeamRemove(member)} className="btn bg-[#8264FF] text-white">Remove From Team</button>
              </td>
              </tr>)
            }

          </tbody>


        </table>
        {
          myEmployee.length === 0 && <h2 className="text-xl text-center my-4 font-semibold">User Not found</h2>
        }
      </div>
    </div>
  );
};

export default MyEmployee;