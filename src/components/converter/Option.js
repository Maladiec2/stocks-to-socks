import React from 'react'

function Option(props) {
    //qwert
    const {Ccy, Amt} = props.value;
    return (
        <option value={Amt}>{Ccy}</option>
    )
}

export default Option
