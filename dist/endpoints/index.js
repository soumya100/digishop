"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiEndPoints = void 0;
var envLink = "".concat(process.env.NEXT_PUBLIC_SERVER_URL);
exports.apiEndPoints = {
    trpc: '/api/trpc',
    //users api
    me: "".concat(envLink, "/api/users/me"),
    //auth api
    logout: "".concat(envLink, "/api/users/logout")
};
