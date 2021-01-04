<<<<<<< HEAD
import {useState,useEffect} from 'react'
import service from '../service/UpiServices'
function BalanceComponent(){
    const [name,setName]=useState('')
    const [balance,setBalance]=useState(0)
    useEffect(()=>{
        let mobile=JSON.parse(localStorage.getItem("mobile"))
        console.log(mobile)
        service.checkBalance(mobile).then(res=>{
            let obj=res.data
            setName(obj.name)
            setBalance(obj.balance)
        })
    })
=======
function BalanceComponent(props){
    
>>>>>>> bfee21ee51adbfc7a909e512f448f0990c17665d
    return(
        <div>
            <h3>{props.name}</h3>
            <h4>Balance:{props.balance}</h4>
        </div>
    )
}
export default BalanceComponent