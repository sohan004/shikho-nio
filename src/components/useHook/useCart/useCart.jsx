import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContex } from "../../AuthProvider/AuthProvider"

const useCart = () => {
    const { user } = useContext(AuthContex)
    const { refetch, data = [], isLoading } = useQuery(['selectedCart', user?.email], async () => {
        const res = await fetch(`http://localhost:5000/carts/${user?.email}`)
        const userCarts = await res.json()
        return userCarts
    }

    )
    return { data, refetch, isLoading }
}

export default useCart