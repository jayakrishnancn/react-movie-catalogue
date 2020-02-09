import React from 'react'
import './Card.css'
import {Link} from 'react-router-dom'

function Card(props) {
    let More = null
    let linkTitle = props.linkTitle ? props.linkTitle: "More"
    if(props.to ){
        More  = <Link to={props.to} >{linkTitle}</Link>
    } 

    return ( 
        <div className="card">
            {props.children? props.children: (
                <div>
                    <h1>{props.title}</h1>
                    <p>{props.body}</p>
                    <div>{More}</div>
                </div> 
            )}
        </div>
        );
    
}
 
export default Card;