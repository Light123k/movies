import { movies } from "./getmovies";
import React, { Component } from 'react'

export default class banner extends Component {
    render() {
        let movie = movies.results[0]
        //console.log(movie)
        return (
            <>
                {
                    movie === '' ? <div className="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div> : <div className="card banner-card" >
                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} class="card-img-top banner-img" alt={movie.title} />
                        <div className="card-body">
                            <h5 class="card-title banner-title">{movie.original_title}</h5>
                            <p className="card-text banner-text">{movie.overview}</p>

                        </div>
                    </div>
                }


            </>

        )
    }
}
