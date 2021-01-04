import {useState} from 'react'
import Service from '../service/UpiServices'
import AmountComponent from './AmountComponent'
import ReactDOM from 'react-dom'
function PayComponent(props){
    const [mobile,setMobile]=useState('')
    let handleChange = props.handleChange
    return(
        <div id="pay" className="pay-comp">
             <p>Send to Contact</p>
            <input type="number" name="mobile" placeholder="enter the receiver Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
            <button onClick={()=>{
                    let rnumber=mobile
                    let senderNumber=JSON.parse(localStorage.getItem("mobile"))
                    let data={rnumber:rnumber,sender:senderNumber}
                    Service.checkTransaction(data).then(res=>{
                        let name=res.data
                        if(name!=="no user"){
                        ReactDOM.render(
                            <AmountComponent name={name} rnumber={rnumber} sender={senderNumber} handleChange={handleChange}/>,document.getElementById('pay')
                        )}
                        else{
                            alert('There is no user with the given mobile number')
                            window.location.reload()
                        }
                        
                    })

            }}>Pay</button>
        </div>
    )
}
export default PayComponent