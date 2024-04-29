import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const SignUpHooks=()=>{

    const {mutate, isLoading}= trpc.auth.createPayloadUser.useMutation({

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
        register, handleSubmit, errors, onSubmit, mutate, isLoading
    }
}