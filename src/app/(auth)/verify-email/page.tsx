import VerifyEmailContainer from "@/container/auth/VerifyEmail"

export interface PageProps{
    searchParams:{[key: string]: string | string[] | undefined}
}

const verifyEmailPage = ({searchParams}: PageProps)=>{
 return <VerifyEmailContainer searchParams={searchParams} />
}

export default verifyEmailPage