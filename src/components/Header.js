import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <header>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/full">Entries</NavLink>
    </header>
)

export default Header
