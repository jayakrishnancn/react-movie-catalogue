import React, { Component } from 'react'
class Result extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-title">
                    <div className='name'>
                        {this.props.movie.original_title}
                    </div>
                    <div className='rating'>{this.props.movie.vote_average}</div>
                </div>
                <div className="card-body">
                    {this.props.movie.overview}
                </div>
                <div className="card-footer">
                    {new Date(this.props.movie.release_date).getFullYear()}
                </div>
            </div>

        )
    }
}
export default Result