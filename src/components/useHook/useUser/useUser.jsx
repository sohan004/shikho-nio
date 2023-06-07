import { useQuery } from "@tanstack/react-query"

const useUser = () => {
    const { refetch, data = [] } = useQuery(['users'], async () => {
        const res = await fetch(`http://localhost:5000/users`)
        const userCarts = await res.json()
        return userCarts
    }

    )
    return { data, refetch }
}
export default useUser