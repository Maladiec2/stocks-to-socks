import React, { Component } from 'react'
import Axios from 'axios';

export class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userData: {},
            history: [],
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        const id = params.get('id');
        this.setState({ id: id });
        setTimeout(() => {
        Axios.post('http://localhost:5000/users/user', this.state)
            .then(res => {
                this.setState({
                    userData: res.data,
                });
            });
        }, 100);
        setTimeout(() => {
            Axios.post('http://localhost:5000/transactions/get', this.state)
                .then(res => {
                    const list = res.data.filter(item => item.Sender === this.state.userData.Beneficiary);
                    this.setState({
                        history: list,
                    });
                });
        }, 200);
    }
    render() {
        return (
            <div style={cnvStyle} >
                <ul style={ulStyle}>
                    {this.state.history.map(item => (
                        <li style={liStyle} key={item._id}><b>{item.Sender} sent {item.Amount} EUR to {item.Beneficiary}</b></li>
                    ))}
                </ul>
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

const ulStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0
}

const liStyle = {
    textAlign: "left",
    borderRadius: '5px',
    border: '2px solid #ccc',
}

export default History
