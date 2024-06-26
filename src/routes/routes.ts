export const pathName={
    //landing routes
    landingPage:'/',

    // auth routes
    signIn:'/sign-in',
    signUp: '/sign-up',
    verifyEmail: '/verify-email',

    //product routes
    products: '/products',
    cart: '/cart',
    singleProduct: (id: string)=> `/product/${id}` ,

    //seller router
    seller:'/sell',
    sellerQuery: 'seller'
}