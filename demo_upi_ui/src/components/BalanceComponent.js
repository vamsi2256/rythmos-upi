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
    return(
        <div>
            <h3>{name}</h3>
            <h4>Balance:{balance}</h4>
        </div>
    )
}
export default BalanceComponent