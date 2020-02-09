import React, { Component } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import Wrapper from '../../hoc/Wrapper'

class Card extends Component {
    
    render() {
        let More = null
        let linkTitle = this.props.linkTitle ? this.props.linkTitle : "More"
        if (this.props.to) {
            More = <Link className="btn success ml-auto" to={this.props.to} >{linkTitle}</Link>
        }
        const className = this.props.className ? "card " + this.props.className : 'card'
        const fevorate = this.props.isfevorate ? (
            <div className="badge mini-star">&#9733;</div>            
            ):null
        return (
            <div className={className}>
                {fevorate}
                {this.props.children ? this.props.children : (
                    <Wrapper>
                        <strong>{this.props.title}</strong>
                        <p>{this.props.body}</p>
                        {More}
                    </Wrapper>
                )}
            </div>
        );
    }
}

export default Card;