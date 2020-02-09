import React from 'react';
import './CardGroup.css'
function CardGroup(props){
    return (
        <div className="card-group">
            {props.children}
        </div>
    )
}

export default CardGroup