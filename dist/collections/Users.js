"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var routes_1 = require("../routes/routes");
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<p>Please verify your email...\n                To verify your account <a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/").concat(routes_1.pathName.verifyEmail, "?token=").concat(token, "'>click here</a>\n                This is an auto generated mail, Please don't reply to this email...\n                If you have any queries related to Us, Please send a mail to....\n                digishop415@gmail.com\n                </p>");
            }
        }
    },
    access: {
        read: function () { return true; },
        create: function () { return true; }
    },
    fields: [
        {
            name: 'role',
            defaultValue: "user",
            required: true,
            type: 'select',
            options: [
                {
                    label: "Admin",
                    value: "admin"
                },
                {
                    label: 'User',
                    value: 'user'
                }
            ]
        }
    ]
};
