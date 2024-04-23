import { useEffect, useRef, useState } from "react"

export const NavBarHooks = () =>{

    const [activeIndex, setActiveIndex]=useState<null | number>(null)
    

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

    //handle close
    const handleClose = ()=>{
        setActiveIndex(null)
    }

    return{
        handleOpen,
        isOpen,
        isAnyOpen,
        handleClose
    }
}