import React,{useState,useEffect} from 'react'
import Service from '../service/UpiServices'
import ReactDOM from 'react-dom'
import SucessComponent from './SucessComponent'
import DisplayComponent from './DisplayComponent'

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
            <button className="button" onClick={()=>{
                let dummy={
                    name:props.name,
                    rnumber:props.rnumber,
                    sender:props.sender,
                }
                dummy.amount=Amount
                if(Amount>0){
                    if(props.balance>Amount){
                        Service.payTransaction(dummy).then(res=>{
                            handleChange(res.data)
                            ReactDOM.render(
                                <DisplayComponent className="success" msg="Success"/>,document.getElementById('amount')
                            )
                            setTimeout(refershPage,2000)
                        })
                    }
                    else{
                        ReactDOM.render(
                            <DisplayComponent className="failure" msg="Transaction Failed due to insufficient Funds"/>
                            ,document.getElementById('amount')
                        )
                        setTimeout(refershPage,2000)
                    } 
                }else{
                    ReactDOM.render(
                        <DisplayComponent className="failure" msg="Please Enter amount greater than 0"/>,
                        document.getElementById('amount')
                    )
                    setTimeout(refershPage,2000)
                }
            }}>Send</button>
        </div>
    )
}
export default AmountComponent