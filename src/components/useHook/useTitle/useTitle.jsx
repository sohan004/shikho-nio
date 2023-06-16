import { useEffect } from "react"

const useTitle = t => {
    useEffect(() => {
        document.title = `SHIKHO NIO | ${t.toUpperCase()}`
    }, [])
}

export default useTitle