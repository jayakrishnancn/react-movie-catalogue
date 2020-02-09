import React, { Component } from 'react';
import Card from '../Card/Card';
import CardGroup from '../../hoc/CardGroup';
import Axios from 'axios';
import movieDb from '../util/movieDb'

class Recomandation extends Component {
    
    constructor(props){
        super(props)
        let movies = []
        this.state = {
            movies,
            fetched: false
        }
        
    }

    componentDidUpdate(){
        console.log("[Recomendation.js] Did update")
        this.fetchSimilar(this.props)
    }

    fetchSimilar = ()=>{

        if(!this.props.movieId){
            return []
        }

        Axios.get(movieDb.routes.movie+"/"+this.props.movieId + "/similar").then(res =>{

            if(this.state.movies !== res.data.results){
                this.setState({movies:res.data.results.slice(0,6),fetched:true})
            }
        })
    }
    shouldComponentUpdate(props,state){

        if(this.state.fetched){
            return false
        }

        return  this.state.movies.length === 0 || props.movieId !== this.props.movieId
    }
    
    render() { 

        console.log(this.state.movies,"render")
        if(this.state.movies.length==0){
            return null
        }                            
        return ( 

            <div className="recomandation" style={{maxWidth:'900px',margin:'auto',marginTop:'40px'}}>
                <h3>Top Recomandation for {this.props.title}</h3>
                <CardGroup>
                    { this.state.movies.map(movie =>{
                             return <Card
                             key={movie.id}
                             id={movie.id}
                             title={movie.title}
                             body={movie.overview.length > 80 ? movie.overview.slice(0, 80) + "..." : movie.overview}
                             image={movie.coverImage}
                             to={"/movie/"+movie.id}
                         />
                    })}
                </CardGroup>
            </div> 
        );
    }
}
 
export default Recomandation;