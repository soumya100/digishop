"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathName = void 0;
exports.pathName = {
    //landing routes
    landingPage: '/',
    // auth routes
    signIn: '/sign-in',
    signUp: '/sign-up',
    verifyEmail: '/verify-email',
    //product routes
    products: '/products',
    cart: '/cart',
    singleProduct: function (id) { return "/product/".concat(id); },
    //seller router
    seller: '/sell',
    sellerQuery: 'seller'
};
