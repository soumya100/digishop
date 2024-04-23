"use client"
import NavBar from '@/components/NavBar'
import React from 'react'
import { NavBarHooks } from './Hooks'

const NavBarContainer = () => {

    const {handleOpen, isOpen, isAnyOpen, handleClose}=NavBarHooks()

  return (
    <NavBar handleOpen={handleOpen} isOpen={isOpen} isAnyOpen={isAnyOpen} handleClose={handleClose}/>
  )
}

export default NavBarContainer
