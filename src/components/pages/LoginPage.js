import React, { Component, useCallback } from 'react'
import Axios from 'axios'
import HomePage from './HomePage';


export class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputId: '',
            inputPass: '',
            user: {
                id: '',
                pass: '',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    componentDidMount() {
        
    }

    userObj() {
        this.setState({
            user: {
                id: this.state.inputId,
                pass: this.state.inputPass
            }
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        this.userObj();
        setTimeout(() => {
            Axios.post('http://localhost:5000/users/auth', this.state.user)
                .then(res => {
                    localStorage.setItem('auth', 'true');
                    window.location.assign(`/home?id=${this.state.inputId}`);
                })
                .catch(err => {
                    console.log(err);
                })
        }, 10);
    }

    updateInput(event) {
        switch (event.target.name) {
            case 'id':
                this.setState({ inputId: event.target.value });
                break;
            case 'password':
                this.setState({ inputPass: event.target.value });
                break;
            default:
                break;
        }
    }

    goToRegisterPage() {
        window.location.assign(`/register`);
    }

    render() {
        return (
            <div style={cnvStyle} >
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input placeholder="Login id" name="id" type="text" value={this.state.inputId} onChange={this.updateInput} required />
                    </label>
                    <br />
                    <label>
                        <input placeholder="Password" name="password" type="password" value={this.state.inputPass} onChange={this.updateInput} required />
                    </label>
                    <br />
                    <input type="submit" value="Login" />
                </form>
                <br />
                <h5>do not have an account? click here to create account</h5>
                <button onClick={this.goToRegisterPage}>Register</button>

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

export default LoginPage
