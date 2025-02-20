import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import NavBar from "../shared/NavBar";


const Profile = () => {
  const { user, updatedUser } = useAuth()
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.name.value
    
    updatedUser(name)
      .then(res => {
        Swal.fire("Updated Successfull");
      }).catch(err => {
     
    })
  }
  return (
    <div>

      <Helmet>
        <title>Asset Management | Profile</title>
      </Helmet>
      <div>
        <NavBar/>
      </div>
  <div className="mt-18">
        <div className="bg-black py-20 my-10">
          <h2 className="text-white text-5xl text-center">Your Profile</h2>
        </div>
  
        {/* update user */}
        <div className="flex flex-col justify-center items-center gap-y-4 my-20">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Update your name</legend>
              <input type="text" defaultValue={user?.displayName} name="name" className="input py-6 w-72 md:w-96" placeholder="Enter Updated Name" />
            
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">your Email</legend>
              <input type="text" defaultValue={user?.email} readOnly className="input  py-6 w-72 md:w-96" placeholder="your mail" />
            
            </fieldset>
            <div className='mt-4'>
              <button className='bg-[#8264FF] text-white py-3 px-6 text-xl w-72 md:w-96 cursor-pointer'>Update Profile</button>
            </div>
        </form>
        </div>
  </div>
    </div>
  );
};

export default Profile;