import React, { Component } from 'react';
import Axios from 'axios';

export class Send extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            id: '',
            balance: '',
            accountNumber: '',
            beneficiary: '',
            amount: '',

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        const id = params.get('id');
        this.setState({ id: id });
        setTimeout(() => {
            Axios.post('http://localhost:5000/users/user', this.state)
                .then(res => {
                    this.setState({
                        data: res.data,
                    });
                });
        }, 100);
        setTimeout(() => {
            this.setState({
                balance: this.state.data.Balance,
            });
        }, 200);
    }

    handleSubmit(event) {
        event.preventDefault();
        setTimeout(() => {
            Axios.post('http://localhost:5000/transactions/send', this.state)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err);
                })
        }, 10);
    }

    updateInput(event) {
        switch (event.target.name) {
            case 'accountNumber':
                this.setState({ accountNumber: event.target.value.toUpperCase() });
                break;
            case 'beneficiary':
                this.setState({ beneficiary: event.target.value.toUpperCase() });
                break;
            case 'amount':
                this.setState({ amount: event.target.value });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div style={cnvStyle} >
                <label>
                    Fill all fields to send money:
                </label>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input placeholder="Account Number" name="accountNumber" type="number" value={this.state.accountNumber} onChange={this.updateInput} required />
                    </label>
                    <br />
                    <label>
                        <input placeholder="Beneficiary" name="beneficiary" type="text" value={this.state.beneficiary} onChange={this.updateInput} required />
                    </label>
                    <br />
                    <label>
                        <input placeholder="Amount" name="amount" type="number" value={this.state.amount} onChange={this.updateInput} required />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

const cnvStyle = {
    borderRadius: '5px',
    border: '2px solid #ccc',

    backgroundColor: '#f4f4f4',

    textAlign: "center",
    paddingBottom: '30px'
}

export default Send
