import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = props =>{
    return (
        <div className="navbar">
            <div className="d-flex">
                <div className="ml-auto">
                    <Link to="/explore">Explore</Link>
                    <Link to="/search">Search</Link>
                </div>
            </div>
        </div>   
    )
}

export default Navbar