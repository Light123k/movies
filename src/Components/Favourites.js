
import React, { Component } from 'react'
import { movies } from './getmovies'

export default class Favourites extends Component {
    constructor() {
        super()
        this.state = {
            genres: [],
            currgen: 'All genres',
            movies: [],
            currText: '',
            limit: 5,
            currpage: 1
        }
    }
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('movies') || "[]")
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let temp = []
        data.forEach((movieobj) => {
            if (!temp.includes(genreids[movieobj.genre_ids[0]])) {
                temp.push(genreids[movieobj.genre_ids[0]])
            }
            if (!temp.includes('All genres')) {
                temp.unshift('All genres')
            }
            this.setState({
                genres: [...temp],
                movies: [...data]
            })
        });
    }
    handlegenrechange = (genre) => {
        this.setState({
            currgen: genre
        })
    }
    sortpopularitydesc = () => {
        let temp = this.state.movies;
        temp.sort(function (obj1, obj2) {
            return obj2.popularity - obj1.popularity
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortpopularityasc = () => {
        let temp = this.state.movies;
        temp.sort(function (obj1, obj2) {
            return obj1.popularity - obj2.popularity
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortratingdesc = () => {
        let temp = this.state.movies;
        temp.sort(function (obj1, obj2) {
            return obj2.vote_average - obj1.vote_average
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortratingasc = () => {
        let temp = this.state.movies;
        temp.sort(function (obj1, obj2) {
            return obj1.vote_average - obj2.vote_average
        })
        this.setState({
            movies: [...temp]
        })
    }
    handlepagechange = (page) => {
        this.setState({
            currpage: page
        })
    }

    render() {
        //let movie = movies.results;
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let filterarr = []
        if (this.state.currText === '') {
            filterarr = this.state.movies;
        }
        else {
            filterarr = this.state.movies.filter((movieobj) => {
                let title = movieobj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }


        // if (this.state.currgen === 'All genres') {
        //     filterarr = this.state.movies;
        // }
        if (this.state.currgen !== 'All genres') {
            filterarr = this.state.movies.filter((movieobj) => genreids[movieobj.genre_ids[0]] === this.state.currgen)
            //this.handlearr(filterarr);
        }
        let pages = Math.ceil(filterarr.length / this.state.limit)
        let pagearr = []
        for (let i = 1; i <= pages; i++) {
            pagearr.push(i)
        }
        let si = (this.state.currpage - 1) * this.state.limit;
        let ei = si + this.state.limit
        filterarr = filterarr.slice(si, ei);
        console.log(pages)

        return (
            <>

                <div className="row">
                    <div className='col-3'>
                        <ul class="list-group favourites-genres">
                            {

                                this.state.genres.map((genre) => (
                                    this.state.currgen === genre ? <li class="list-group-item" style={{ background: '#3f51b5', color: 'white' }}>{genre}</li> :
                                        <li class="list-group-item" style={{ background: 'white', color: '#3f51b5' }} onClick={() => this.handlegenrechange(genre)}>{genre}</li>

                                ))
                            }
                        </ul>
                    </div>
                    <div className='col-9'>
                        <div className='row'>
                            <input type="text" className='input-group-text col' placeholder='search' value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                            <input type="number" className='input-group-text col' placeholder='rows count' value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })} />
                        </div>
                        <div className='row'>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortpopularitydesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortpopularityasc}></i></th>
                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortratingdesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortratingasc}></i></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterarr.map((movieobj) => (
                                            <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} class="card-img-top " alt={movieobj.title} style={{ width: '3rem' }} /> {movieobj.original_title}</td>
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
                                        {
                                            pagearr.map((value) => (
                                                <li class="page-item"><a class="page-link" onClick={() => this.handlepagechange(value)}>{value}</a></li>
                                            ))
                                        }

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

