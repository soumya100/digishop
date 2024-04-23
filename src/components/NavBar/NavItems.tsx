import { PRODUCT_CATEGORIES, productCategories } from "@/config"
import { cn } from "@/lib/utils"
import { FC, useEffect, useRef } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

interface NavItemsProps {
    handleOpen(idx: number): void
    isOpen(idx: number):boolean
    isAnyOpen: boolean
    handleClose(): void
}


const NavItems: FC<NavItemsProps> =({handleOpen, isOpen, isAnyOpen, handleClose})=>{
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            handleClose()
          }
        }
        document.addEventListener('keydown', handler)

        return () => {
          document.removeEventListener('keydown', handler)
        }
      }, [])

      const navRef = useRef<HTMLDivElement | null>(null)

      useOnClickOutside(navRef, handleClose)
    
    
 return (
    <div className={cn('flex gap-4 h-full ')} ref={navRef}>
        {
            PRODUCT_CATEGORIES.map((category: productCategories, idx: number)=>{
                return (
                    <NavItem key={category.value} category={category} 
                    handleOpen={()=>{handleOpen(idx)}} isOpen={isOpen(idx)} isAnyOpen={isAnyOpen}
                    close={handleClose}
                    />
                )
            })
        }
    </div>
 )
}

export default NavItems