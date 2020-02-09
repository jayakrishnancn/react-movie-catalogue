import React, { Component } from 'react';
import Container from '../../hoc/Container';
import Card from '../Card/Card';
import Button from '../../hoc/Button';
import axios from 'axios';
import firebaseAxios from '../util/firebaseAxios';
import movieDb,{ firebase } from '../util/movieDb'
import Img from '../../hoc/Img';
import Spinner from '../../hoc/Spinner';

class MovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { movie: {}, loading: true , isfevorate: null, isfevorateLoading: false}
    }

    shouldComponentUpdate(newProps, newState) {
        console.log("[MovieDetails.js] should render")
        return !newState.movie.title || newState.movie.title !== this.state.movie.title ||
        newState.isfevorate !== this.state.isfevorate || this.state.isfevorateLoading !== newState.isfevorateLoading
    }

    componentDidMount() {
        this.fetchMovie()
    }

    fetchMovie = () => {
        if (!this.props.match.params.id) {
            return
        }

        axios.get(movieDb.routes.movie + "/" + this.props.match.params.id)
            .then(res => {
                const movie = res.data
                this.setState({ movie, loading: false })
                return movie.id
            })
            .then(movieId =>{
                firebaseAxios.get(firebase.fevorate).then(res =>{
                    for(let key in res.data){
                        if ( res.data[key] === this.state.movie.id ){
                            this.setState({isfevorate:key,isfevorateLoading:false})
                            return
                        }
                    }

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
        const title = this.state.movie.title;
        const body = this.state.movie.overview
        const posterPath = this.state.movie.poster_path ? movieDb.IMG_BASEPATH + this.state.movie.poster_path : null;
        const poster = <Img src={posterPath} alt={title} />
        const fevorate = !this.state.isfevorateLoading? (
            <div onClick={this.toggleFevorateHandler} 
                className={this.state.isfevorate?"active star badge" : 'star badge'}
                >&#9734;</div>
        ) :  (
            <div 
                className={this.state.isfevorate?"active star badge" : 'star badge'}
                ><Spinner type='2'/></div>
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
            </Container >
        );
    }
}

export default MovieDetails;