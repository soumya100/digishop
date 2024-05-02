import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { pathName } from "@/routes/routes"
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {toast} from "sonner"
import { ZodError } from "zod"

export const SignUpHooks=()=>{

    const router= useRouter()

    const {mutate, isLoading}= trpc.auth.createPayloadUser.useMutation({
        onError: (err)=>{
            if(err.data?.code === 'CONFLICT'){
                toast.error("This email is already taken. Please sign in instead!")
                router.push(pathName.signIn)
                return
            }
            if(err instanceof ZodError){
                toast.error(err.issues[0].message)
                return
            }
            toast.error('Something went wrong...')
        },
        onSuccess: ({sentToEmail})=>{
            toast.success(`Verification email sent to ${sentToEmail}.`)
            router.push(`${pathName.verifyEmail}?to=${sentToEmail}`)
        }
    })
    

    const {register, handleSubmit, formState: {errors}, reset}=useForm<TAuthCredentialsValidator>(
        {
            resolver: zodResolver(AuthCredentialsValidator),
        }
    )

    //on submit function for signUP
    const onSubmit=({email, password}: TAuthCredentialsValidator)=>{
        mutate({email, password})
        reset()
    }


    return {
        register, handleSubmit, errors, onSubmit, isLoading
    }
}