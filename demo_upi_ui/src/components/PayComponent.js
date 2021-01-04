import {useState} from 'react'
import Service from '../service/UpiServices'
import AmountComponent from './AmountComponent'
import ReactDOM from 'react-dom'
function PayComponent(props){
    const [mobile,setMobile]=useState('')
    let handleChange = props.handleChange
    let msg=props.msg
    function refershPage(){
        window.location.reload()
    }
    return(
        <div id="pay" class="box1">
             <p>Send to Contact</p>
            <input type="number" name="mobile" placeholder="enter the receiver Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
            <h5>{msg}</h5>
            <button class="button" onClick={()=>{
                    let rnumber=mobile
                    let senderNumber=JSON.parse(localStorage.getItem("mobile"))
                    let data={rnumber:rnumber,sender:senderNumber}
                    Service.checkTransaction(data).then(res=>{
                        let obj=res.data
                        if(obj.name!=="no user"){
                        ReactDOM.render(
                            <AmountComponent name={obj.name} rnumber={rnumber} sender={senderNumber} balance={obj.balance} handleChange={handleChange}/>,document.getElementById('pay')
                        )}
                        else{
                            // alert('There is no user with the given mobile number')
                            // window.location.reload()
                            ReactDOM.render(
                                <PayComponent handleChange={handleChange} msg="No User"/>,document.getElementById('pay')
                            )
                            setTimeout(refershPage,4000)
                            
                        }
                        
                    })

            }}>Pay</button>
        </div>
    )
}
export default PayComponent