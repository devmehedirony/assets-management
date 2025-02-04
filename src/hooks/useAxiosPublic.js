import axios from "axios";


const axiosPublic = axios.create({
  baseURL: 'https://asset-management-server-blue.vercel.app'
})

 export const useAxiosPublic = () => {
  return axiosPublic
};

