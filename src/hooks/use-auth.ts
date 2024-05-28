import { toast } from "sonner"
import { apiEndPoints } from "../endpoints"
import { useRouter } from "next/navigation"
import { pathName } from "../routes/routes"

export const useAuth = () => {

    const router = useRouter()

    const signOut = async () => {
        try {
            const res = await fetch(`${apiEndPoints.logout}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": 'application/json',
                }
            })
            if (!res.ok) throw new Error()
            toast.success('Signed out successfully.')
            router.push(pathName.signIn)
            router.refresh()
        } catch (error) {
            toast.error("Couldn't sign out, please try again.")
        }
    }
    return {
        signOut
    }
}