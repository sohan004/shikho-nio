import { useQuery } from "@tanstack/react-query"
import useAxios from "../useAxios/useAxios"

const useAllClass = () => {
    const axios = useAxios()
    const { refetch, data = [], isLoading } = useQuery(['allClass'], async () => {
        const res = await axios.get(`https://assignment-12-server-seven-virid.vercel.app/class`)
        const userCarts = await res.data
        return userCarts
    }
    )
    return { data, refetch, isLoading }
}

export default useAllClass