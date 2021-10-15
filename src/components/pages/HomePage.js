import React, { Component } from 'react'
import Converter from '../converter/Converter'

export class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Labas</h1>
                <Converter />
            </div>
        )
    }
}

export default HomePage
