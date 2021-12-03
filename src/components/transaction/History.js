import React, { Component } from 'react'
import Axios from 'axios';

export class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userData: {},
            history : {},
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
        // setTimeout(() => {
        //     Axios.post('http://localhost:5000/transactions/get', this.state)
        //         .then(res => {
        //             console.log(res.data)
        //             this.setState({
        //                 history: res.data,
        //             });
        //         });
        // }, 200);
        // setTimeout(() => {
        //     console.log(this.state.history)
        // }, 400);
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default History
