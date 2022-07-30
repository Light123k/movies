import React, { Component } from 'react'
//import { movies } from "./getmovies";
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Movielists extends Component {
    constructor() {
        super()
        this.state = {
            hover: '',
            parr: [1],
            currpage: 1,
            movies: [],
            favourites: []
        }
    }
   /*Api data get*/ async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=6f39ee0c5058e0c2b5fd966ce839931f&page=${this.state.currpage}`)
        const data = res.data
        this.setState({
            movies: [...data.results]
        })
        console.log(data)
        console.log("mounting")
    }
    changemovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=6f39ee0c5058e0c2b5fd966ce839931f&page=${this.state.currpage}`)
        const data = res.data
        this.setState({
            movies: [...data.results]
        })
    }
    handlefavourites = (movieobj) => {
        let olddata = JSON.parse(localStorage.getItem('movies') || "[]")
        if (this.state.favourites.includes(movieobj.id)) {
            olddata = olddata.filter((m) => m.id !== movieobj.id)
        }
        else {
            olddata.push(movieobj)
        }
        localStorage.setItem('movies', JSON.stringify(olddata))
        console.log(olddata)
        this.handlefavouritesstate()
    }
    handlefavouritesstate = () => {
        let olddata = JSON.parse(localStorage.getItem('movies') || "[]")
        let temp = olddata.map((old) => old.id)
        this.setState({
            favourites: [...temp]
        })
    }
    handleclick = (value) => {
        if (value !== this.state.currpage) {
            this.setState({
                currpage: value
            }, this.changemovies)
        }
    }
    handleleft = () => {
        let temparr = this.state.parr.filter((value) => {
            return value !== this.state.parr.length
        })
        if (this.state.currpage !== 1) {
            this.setState({
                currpage: this.state.currpage - 1,
                parr: [...temparr]
            }, this.changemovies)
        }
    }
    handleright = () => {
        let temparr = []
        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            temparr.push(i)
        }
        this.setState({
            parr: [...temparr],
            currpage: this.state.currpage + 1
        }, this.changemovies)
    }
    render() {
        //let movie = movies.results
        console.log('render')
        return (
            <>
                <h2 className='text-center'><strong>Trending</strong></h2>
                <div className='movies-list'>
                    {
                        this.state.movies.map((movieobj) => (
                            <div className="card movies-card" onMouseEnter={() => this.setState({ hover: movieobj.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} class="card-img-top movies-img" alt={movieobj.title} />
                                <div className="card-body">
                                    <Link to="/moviedescription" style={{ textDecoration: 'none' }}><h5 class="card-title movies-title" >{movieobj.original_title}</h5></Link>
                                    {/* <p className="card-text banner-text">{movieobj.overview}</p> */}
                                    {
                                        this.state.hover === movieobj.id && <a href="#" class="btn btn-primary movies-button" onClick={() => this.handlefavourites(movieobj)}>{this.state.favourites.includes(movieobj.id) ? "Remove from favourites" : "Add to favourites"}</a>
                                    }


                                </div>
                            </div>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" onClick={this.handleleft}>Previous</a></li>
                            {
                                this.state.parr.map((value) => (
                                    <li class="page-item"><a class="page-link" onClick={() => this.handleclick(value)}>{value}</a></li>
                                ))
                            }
                            <li class="page-item"><a class="page-link" onClick={this.handleright}>Next</a></li>

                        </ul>
                    </nav>
                </div>

            </>

        )
    }
}
