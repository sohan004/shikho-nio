import { useQuery } from "@tanstack/react-query"

const useAllClass = () => {
    const { refetch, data = [], isLoading } = useQuery(['allClass'], async () => {
        const res = await fetch(`http://localhost:5000/class`)
        const userCarts = await res.json()
        return userCarts
    }
    )
    return { data, refetch, isLoading }
}

export default useAllClass