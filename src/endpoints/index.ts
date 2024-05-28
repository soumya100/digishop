const envLink= `${process.env.NEXT_PUBLIC_SERVER_URL}`
export const apiEndPoints={
    trpc: '/api/trpc',
    
    //users api
    me: `${envLink}/api/users/me`,

    //auth api
    logout: `${envLink}/api/users/logout`
}