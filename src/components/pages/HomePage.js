import Axios from 'axios';
import React, { Component } from 'react'
import Converter from '../converter/Converter'
import Send from '../transaction/Send';
import History from '../transaction/History';

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            beneficiary: 'Anon',
            accountNumber: '0000000000000000',
            balance: '0',
            data: {},
        }
    }

    componentDidMount() {
        if (localStorage.getItem('auth') !== 'true') {
            window.location.assign('/');
        } else {
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
            }, 50);
            setTimeout(() => {
                this.setState({
                    beneficiary: this.state.data.Beneficiary,
                    balance: this.state.data.Balance,
                });
            }, 300);
        }
        setTimeout(() => {
            this.cardNumber();
        }, 300);
    }

    cardNumber() {
        const first = this.state.data.AccountNumber.toString().substring(0, 4);
        const second = this.state.data.AccountNumber.toString().substring(4, 8);
        const third = this.state.data.AccountNumber.toString().substring(8, 12);
        const last = this.state.data.AccountNumber.toString().substring(12, 16);
        this.setState({ accountNumber: first +' '+second+ ' '+third+' '+last })
    }

    render() {
        return (
            <div>
                <div style={cnvStyle}>
                    <h2>Welcome Back!</h2>
                    <h5>{this.state.beneficiary}</h5>
                    <h5>{this.state.accountNumber}</h5>
                    <h3>{this.state.balance} EUR</h3>
                </div>
                <Send />
                <History />
                <Converter />
            </div>
        )
    }
}

const cnvStyle = {
    borderRadius: '5px',
    border: '2px solid #ccc',

    backgroundColor: '#f4f4f4',

    textAlign: "left",
    padding: '0px 30px'
}



export default HomePage
