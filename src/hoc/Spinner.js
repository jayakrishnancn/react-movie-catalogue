import React from 'react';
import './Spinner.css'
function Spinner(props){
    if( props.type === 2 ){
        return <div className="loader">Loading...</div>     
    }
    return (
        <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>
        )
     
}

export default Spinner