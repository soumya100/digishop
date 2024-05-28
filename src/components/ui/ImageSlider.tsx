'use client'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper'
import { Pagination } from 'swiper/modules'
import "swiper/css"
import "swiper/css/pagination"
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageSliderProps {
    urls: string[]
}

const ImageSlider: FC<ImageSliderProps> = ({ urls }) => {

    const [swiper, setSwiper] = useState<null | SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [slideConfig, setSlideConfig] = useState({
        isBeginning: true,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
    })

    useEffect(() => {
        swiper?.on("slideChange", ({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === (urls.length ?? 0) - 1
            })
        })
    }, [swiper, urls])

    const activeStyles = "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300"
    const inActiveStyles = "hidden text-gray-400"

    return <div className='group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl'>
        <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
            <button className={cn(activeStyles, "left-3 transition-all", {
                [inActiveStyles]: slideConfig.isBeginning,
                "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isBeginning
            })} 
            onClick={(e)=>{
                e.preventDefault()
                swiper?.slidePrev()
            }}
            aria-label='previous-image'>
                <ChevronLeft className='h-4 w-4 text-zinc-700'/>{' '}
            </button>
            <button className={cn(activeStyles, "right-3 transition-all", {
                [inActiveStyles]: slideConfig.isEnd,
                "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isEnd
            })} 
            onClick={(e)=>{
                e.preventDefault()
                swiper?.slideNext()
            }}
            aria-label='next-image'>
                <ChevronRight className='h-4 w-4 text-zinc-700'/>{' '}
            </button>
        </div>
        <Swiper
        pagination={{
            renderBullet:(_, className)=>{
                return `<span class="rounded-full transition ${className}"></span>`
            }
        }}
         onSwiper={(swiper) => setSwiper(swiper)}
            spaceBetween={50}
            slidesPerView={1}
            modules={[Pagination]}
            className='h-full w-full'>
            {urls.map((url, idx) => (
                <SwiperSlide key={idx} className='-z-10 relative h-full w-full'>
                    <Image fill loading='eager' className='-z-10 h-full w-full object-cover object-center'
                        src={url}
                        alt='Product Image'
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
}

export default ImageSlider