import { trpc } from "@/trpc/client"
import { useState } from "react"

export const VerifyEmailHooks = ()=>{

    const [token, setToken]=useState<string>('')
    const getToken=(token: string)=>{
        setToken(token)
    }
    //verify email functionality
    const {data, isLoading, isError}= trpc.auth.verifyEmail.useQuery({
        token
    })


    return {
        getToken, isError, isLoading, data
    }
}
