import { useContext } from "react"
import { AuthContex } from "../../AuthProvider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../useAxios/useAxios"

const useRole = () => {
    const { user } = useContext(AuthContex)
    const axios = useAxios()
    const { refetch, data = {}, isLoading } = useQuery(['role', user?.email], async () => {
        const res = await axios.get(`/role?email=${user?.email}`)
        const userCarts = await res.data
        return userCarts
    }

    )
    return { data, refetch, isLoading }
}
export default useRole