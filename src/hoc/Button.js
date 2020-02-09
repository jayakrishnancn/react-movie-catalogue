import React from 'react';
import './Button.css'
function Button(props){
    const clickHandler = props.click
    const className = props.className? 'btn ' + props.className: 'btn' 

    return <button className={className} onClick={clickHandler} > {props.children}</button>

}

export default Button;