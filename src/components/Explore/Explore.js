import React,{Component} from 'react';
import Container from '../../hoc/Container'
import Card from '../Card/Card'
import CardGroup from '../../hoc/CardGroup'

class Explore extends Component {
  
    constructor(props){
        super(props);
        
        this.state = {
            movies: [],
            movieIdList: []
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
        console.log("[Explore.js] Fetch Movies")
        const movieIdList = [1]
        const movies =[{
            title: "this is a title",
            id:1,
            original_content: "this is an original content",
            coverImage: "image.jpg",
        },{
            title: "this is a title",
            id:2,
            original_content: "this is an original content",
            coverImage: "image.jpg",
        }]
        const oldMovieIdList = [...this.state.movieIdList]
        if(!this.arrayEqual(oldMovieIdList,movieIdList)){
            this.setState({movies,movieIdList})
        }

    }
    shouldComponentUpdate(newProps,newState){
        const oldMovieIdList = [...this.state.movieIdList]
        return this.state.movieIdList.length === 0 || !this.arrayEqual([oldMovieIdList],newState.movieIdList)
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
        console.log(this.state.movies,"[Explore.js] Render")
        return ( 
            <Container>
                <CardGroup>
                    { this.state.movies.map(movie =>{
                        return <Card 
                            key={movie.id}
                            title={movie.title}
                            body={movie.original_content}
                            image={movie.coverImage}
                            to={"/movie/" + movie.id}
                            />
                    })}
                </CardGroup>
            </Container>

         );
    }
}
 
export default Explore;