import { useEffect,useState} from 'react'
import BalanceComponent from './BalanceComponent'
import PayComponent from './PayComponent'
import service from '../service/UpiServices'
import store from 'store'
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
<<<<<<< HEAD
      <body class="box">
         <BalanceComponent/>
         <PayComponent msg=""/>
      </body>
=======
      <div>
         <BalanceComponent name={name} balance={balance}/>
         <PayComponent handleChange={handleChange}/>
         <div><button onClick={logoutHandle}>Logout</button></div>
      </div>
>>>>>>> bfee21ee51adbfc7a909e512f448f0990c17665d
   )
}
export default MenuComponent1