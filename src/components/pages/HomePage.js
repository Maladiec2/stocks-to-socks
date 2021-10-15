import React, { Component } from 'react'
import Converter from '../converter/Converter'

export class HomePage extends Component {
    render() {
        return (
            <div>
                <div style={cnvStyle}>
                    <h1>Labas</h1>
                </div>
                <Converter />
            </div>
        )
    }
}

const cnvStyle = {
    borderRadius: '5px',
    border: '2px solid #ccc',

    backgroundColor: '#f4f4f4',

    textAlign: "center",
    paddingBottom: '30px'
}

export default HomePage
