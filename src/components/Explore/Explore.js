import React,{Component} from 'react';
import Container from '../../hoc/Container'
import Card from '../Card/Card'
import CardGroup from '../../hoc/CardGroup'
import axios from 'axios';
import Spinner from '../../hoc/Spinner';

class Explore extends Component {
  
    constructor(props){
        super(props);
        
        this.state = {
            movies: [],
            movieIdList: [],
            loading: true
        }
        
    }

    cardClickHandler = ()=>{
        console.log('cardClickHandler')
    }

    componentDidMount(){
        console.log("[Explore.js] Did Mount")
        this.fetchMovies()
    }

    fetchMovies = ()=>{
        const id = this.props.match.params.id
        let api = null

        switch(id){
            default :
            case "top" : api = "movie/top_rated?";break; 
            case "new" : api = "/new";break; 
        }
        if(!api){
            return 
        }
        
        axios.get(api).then(res => {

            const movies = res.data.results

            const movieIdList = movies.map(movie=>movie.id)
            const oldMovieIdList = [...this.state.movieIdList]

            if(!this.arrayEqual(oldMovieIdList,movieIdList)){
                this.setState({movies,movieIdList,loading:false})
                
            }
    
        })

    } 

    arrayEqual(a,b){
        if(a.length === b.length){
            a.forEach(aItem=>{
                if(b.indexOf(aItem) === -1){
                    return false
                }
            })
            return true
        }

        return false;
    }

    render() { 
        if(!this.state.loading){
            console.log(this.state.movies,"[Explore.js] Render")
            return ( 
                <Container>
                    <CardGroup>
                        { this.state.movies.map(movie =>{
                            return <Card 
                                key={movie.id}
                                title={movie.title}
                                body={ movie.overview.length > 80 ? movie.overview.slice(0,80) + "..." : movie.overview}
                                image={movie.coverImage}
                                to={"/movie/" + movie.id}
                                />
                        })}
                    </CardGroup>
                </Container>

            );
        }
        return <Container><Spinner/></Container>
    }
}
 
export default Explore;