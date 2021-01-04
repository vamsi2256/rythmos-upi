import { useEffect } from 'react'
import BalanceComponent from './BalanceComponent'
import PayComponent from './PayComponent'
function MenuComponent1(props){
   useEffect(()=>{

   })
   return(
      <body class="box">
         <BalanceComponent/>
         <PayComponent msg=""/>
      </body>
   )
}
export default MenuComponent1