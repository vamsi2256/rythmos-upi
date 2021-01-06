import {useState} from 'react'
import Service from '../service/UpiServices'
import AmountComponent from './AmountComponent'
import ReactDOM from 'react-dom'
import DisplayComponent from './DisplayComponent'
function PayComponent(props){
    const [mobile,setMobile]=useState('')
    let handleChange = props.handleChange
    let msg=props.msg
    let balance = props.balance
    function refershPage(){
        window.location.reload()
    }
    return(
        <div id="pay" className="box1">
             <p id="ptag">Send to Contact</p>
            <input type="number" name="mobile" placeholder="enter the receiver Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
            <h5>{msg}</h5>
            <button className="button" onClick={()=>{
                    let rnumber=mobile
                    let senderNumber=JSON.parse(localStorage.getItem("mobile"))
                    let data={rnumber:rnumber,sender:senderNumber}
                    if(mobile==senderNumber){
                        ReactDOM.render(
                            <DisplayComponent className="failure" msg="can't send to same account"/>,document.getElementById('pay')
                        )
                        setTimeout(refershPage,2000)
                    }
                    else{
                    Service.checkTransaction(data).then(res=>{
                        let obj=res.data
                        if(obj.name!=="no user"){
                        ReactDOM.render(
                            <AmountComponent name={obj.name} rnumber={rnumber} sender={senderNumber} balance={balance} handleChange={handleChange}/>,document.getElementById('pay')
                        )}
                        else{
                            ReactDOM.render(
                                <DisplayComponent className="failure" msg="No User"/>,document.getElementById('pay')
                            )
                            setTimeout(refershPage,2000)
                            
                        }
                        
                    })
                    }
            }}>Pay</button>
        </div>
    )
}
export default PayComponent