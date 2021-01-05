import { useEffect,useState} from 'react'
import BalanceComponent from './BalanceComponent'
import PayComponent from './PayComponent'
import service from '../service/UpiServices'
import store from 'store'
import TransactionList from './TransactionList'
import './main.css'
function MenuComponent1(props){
   const [name,setName]=useState('')
    const [balance,setBalance]=useState(0)
    useEffect(()=>{
       let loggedIn = store.get('loggedIn')
       if(!loggedIn){
          props.history.push('/')
       }else{
        let mobile=JSON.parse(localStorage.getItem("mobile"))
        console.log(mobile)
        service.checkBalance(mobile).then(res=>{
            let obj=res.data
            setName(obj.name)
            setBalance(obj.balance)
        })
      }
    })
   
   function handleChange(balance){
      setBalance(balance)
   }

   function logoutHandle(){
      service.logout()
      store.set('loggedIn',false)
      console.log(store.get('loggedIn'))
      props.history.push('/')
   }
   return(
      <div className="start">
         <BalanceComponent name={name} balance={balance}/>
         <PayComponent handleChange={handleChange} msg="" balance={balance}/>
         <div><button className="logout-btn" onClick={logoutHandle}>Logout</button></div>
         <TransactionList/>
      </div>
   )
}
export default MenuComponent1