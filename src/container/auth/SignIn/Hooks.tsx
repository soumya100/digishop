import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { pathName } from "@/routes/routes"
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const SignInHooks = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isSeller = searchParams.get('as') === 'seller' //checking if the signed in user is seller or not

    const origin = searchParams.get('origin') /** getting the origin to redirect from cart to 
         sign in so that only authenticated user can access the cart
     */


    const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
        onSuccess: () => {
            toast.success("Signed in successfully")

            if (origin) {
                router.push(`/${origin}`)
                return
            }

            if (isSeller) {
                router.push(pathName.seller)
                return
            }

            router.push(pathName.landingPage)
            router.refresh()
        },
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') {
                toast.error("Invalid error or password.")
            }
        }
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TAuthCredentialsValidator>(
        {
            resolver: zodResolver(AuthCredentialsValidator),
        }
    )

    //handle continue as seller
    const handleContinueAsSeller = () => {
        router.push(`?as=${pathName.sellerQuery}`)
    }

    //handle continue as buyer
    const handleContinueAsBuyer = () => {
        router.replace(pathName.signIn, undefined)
    }


    //on submit function for signUP
    const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
        signIn({ email, password })
        reset()
    }
    return {
        register, handleSubmit, errors, onSubmit, isLoading, isSeller, handleContinueAsBuyer, handleContinueAsSeller
    }
}