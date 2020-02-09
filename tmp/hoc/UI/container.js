import React from 'react'
import './container.css'
let Container = (params) => {
    return (
        <div className="container">
            {params.children}
        </div>
    )
}
export default Container