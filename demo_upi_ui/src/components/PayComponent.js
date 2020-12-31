import {useState,useEffect} from 'react'
import Service from '../service/UpiServices'
import AmountComponent from './AmountComponent'
import ReactDOM from 'react-dom'
function PayComponent(props){
    const [mobile,setMobile]=useState('')
    let handleChange = props.handleChange
    useEffect(()=>{

    })
    return(
        <div id="pay">
            <input type="number" name="mobile" placeholder="enter the receiver Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
            <button onClick={()=>{
                    let rnumber=mobile
                    let senderNumber=JSON.parse(localStorage.getItem("mobile"))
                    let data={rnumber:rnumber,sender:senderNumber}
                    Service.checkTransaction(data).then(res=>{
                        let name=res.data
                        // let dummy={
                        //     name:name,
                        //     receiver:receiverNumber,
                        //     sender:senderNumber,
                        // }
                        ReactDOM.render(
                            <AmountComponent name={name} rnumber={rnumber} sender={senderNumber} handleChange={handleChange}/>,document.getElementById('pay')
                        )
                        
                    })

            }}>Pay</button>
        </div>
    )
}
export default PayComponent