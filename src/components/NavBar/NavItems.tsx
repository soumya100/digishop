'use client'
import { PRODUCT_CATEGORIES, productCategories } from "@/config"
import { cn } from "@/lib/utils"
import { FC, useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"



const NavItems =()=>{
  const [activeIndex, setActiveIndex]=useState<null | number>(null)
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            setActiveIndex(null)
          }
        }
        document.addEventListener('keydown', handler)

        return () => {
          document.removeEventListener('keydown', handler)
        }
      }, [])

      const navRef = useRef<HTMLDivElement | null>(null)

      useOnClickOutside(navRef, ()=> setActiveIndex(null))
      //active index 
      const handleOpen = (idx: number)=>{
          if(activeIndex === idx){
              setActiveIndex(null)
          }else{
              setActiveIndex(idx)
          }
      }
  
      //checking for open
      const isAnyOpen = activeIndex !== null
  
      //checking if open
      const isOpen= (idx: number)=>{
          return idx === activeIndex
      }
  
    
 return (
    <div className={cn('flex gap-4 h-full ')} ref={navRef}>
        {
            PRODUCT_CATEGORIES.map((category: productCategories, idx: number)=>{
                return (
                    <NavItem key={category.value} category={category} 
                    handleOpen={()=>{handleOpen(idx)}} isOpen={isOpen(idx)} isAnyOpen={isAnyOpen}
                    close={()=>setActiveIndex(null)}
                    />
                )
            })
        }
    </div>
 )
}

export default NavItems