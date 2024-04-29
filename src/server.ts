import express from "express"
import { getPayloadClient } from "./get-payload"
import { nextApp, nextHandler } from "./next-utils"
import { apiEndPoints } from "./endpoints"
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from "./trpc"


const app = express()
const PORT = Number(process.env.PORT) || 3000

const createContext =({req, res}: trpcExpress.CreateExpressContextOptions) => ({
    req, res
})

const start = async() =>{
    const payload= await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) =>{
                cms.logger.info(`Admin URL ${cms.getAdminURL()} `)
            }
        }
    })
    
    app.use(apiEndPoints.trpc, trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })) //middleware to forward the request along with the api endpoints


    app.use((req, res)=> nextHandler(req, res)) // middleware to handle requests and responses

    nextApp.prepare().then(()=>{
        payload.logger.info('Next.js started')

        app.listen(PORT, async()=>{
            payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
        })
    })

}

start()
