import React, { Component } from 'react';
import Container from '../../hoc/Container'
import Card from '../Card/Card'
import CardGroup from '../../hoc/CardGroup'
import axios from 'axios';
import firebaseAxios from '../util/firebaseAxios';
import { firebase } from '../util/movieDb';
import Spinner from '../../hoc/Spinner';

class Explore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            movieIdList: [],
            loading: true,
            fevorateMovies: [],
            error: null
        }

    }

    cardClickHandler = () => {
        console.log('cardClickHandler')
    }

    componentDidMount() {
        console.log("[Explore.js] Did Mount")
        this.fetchMovies()
    }

    fetchMovies = () => {
        const id = this.props.match.params.id
        let api = null

        switch (id) {
            case "top": api = "movie/top_rated?"; break;
            case "now-playing": api = "/movie/now_playing"; break;
            case "popular": api = "/movie/popular"; break;
            case "upcoming": api = "/movie/upcoming"; break;
            default: api="/movies/"
        }
        if (!api) {
            return
        }

        axios.get(api).then(res => {

            const movies = res.data.results

            const movieIdList = movies.map(movie => movie.id)
            const oldMovieIdList = [...this.state.movieIdList]

            if (!this.arrayEqual(oldMovieIdList, movieIdList)) {
                this.setState({ movies, movieIdList })

            }
            return res

        })
            .then(res => {
                console.log("[Explore.js] fireabase get after moviefb Fetch")
                firebaseAxios.get(firebase.fevorate)
                    .then(firebaseRes => {
                        this.setState({ fevorateMovies: Object.values(firebaseRes.data), loading: false })
                    })
            })
            .catch(err =>{
                console.log(err)
                this.setState({loading:false,error:err})
            })

    }

    arrayEqual(a, b) {
        if (a.length === b.length) {
            a.forEach(aItem => {
                if (b.indexOf(aItem) === -1) {
                    return false
                }
            })
            return true
        }

        return false;
    }
    setFevorateHandler = (id) =>{
        console.log('id',id)
    }

    render() {
        if(this.state.error){
            return <div className="error">{this.state.error.message}</div>
        }

        if (!this.state.loading) {
            console.log(this.state.movies, "[Explore.js] Render")
            
            return (
                <Container>
                    <CardGroup>
                        {this.state.movies.map(movie => {
                            const isfevorateMovie = this.state.fevorateMovies.indexOf(movie.id) !== -1
                            return <Card
                                key={movie.id}
                                id={movie.id}
                                setFevorate={this.setFevorateHandler}
                                title={movie.title}
                                body={movie.overview.length > 80 ? movie.overview.slice(0, 80) + "..." : movie.overview}
                                image={movie.coverImage}
                                isfevorate={isfevorateMovie}
                                to={"/movie/" + movie.id}
                            />
                        })}
                    </CardGroup>
                </Container>

            );
        }
        return <Container><Spinner /></Container>
    }
}

export default Explore;