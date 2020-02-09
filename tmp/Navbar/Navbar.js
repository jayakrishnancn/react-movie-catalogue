import React from 'react'
import {Link} from 'react-router-dom'


function Navbar() {
    return (
        <nav className="Navbar">
            <ul>
                Movie Catalogue
            </ul>
            <ul>    
                <li><Link to={{pathname:'/explore'}}>Explore</Link></li>
                <li><Link to={{pathname:'search'}}>Search</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;