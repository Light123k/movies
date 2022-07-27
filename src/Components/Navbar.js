import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{ display: 'flex', padding: '0.5' }}>
                <h1>Movie App</h1>
                <h2 style={{ marginLeft: '2rem', marginTop: '1.85rem' }} >Favourites</h2>
            </div>
        )
    }
}
