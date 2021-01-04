import React,{useState,useEffect} from 'react'
import Service from '../service/UpiServices'
import ReactDom from 'react-dom'
import SucessComponent from './SucessComponent'
import FailureComponent from './FailureComponent'

function AmountComponent(props){
    const [Amount,setAmount]=useState(0)
    useEffect(()=>{
        
    })
    function refershPage(){
        window.location.reload()
    }
    let handleChange = props.handleChange
    return(
        <div id="amount">
            <h4>paying to {props.name}</h4>
            <input type="number" name="Amount" placeholder="enter the Amount" value={Amount} onChange={(e)=>setAmount(e.target.value)}/>
            <button class="button" onClick={()=>{
                let dummy={
                    name:props.name,
                    rnumber:props.rnumber,
                    sender:props.sender,
                }
                dummy.amount=Amount
                if(props.balance>Amount){
                    Service.payTransaction(dummy).then(res=>{
                        handleChange(res.data)
                        ReactDom.render(
                            <SucessComponent/>,document.getElementById('amount')
                        )
                        setTimeout(refershPage,1500)
                    })
                }
                else{
                    ReactDom.render(
                        <FailureComponent/>,document.getElementById('amount')
                    )
                    setTimeout(refershPage,1500)
                }
                
            }}>Send</button>
        </div>
    )
}
export default AmountComponent