import { useContext } from "react"
import { AuthContex } from "../../AuthProvider/AuthProvider"
import { useQuery } from "@tanstack/react-query"

const useRole = () => {
    const { user } = useContext(AuthContex)
    const { refetch, data = {}, isLoading } = useQuery(['role', user?.email], async () => {
        const res = await fetch(`http://localhost:5000/role?email=${user?.email}`)
        const userCarts = await res.json()
        return userCarts
    }

    )
    return { data, refetch, isLoading }
}
export default useRole