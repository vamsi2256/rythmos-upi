import {useEffect, useState} from 'react'
import Service from '../service/UpiServices'
import store from 'store'
import './main.css'
function LoginComponent(props){
    const [user,setUser]=useState({
        Mobile:'',
        Password:''
    })
    useEffect(()=>{
        document.body.style.backgroundColor = "#00CCFF"
        let loggedIn = store.get('loggedIn')
        if(loggedIn===true){
            props.history.push('/menu')
        }
    },[])
    function onChangeUser(e){
        setUser({...user, [e.target.name]: e.target.value})
    }
    return(
            <body class="start">
            <form class="box">
            <h1>Login  Form</h1>
                <input type="text" name="Mobile" placeholder="enter the mobile number"
                 value={user.Mobile} onChange={onChangeUser} />
                <br></br>
                <input type="password" name="Password" placeholder="enter the password"
                value={user.Password} onChange={onChangeUser} />
                <br/>
                <button class="button" onClick={(e)=>{
                    e.preventDefault()
                    let record={mobile:user.Mobile,password:user.Password}
                    Service.checkLogin(record).then(res=>{
                        if(res.data==='user present'){
                            localStorage.setItem("mobile",JSON.stringify(user.Mobile))
                            store.set('loggedIn',true)
                            props.history.push("/menu")
                        }
                        else if(res.data==='no user'){
                            props.history.push('/Register')
                        }
                        else{
                            props.history.push('/')
                        }
                    }).catch(err=>props.history.push('/'))
                }}>Login</button>
                <br/><br/>
                <button class="button" onClick={()=>{
                props.history.push('/Register')
            }}>create an account.</button>
            </form>
    </body>
            
    )
}
export default LoginComponent