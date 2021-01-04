import React, { useEffect, useState } from 'react'

function Transaction(props){
    return(
        <div className="transaction" id="transaction">
            <ul>
                <li>{props.tran.amount}</li>
                <li>From {props.tran.sender.name}</li>    
                <li>To {props.tran.receiver.name}</li>
            </ul>
        </div>
    )
}

export default Transaction