import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"

export const SignUpHooks=()=>{

    

    const {register, handleSubmit, formState: {errors}}=useForm<TAuthCredentialsValidator>(
        {
            resolver: zodResolver(AuthCredentialsValidator),
        }
    )

    //on submit function for signUP
    const onSubmit=({email, password}: TAuthCredentialsValidator)=>{
        console.log(email, 'email')
        console.log(password, 'password')
    }

    return {
        register, handleSubmit, errors, onSubmit 
    }
}