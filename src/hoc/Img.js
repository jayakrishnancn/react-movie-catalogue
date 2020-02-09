import React from 'react';
import './Img.css'

function Img(props){
    const classes = props.className? props.className +" cover-img": "cover-img"
    let style
    if(props.src){
        style = {
            background: `url(${props.src}) center center no-repeat`,
            backgroundSize: 'contain'
        }
    }

    return (
        <div className={classes} style={style} alt={props.alt}> </div>
    )
}

export default Img