import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useAxiosPublic } from "./useAxiosPublic";



export const useEmployee = () => {
  const { user, loading } = useAuth()
  const axiosPublic = useAxiosPublic()
  const { data: isEmployee } = useQuery({
    queryKey: [user?.email, 'isEmployee'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/roles/employee/${user?.email}`)
      return res.data.employee
    }
  })

  return [isEmployee]
};
