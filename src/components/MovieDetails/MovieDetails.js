import React, { Component } from 'react';
import Container from '../../hoc/Container';
import Card from '../Card/Card';
import Button from '../../hoc/Button';
import axios from 'axios';
import firebaseAxios from '../util/firebaseAxios';
import movieDb,{ firebase } from '../util/movieDb'
import Img from '../../hoc/Img';
import Spinner from '../../hoc/Spinner';
import Rating from '../Rating/Rating';
import Recomandation from '../Recomandation/Recomandation';

class MovieDetails extends Component {

    constructor(props) {
        super(props);
        console.log("[MovieDetails.js] constructor")
        this.state = { 
            movie: {}, 
            loading: true , 
            isfevorate: null, 
            isfevorateLoading: true
        }
    }

    shouldComponentUpdate(newProps, newState) {
        console.log("[MovieDetails.js] should update")
        const id = newProps.match.params.id
        console.log(id)
        console.log(this.state.movie.id)
        
        if(!this.state.movie.id){
            return true
        }
        return  this.state.loading || this.state.movie.id != newState.movie.id || this.state.isfevorateLoading || newProps.match.params.id +"" !== this.state.movie.id +"" 
    }
    componentDidUpdate(prevProp,prevState){
        console.log("[MovieDetails.js] did update")
        this.fetchMovie()
    }

    componentDidMount() {
        console.log("[MovieDetails.js] did mount")
        this.fetchMovie()
    }

    fetchMovie = () => {
        console.log("[MovieDetails.js] fetchMovie")
        const id = this.props.match.params.id
        if (!id) {
            return
        }

        if(id == this.state.movie.id){
            return 
        }

        axios.get(movieDb.routes.movie + "/" + id)
            .then(res => {
                const movie = res.data
                this.setState({ movie, loading: false })
                return movie.id
            })
            .then(movieId =>{
                firebaseAxios.get(firebase.fevorate).then(res =>{
                    console.log("[MovieDetails.js] fetching fevorat from firebase",this.state.isfevorateLoading)
                    for(let key in res.data){
                        if ( res.data[key] === this.state.movie.id ){
                            this.setState({isfevorate:key,isfevorateLoading:false})
                            return
                        }
                    }
                    this.setState({isfevorateLoading:false})
                    return 
                })
            })
    }

    addFevorate= (id)=>{
        console.log(`adding ${id} to Fevorate`)
        firebaseAxios.post(firebase.fevorate,id).then(res =>{
            console.log("fireabase post ",res)
            if(res.data){
                this.setState({isfevorate:res.data.name,isfevorateLoading:false})
            }
        })
    }
    removeFevorate = (id) =>{

        firebaseAxios.delete(firebase.fevorate_+"/"+this.state.isfevorate+firebase.ext).then(res=>{
            console.log(res,"delete fev")
            this.setState({isfevorate:(res.data ? res.data.name || null : null),isfevorateLoading:false})
        })
        

    }

    toggleFevorateHandler = ()=>{
        this.setState({isfevorateLoading:true})
        const id = this.state.movie.id
        if(!id){
            console.error("cant find movie id")
            return
        }

        if(this.state.isfevorate){
            this.removeFevorate(id)
        }else{
            this.addFevorate(id)
        }
    }
    render() {
        console.log("[MovieDetails.js] render")
        const title = this.state.movie.title;
        const id = this.state.movie.id
        const body = this.state.movie.overview
        const posterPath = this.state.movie.poster_path ? movieDb.IMG_BASEPATH + this.state.movie.poster_path : null;
        const poster = <Img src={posterPath} alt={title} />
        const fevorate = ( <Rating
                            click={this.toggleFevorateHandler} 
                            loading={this.state.isfevorateLoading}
                            isActive={this.state.isfevorate}
                            >&#9733;</Rating>
                        )   
        return (
            <Container>

                <div style={{ maxWidth: "550px", margin: 'auto' }}>

                    {this.state.loading ? <Spinner /> : (
                        <Card className="p-0" >
                            { this.state.movie.adult ? (
                                <div className="badge danger">18+</div>
                            ) : null }
                            {fevorate}
                            {poster}
                            <div  style={{padding:'0 1rem'}} className='card-title' > {title}</div>
                            <p style={{padding:'0 1rem'}}>{body}</p>
                            <div className="card-footer d-flex">
                                <div className="rating">{this.state.movie.vote_average}</div>
                                <div className="back ml-auto">
                                    <Button click={this.props.history.goBack}>Back</Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
                <Recomandation movieId={id} title={title}/>
            </Container >
        );
    }
}

export default MovieDetails;