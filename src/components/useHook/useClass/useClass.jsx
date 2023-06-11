import { useContext } from "react"
import { AuthContex } from "../../AuthProvider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../useAxios/useAxios"

const useClass = () => {
    const { user } = useContext(AuthContex)
    const axios = useAxios()
    const { refetch, data = [], isLoading } = useQuery(['instractorClasses', user?.email], async () => {
        const res = await axios.get(`/class/${user?.email}`)
        const userCarts = await res.data
        return userCarts
    }
    )
    return { data, refetch, isLoading }
}
export default useClass