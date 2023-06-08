import { useContext } from "react"
import { AuthContex } from "../../AuthProvider/AuthProvider"
import { useQuery } from "@tanstack/react-query"

const useClass = () => {
    const { user } = useContext(AuthContex)
    const { refetch, data = [], isLoading } = useQuery(['instractorClasses', user?.email], async () => {
        const res = await fetch(`http://localhost:5000/class/${user?.email}`)
        const userCarts = await res.json()
        return userCarts
    }
    )
    return { data, refetch, isLoading }
}
export default useClass