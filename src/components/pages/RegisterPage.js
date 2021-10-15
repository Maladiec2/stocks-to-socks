import React, { Component } from 'react'
import Axios from 'axios'

export class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            accountNumber: '',
            firstName: '',
            lastName: '',
            beneficiary: '',
            password: '',

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    componentDidMount() {
        this.setState({ id: this.randomFixedInteger(7) });
        this.setState({ accountNumber: this.randomFixedInteger(16) });
    }

    randomFixedInteger(length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }

    concatonateFullName() {
        var fullName = this.state.firstName + ' ' + this.state.lastName;
        this.setState({ beneficiary: fullName });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.concatonateFullName();
        setTimeout(() => {
            Axios.post('http://localhost:5000/users/add', this.state)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }, 10);
        // redirect
    }

    updateInput(event) {
        switch (event.target.name) {
            case 'firstName':
                this.setState({ firstName: event.target.value.toUpperCase() });
                break;
            case 'lastName':
                this.setState({ lastName: event.target.value.toUpperCase() });
                break;
            case 'password':
                this.setState({ password: event.target.value });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div style={cnvStyle} >
                <label>
                    Use this id and your password to login:
                    <h3>{this.state.id}</h3>
                </label>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input placeholder="Firstame" name="firstName" type="text" value={this.state.firstName} onChange={this.updateInput} />
                    </label>
                    <br />
                    <label>
                        <input placeholder="Lastname" name="lastName" type="text" value={this.state.lastName} onChange={this.updateInput} />
                    </label>
                    <br />
                    <label>
                        <input placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.updateInput} />
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

export default RegisterPage
