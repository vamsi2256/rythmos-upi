import {useState} from 'react'
import Service from '../service/UpiServices'
import AmountComponent from './AmountComponent'
import ReactDOM from 'react-dom'
function PayComponent(props){
    const [mobile,setMobile]=useState('')
<<<<<<< HEAD
=======
    let handleChange = props.handleChange
    useEffect(()=>{

    })
>>>>>>> bfee21ee51adbfc7a909e512f448f0990c17665d
    return(
        <div id="pay">
             <h4>{props.msg}</h4>
            <input type="number" name="mobile" placeholder="enter the receiver Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
            <button class="button" onClick={()=>{
                    let rnumber=mobile
                    let senderNumber=JSON.parse(localStorage.getItem("mobile"))
                    let data={rnumber:rnumber,sender:senderNumber}
                    Service.checkTransaction(data).then(res=>{
                        let name=res.data
<<<<<<< HEAD
                        if(name==="no user"){
                            ReactDOM.render(
                                <PayComponent msg="User not registered"/>,document.getElementById('pay')
                            )
                        }
                        else{
                            ReactDOM.render(
                                <AmountComponent name={name} rnumber={rnumber} sender={senderNumber}/>,document.getElementById('pay')
                            )
                        }
=======
                        // let dummy={
                        //     name:name,
                        //     receiver:receiverNumber,
                        //     sender:senderNumber,
                        // }
                        ReactDOM.render(
                            <AmountComponent name={name} rnumber={rnumber} sender={senderNumber} handleChange={handleChange}/>,document.getElementById('pay')
                        )
                        
>>>>>>> bfee21ee51adbfc7a909e512f448f0990c17665d
                    })

            }}>Pay</button>
        </div>
    )
}
export default PayComponent