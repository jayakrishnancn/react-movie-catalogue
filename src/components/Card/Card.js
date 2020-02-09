import React from 'react'
import './Card.css'
import {Link} from 'react-router-dom'
import Wrapper from '../../hoc/Wrapper'

function Card(props) {
    let More = null
    let linkTitle = props.linkTitle ? props.linkTitle: "More"
    if(props.to ){
        More  = <Link className="btn success ml-auto" to={props.to} >{linkTitle}</Link>
    } 

    return ( 
        <div className={props.className? "card " + props.className :'card' }>
        {props.children? props.children: (
                <Wrapper>
                    <strong>{props.title}</strong>
                    <p>{props.body}</p>
                    {More}
                </Wrapper> 
            )}
        </div>
        );
    
}
 
export default Card;