import React, { Component } from 'react'
import Axios from 'axios'
import Option from './Option'

class Converter extends Component {
    state = {
        data: [

        ],
        selectFrom: null,
        selectTo: null,
        inputFrom: '',
        inputTo: '',
        toEur: null,
        res: {}
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/currencies/getRates')
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }

    fromSelectChange = (e) => {
        this.cleanState();
        this.setState({
            selectFrom: e.target.value,
            res: {
                eventType: e.type,
                description: `exchange rate to ${e.target.value} `
            }
        }, this.sendLog)
    }

    toSelectChange = (e) => {
        this.cleanState();
        this.setState({
            selectTo: e.target.value,
            res: {
                eventType: e.type,
                description: `exchange rate to ${e.target.value} `
            }
        }, this.sendLog)
    }

    fromInputChange = (e) => {
        this.setState({
            inputTo: '',
            res: {}
        })
        if (this.state.selectFrom != null && this.state.selectTo != null) {

            var X = e.target.value;
            var selectFrom = this.state.selectFrom;

            this.setState({
                toEur: X / selectFrom,
                res: {
                    eventType: e.type,
                    description: `Typed in ${e.target.value} `
                }
            }, () => {
                this.setState({
                    inputFrom: X,
                    inputTo: this.state.selectTo * this.state.toEur
                }, this.sendLog)
            })
        }
    }
    /*
    X/selectFrom = EUR
    EUR*selectTo = Y.
    */
    toInputChange = (e) => {
        this.setState({
            inputFrom: '',
            res: {}
        })
        if (this.state.selectFrom != null && this.state.selectTo != null) {

            var X = e.target.value;
            var selectTo = this.state.selectTo;

            this.setState({
                toEur: X / selectTo,
                res: {
                    eventType: e.type,
                    description: `Typed in ${e.target.value} `
                }
            }, () => {
                this.setState({
                    inputTo: X,
                    inputFrom: this.state.selectFrom * this.state.toEur
                }, this.sendLog)
            })
        }
    }

    sendLog() {
        Axios.post('http://localhost:5000/userLogs/add', this.state.res)
            .then(res => {
                console.log(res + ' event added')
            })
            .catch(err => {
                console.log(err);
            })
    }

    cleanState() {
        this.setState({
            inputFrom: '',
            inputTo: '',
            res: {}
        })
    }

    render() {
        return (
            <div style={cnvStyle} >
                <h3>Converter</h3>
                <input value={this.state.inputFrom} onChange={this.fromInputChange} type="number"></input>
                <select onChange={this.fromSelectChange}>
                    <option>-</option>
                    {this.state.data.map(item => {
                        return <Option key={item._id} value={item} />
                    })}
                </select>
                <br />
                <h1>=</h1>
                <br />
                <input value={this.state.inputTo} onChange={this.toInputChange} type="number"></input>
                <select onChange={this.toSelectChange}>
                    <option>-</option>
                    {this.state.data.map(item => {
                        return <Option key={item._id} value={item} />
                    })}
                </select>
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

export default Converter
