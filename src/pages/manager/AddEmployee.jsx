import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { IoMdCloudDone } from "react-icons/io";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";



const AddEmployee = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
 


  const { data: notAffiliated = [], refetch } = useQuery({
    queryKey: ['notAffiliated'],
    queryFn: async () => {
      const res = await axiosSecure.get('/withOutTeam/employees')
      return res.data
    }
  })


  const { data: manager = [], refetch: managerRefetch } = useQuery({
    queryKey: ['manager'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/hrManager/${user.email}`)
      return res.data
    }
  })


  const { data: limit = [], refetch: limitRefetch } = useQuery({
    queryKey: ['limit'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/team/${user.email}`)
      return res.data
    }
  })






  const handleAddEmployee = (member) => {


    const teamData = {
      team: user?.email,
      hrManagerId: manager._id,

    }
    axiosSecure.patch(`/addTeam/${member._id}`, teamData)

      .then(res => {
        if (res.data.modifiedCount > 0) {
          managerRefetch()
          limitRefetch()
          refetch()
          Swal.fire(`${member.name} Added SucessFully`);
        }
      })
  }

  const handlePayment = (e) => {
 
    const updatedPakage = {
      selectedPackage: e.target.value.split('$')[1]
    }

    axiosSecure.patch(`/updatePakageLimit/${user.email}`, updatedPakage)
      .then(res => {
       
      }) 
  
  }

  return (
    <div className="min-h-[calc(100vh-350px)] md:w-10/12 mx-auto">
      <Helmet>
        <title>Add Employees</title>
      </Helmet>
      <SectionTitle heading={'Add Employees'}></SectionTitle>

      {/* payment section & package section & increse limit section */}
      <div className="flex justify-center ">
        <div className="max-w-4xl flex items-center flex-col md:flex-row gap-y-4 mt-4 justify-between lg:gap-50 md:gap-32">
          <h2 className="lg:text-3xl text-xl  font-bold ">All Employees ({notAffiliated.length})</h2>

          <div className="flex items-center gap-x-10">
            <h4 className="text-lg font-bold">limit ({manager.selectedPackage} employee)</h4>
            {/* modal to details view */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button type='button' className="btn bg-[#8264FF] text-white" onClick={() => document.getElementById('my_modal_4').showModal()}>increase the limit +</button>
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-2xl">

                <div className='flex items-center flex-col md:flex-row justify-center gap-6'>
                  <div className="block  p-6   shadow-xl space-y-2">
                    <h5 className="mb-2 text-2xl text-center font-bold tracking-tight  ">$5</h5>
                    <p className="font-normal  text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 5</span></p>
                  </div>

                  <div className="block  p-6   shadow-xl space-y-2">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight   text-center">$8</h5>
                    <p className="font-normal  text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 10</span></p>
                  </div>

                  <div className="block  p-6   shadow-xl space-y-2">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight  text-center">$15</h5>
                    <p className="font-normal   text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 20</span></p>
                  </div>
                </div>

                {/* select package */}
                <div className="flex justify-center mt-10 flex-col items-center gap-y-2">
                  <label className="font-bold">Select Package</label>
                  <select onChange={handlePayment} defaultValue="Large" className="select select-lg">
                    <option>$5</option>
                    <option>$8</option>
                    <option>$15</option>
                  </select>
                </div>

                <div className="modal-action justify-center ">

                  <Link to='/payment'><button className="btn bg-[#8264FF] text-white">Payment</button></Link>
                  <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn bg-red-500 text-white">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

          </div>
        </div>
      </div>

      {/* table section */}
      <div className="  md:max-w-4xl mx-auto mb-20 mt-10">
        <table className="table">
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
              notAffiliated.length > 0 && notAffiliated.map((member, idx) => <tr key={idx}>
                
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={member?.image}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{member?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {member?.email}
                </td>
                <td>
                  {
                    manager.addLimit === limit.length ? <>
                      {/* modal to details view */}
                      {/* You can open the modal using document.getElementById('ID').showModal() method */}
                      <button type='button' className="btn bg-[#8264FF] text-white" onClick={() => document.getElementById('my_modal_4').showModal()}>increase the limit +</button>
                      <dialog id="my_modal_4" className="modal">
                        <div className="modal-box w-11/12 max-w-2xl">
                          
                          <div className='flex items-center justify-center gap-6'>
                            <div className="block  p-6   shadow-xl space-y-2">
                              <h5 className="mb-2 text-2xl text-center font-bold tracking-tight  ">$5</h5>
                              <p className="font-normal  text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 5</span></p>
                            </div>

                            <div className="block  p-6   shadow-xl space-y-2">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight   text-center">$8</h5>
                              <p className="font-normal  text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 10</span></p>
                            </div>

                            <div className="block  p-6   shadow-xl space-y-2">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-center">$15</h5>
                              <p className="font-normal   text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 20</span></p>
                            </div>
                          </div>
                        
                          {/* select package */}
                        <div className="flex justify-center mt-10">
                            <select defaultValue="Large" className="select select-lg">
                              <option>Large Apple</option>
                              <option>Large Orange</option>
                              <option>Large Tomato</option>
                            </select>
                        </div>

                          <div className="modal-action justify-center ">
                           
                            <Link to='/payment'><button className="btn bg-[#8264FF] text-white">Payment</button></Link>
                            <form method="dialog">
                              {/* if there is a button, it will close the modal */}
                              <button className="btn bg-red-500 text-white">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </>
                      :
                      <button onClick={() => handleAddEmployee(member)} className="bg-[#8264FF] flex items-center btn gap-x-2 px-4 py-2 cursor-pointer  text-white">  Add <span className="hidden lg:block">to the</span> team  <IoMdCloudDone className="hidden lg:block"/></button>
                  }
                </td>
              </tr>)
            }

          </tbody>


        </table>

        {
          notAffiliated.length === 0 && <h2 className="text-xl text-center my-4 font-semibold">User Not found</h2>
        }
      </div>




    </div>
  );
};

export default AddEmployee;