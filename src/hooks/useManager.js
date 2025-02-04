import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useAxiosPublic } from "./useAxiosPublic";




 export const useManager = () => {
   const { user, loading  } = useAuth()
  const axiosPublic = useAxiosPublic()
   const { data: isManager } = useQuery({
    queryKey: [user?.email, 'isManager'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/roles/manager/${user?.email}`)
      return res.data.manager
    }
  })

   return [isManager]
};
