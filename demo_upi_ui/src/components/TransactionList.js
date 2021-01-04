import React,{ useEffect, useState} from 'react'
import Service from '../service/UpiServices'
import Transaction from './Transaction'
function TransactionList(){
    const [transactions,setTransactions] = useState([])
    useEffect(()=>{
        let mobile = JSON.parse(localStorage.getItem("mobile"))
        Service.getTransactions(mobile).then((res)=>{
            // console.log(res.data)
            let tram = res.data
            // console.log(Array.isArray(tram))
            // if(transactions.length===0){
            //     tram.map((label)=>{
            //         setTransactions([...transactions,label])
            //     })
            // }
            setTransactions(tram)
            // console.log(Array.isArray(transactions))
            // console.log(transactions)
        })
    },[])

    
    function getCrDr(transaction){
        let mobile = JSON.parse(localStorage.getItem("mobile"))
        if(transaction.receiver.mobileNumber==mobile){
            return "credit"
        }else{
            return "debit"
        }
    }

    return(
        <div className="list-transactions">
            <h1>Transactions</h1>
            {transactions.map((tran)=>
            <div key={tran._id} className={getCrDr(tran)}>
                <Transaction tran={tran}/>
            </div>)}
        </div>
    )
}

export default TransactionList