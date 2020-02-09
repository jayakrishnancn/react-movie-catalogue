import React, { Component } from 'react';
import Container from '../../hoc/Container';
import Card from '../Card/Card';


class MovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { movie: {} }
    }

    shouldComponentUpdate(newProps,newState){
        console.log("[MovieDetails.js] should render")
        return !newState.movie.title || newState.movie.title != this.state.movie.title
    }

    componentDidMount(){
        this.fetchMovie()
    }

    fetchMovie = ()=>{
        const id = this.props.match.params.id
        console.log(`Fetching movie with id ${id} `)
        const movie  = {
            title: "movie with id "+id,
            body : "body with id "+ id,
            id
        }
        this.setState({movie})
    }

    render() { 
        const title = this.state.movie.title;
        const body = this.state.movie.body
        return ( 
            <Container>
                <div  style={{maxWidth:"650px",margin:'auto'}}>
                <Card title={title} body={body} />
            </div>
            </Container>
         );
    }
}
 
export default MovieDetails;