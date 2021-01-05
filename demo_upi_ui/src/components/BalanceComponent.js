import {useState,useEffect} from 'react'
import service from '../service/UpiServices'
function BalanceComponent(props){
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
        <div className="show-balance">
            <strong><p className="name">{name}</p></strong>
            <p className="balance">Balance: {balance}</p>
        </div>
    )
}
export default BalanceComponent