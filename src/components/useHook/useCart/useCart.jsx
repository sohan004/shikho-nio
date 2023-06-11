import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContex } from "../../AuthProvider/AuthProvider"
import useAxios from "../useAxios/useAxios"

const useCart = () => {
    const { user } = useContext(AuthContex)
    const axios = useAxios()
    const { refetch, data = [], isLoading } = useQuery(['selectedCart', user?.email], async () => {
        const res = await axios.get(`/carts/${user?.email}`)
        const userCarts = await res.data
        return userCarts
    }

    )
    return { data, refetch, isLoading }
}

export default useCart