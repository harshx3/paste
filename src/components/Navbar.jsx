import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex flex-row gap-4 place-content-evenly bg-zinc-800 py-3 text-white  uppercase font-sans font-semibold'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-red-300' : ''} >
                Home
            </NavLink>
            <NavLink to="/pastes" className={({ isActive }) => isActive ? 'text-red-300' : ''} >
                Pastes
            </NavLink>
        </div>
    )
}

export default Navbar