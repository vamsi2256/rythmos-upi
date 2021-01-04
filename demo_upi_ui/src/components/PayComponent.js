import {useState} from 'react'
import Service from '../service/UpiServices'
import AmountComponent from './AmountComponent'
import ReactDOM from 'react-dom'
function PayComponent(props){
    const [mobile,setMobile]=useState('')
    let handleChange = props.handleChange
    return(
        <div id="pay" className="pay-comp">
             <h4>{props.msg}</h4>
            <input type="number" name="mobile" placeholder="enter the receiver Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
            <button class="button" onClick={()=>{
                    let rnumber=mobile
                    let senderNumber=JSON.parse(localStorage.getItem("mobile"))
                    let data={rnumber:rnumber,sender:senderNumber}
                    Service.checkTransaction(data).then(res=>{
                        let name=res.data
                        ReactDOM.render(
                            <AmountComponent name={name} rnumber={rnumber} sender={senderNumber} handleChange={handleChange}/>,document.getElementById('pay')
                        )
                        
                    })

            }}>Pay</button>
        </div>
    )
}
export default PayComponent