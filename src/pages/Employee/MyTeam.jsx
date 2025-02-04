import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../shared/SectionTitle";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuth()

  const { data: myInfo = [] } = useQuery({
    queryKey: ['myInfo', user.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/role/myInfo/${user.email}`)
      return res.data
    } 
  })

  
  
  const { data: myTeams = []  } = useQuery({
    queryKey: ['myTeams' , myInfo.hrManagerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myTeam/${myInfo.hrManagerId}`)
      return res.data
    }
  })

 

  


  return (
    <div className="my-20 min-h-[calc(100vh-350px)]">

      <Helmet>
        <title>My Team</title>
      </Helmet>
      <SectionTitle heading={'My Team'}></SectionTitle>


      <div className="w-80 mx-auto my-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>

            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              myTeams.length > 0 && myTeams.map((member, idx) => <tr key={idx}>

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
               
              </tr>)
            }

          </tbody>


        </table>

        {
          myTeams.length === 0  && <h2  className="text-center font-bold my-4 text-xl">No Team Member Found</h2>
        }
      </div>
    </div>
  );
};

export default MyTeam;