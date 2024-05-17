import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {

    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",        // relation to our very own collection user
            required: true,
            hasMany: false,
            admin: {
                condition: () => false   // to hide this field from admin dashboard
            }
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true
        },
        {
            name: "description",
            type: "textarea",
            label: "Product details",
        },
        {
            name: "price",
            label: "Price in USD",
            min: 0,
            type: "number",
            required: true
        },
        {
            name:"category",
            label: "Category",
            type:"select",
            options: PRODUCT_CATEGORIES.map(({label, value})=>({
                label, value
            })),
            required: true
        },
        {
            name: "product_files",
            label: "Product file(s)",
            type: "relationship",
            relationTo: "product_files",
            hasMany: false,
            required: true
        },
        {
            name: "approvedForSale",
            label: "Product_Status",
            type: "select",
            defaultValue: "pending",
            options: [
                {
                    label: "Pending verification",
                    value: "pending"
                },
                {
                    label: "Approved",
                    value: "approved"
                },
                {
                    label: "Denied",
                    value: "denied"
                }
            ],
            access: {
                create: ({req})=> req.user.role === "admin", 
                read: ({req})=> req.user.role === "admin", 
                update: ({req})=> req.user.role === "admin", 
            }
        },
        {
            name: "priceId",
            access: {
                create: ()=> false,
                read: ()=> false,
                update: ()=> false
            },
            type: 'text',
            admin:{
                hidden: true,
            },
        },
        {
            name: "stripeId",
            access: {
                create: ()=> false,
                read: ()=> false,
                update: ()=> false
            },
            type: 'text',
            admin:{
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Product images",
            minRows: 1,
            maxRows: 10,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images"
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true
                }
            ]
        }
    ]
}