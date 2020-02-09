import React, { PureComponent } from 'react'
import * as movieApi from '../util/TheMovieDb'
import Result from '../Result/Result'
import Filter,{BaseFilter,LanguageFilter,RatingFilter,ReleaseDateFilter} from '../Filter/Filter'
import './Search.css'

class Search extends PureComponent {
    
    state = {
        movies: [],
        filteredMovies : [],
        defaultFilterValues : {}
    }
    
    RatingFilter = new RatingFilter()
    LanguageFilter = new LanguageFilter()
    ReleaseDateFilter = new ReleaseDateFilter()


    componentDidMount() {
        console.log("[Saerch js] did mount")
        let movies = movieApi.getTopRated()
        let languages = [];
        let releaseDates = [] 
        
        for(let movie of movies){
            let date = new Date(movie.release_date).getFullYear()
            if(releaseDates.indexOf(date) === -1){
                releaseDates.push(date)
            }
            if(languages.indexOf(movie.original_language) === -1){
                languages.push(movie.original_language)
            }
        }

        let defaultFilterValues = {
            languages: languages.sort(),
            ratings : [1,2,3,4,5,6,7,8,9,10],
            releaseDates: releaseDates.sort()
        }
         
        this.setState({
            movies,
            filteredMovies: movies,
            defaultFilterValues
        })

    } 

    applyKey = (filterKey,key) =>{
        if(filterKey && key){
            filterKey.addKeys(key)
        }

        let filteredMovies = [... this.state.movies]
        for(let filterName of BaseFilter.filterNames){
            filteredMovies = this[filterName].filter(filteredMovies)
        }
        this.setState({filteredMovies})

    }

    render() {  

        let defaultValues = this.state.defaultFilterValues || {}
        let languages = defaultValues.languages || []
        let ratings = defaultValues.ratings || []
        let releaseDates = defaultValues.releaseDates || []

        return (
            <div className="search">

                <div className="filter-container">
                    <h3>Filters</h3>

                    <b> Languages </b>
                    <Filter filterData={ {Filter:this.LanguageFilter,filterKeys:languages,applyKey:this.applyKey} }/>
                    <b> Rating </b>
                    <Filter filterData={ {Filter:this.RatingFilter,filterKeys:ratings,applyKey:this.applyKey} }/>
                    <b> Release Year </b>
                    <Filter filterData={ {Filter:this.ReleaseDateFilter,filterKeys:releaseDates,applyKey:this.applyKey} }/>

                </div>

                

                <div className="search-result">
                    {this.state.filteredMovies.map((movie, index) => {
                        return <Result key={index} movie={movie} />
                    })}
                </div>
            </div>
        )
    }
}

export default Search;