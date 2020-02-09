import React, { Component } from 'react'
import { Route } from 'react-router-dom'
class Explore extends Component{
    render(){
        return (
            <div>
                <Link to="/explore/top10" exact >Top 10</Link>
            </div>
        );
    }
}

export default Explore