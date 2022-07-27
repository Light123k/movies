import React, { Component } from 'react'
import { movies } from './getmovies'

export default class Favourites extends Component {
    constructor() {
        super()
        this.state = {
            genres: [],
            currgen: ''
        }
    }

    render() {
        let movie = movies.results;
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let temp = []
        {
            movie.map((movieobj) => {
                if (!temp.includes(genreids[movieobj.genre_ids[0]])) {
                    temp.push(genreids[movieobj.genre_ids[0]])
                }
            })
            temp.unshift('All Genres')
        }
        return (
            <>

                <div className="row">
                    <div className='col-3'>
                        <ul class="list-group favourites-genres">
                            {

                                temp.map((genre) => (
                                    this.state.currgen === genre ? <li class="list-group-item" style={{ background: '#3f51b5', color: 'white' }}>{genre}</li> :
                                        <li class="list-group-item" style={{ background: 'white', color: '#3f51b5' }}>{genre}</li>

                                ))
                            }
                        </ul>
                    </div>
                    <div className='col-9'>
                        <div className='row'>
                            <input type="text" className='input-group-text col' placeholder='search' />
                            <input type="number" className='input-group-text col' placeholder='rows count' />
                        </div>
                        <div className='row'>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Popularity</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        movie.map((movieobj) => (
                                            <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} class="card-img-top " alt={movie.title} style={{ width: '3rem' }} /> {movieobj.original_title}</td>
                                                <td>{genreids[movieobj.genre_ids[0]]}</td>
                                                <td>{movieobj.popularity}</td>
                                                <td>{movieobj.vote_average}</td>
                                                <td><button type="button" class="btn btn-danger">Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination" >
                                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>

                        </div>


                    </div>

                </div>
            </>
        )
    }
}

