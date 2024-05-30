'use client'
import { Button } from '@/components/ui/button'
import { pathName } from '@/routes/routes'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {

    const router = useRouter()

    return (
        <section className="bg-white h-[91vh] px-[40px] page-404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center text-slate-800">404</h1>
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Look like you&apos;re lost
                                </h3>

                                <p>the page you are looking for not avaible!</p>

                                <Button className="link_404" onClick={()=>router.push(pathName.landingPage)}>Go to Home</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound
