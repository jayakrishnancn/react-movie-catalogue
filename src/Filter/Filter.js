import React,{ Component } from "react"

export class BaseFilter{
   
    static filterNames = []
    static count = 0 
    keys = []
    constructor(){
        (this.constructor).addName(this.constructor.name)
    }
    static addName(className){
        
        if(this.filterNames.indexOf(className) === -1){
            this.filterNames.push(className)
        }
    }

    hasKey = key => {
        return this.keys.indexOf(key) != -1
    }
    claer = () =>{
        this.keys = []
    }    
    addKeys = key =>{
        if(this.keys.indexOf(key)==-1){
            this.keys.push(key);
        }
        else{
            this.keys = this.keys.filter(i => i!= key)
        }
    }
    filter = movies => movies
}

export  class LanguageFilter extends BaseFilter{
    filter = movies =>{
        
        if(this.keys.length > 0){
            return movies.filter(movie => this.keys.indexOf(movie.original_language) != -1 )
        }
        return movies
    }
}

export class ReleaseDateFilter extends BaseFilter{
    filter = movies =>{
        
        if(this.keys.length >0 ){
            
            movies  = movies.filter(movie =>{
                let date = new Date(movie.release_date)
                return this.keys.indexOf(date.getFullYear()) != -1
            })

        }
        return movies
    }
}

export class RatingFilter extends BaseFilter{
    filter = movies => {
        
        if(this.keys.length>0){
            return movies.filter(movie => this.keys.indexOf(Math.floor(movie.vote_average)) != -1 )
        }
        return movies
    }
}

export default class Filter extends Component{
    applyKey = (Filter,key) =>{
        this.props.filterData.applyKey(Filter,key)
    }
    claerKeys = (Filter) =>{
        console.log(Filter.keys = [])
        this.props.filterData.applyKey()
    }
    render(){
        
        let Filter = this.props.filterData.Filter || BaseFilter
        let filterKeys = this.props.filterData.filterKeys || []

        return (
            <div className="btn-group">
            <button  
                className={"btn" + (Filter.keys.length === 0? ' active':'')}
                onClick={ ()=>{this.claerKeys(Filter)}} >All</button>
                { filterKeys.map( key =>{
                    return ( <button 
                        className={"btn" + (Filter.hasKey(key)?' active':'')}
                        key={key} 
                        onClick={ () => this.applyKey(Filter,key)}>
                            {key}
                        </button>
                    )
                })}
            </div>
        )
    }
}