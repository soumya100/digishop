import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return `<p>Please verify your email...
                This is an auto generated mail, Please don't reply to this email...
                If you have any queries related to Us, Please send a mail to....
                digishop415@gmail.com
                </p>`
            }
        }
        
    },
    access:{
        read: ()=> true,
        create:()=> true
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
}