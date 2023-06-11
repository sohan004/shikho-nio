import { useQuery } from "@tanstack/react-query"
import useAxios from "../useAxios/useAxios"

const useUser = () => {
    const axios = useAxios()
    const { refetch, data = [] } = useQuery(['users'], async () => {
        const res = await axios.get(`/users`)
        const userCarts = await res.data
        return userCarts
    }

    )
    return { data, refetch }
}
export default useUser