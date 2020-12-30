import {useState,useEffect} from 'react'
import Service from '../service/UpiServices'
import ReactDom from 'react-dom'
import SucessComponent from './SucessComponent'
function AmountComponent(props){
    const [Amount,setAmount]=useState(0)
    useEffect(()=>{

    })
    return(
        <div id="amount">
            <h4>paying to {props.name}</h4>
            <input type="number" name="Amount" placeholder="enter the Amount" value={Amount} onChange={(e)=>setAmount(e.target.value)}/>
            <button onClick={()=>{
                let dummy={
                    name:props.name,
                    rnumber:props.rnumber,
                    sender:props.sender,
                }
                dummy.amount=Amount
                Service.payTransaction(dummy).then(res=>{
                    ReactDom.render(
                        <SucessComponent/>,document.getElementById('amount')
                    )
                })
            }}>Send</button>
        </div>
    )
}
export default AmountComponent