import Axios from 'axios';
import React, { Component } from 'react'
import Converter from '../converter/Converter'

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        if (localStorage.getItem('auth') !== 'true') {
            window.location.assign('/');
        } else {
            const params = new URLSearchParams(window.location.search)
            const id = params.get('id');
            Axios.post('http://localhost:5000/users/user', {id})
                .then(res => {
                    this.setState( this.state, () => {
                        this.state.data = res.data
                      });
                })
        }
        console.log(this.state.data);
    }

    render() {
        return (
            <div>
                <div style={cnvStyle}>
                    <h1>{this.state.data.Beneficiary}</h1>
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
