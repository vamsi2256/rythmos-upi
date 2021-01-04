import {useEffect, useState} from 'react'
import Service from '../service/UpiServices'
import store from 'store'
import './main.css'
function RegisterComponent(props){
    const [user,setUser]=useState({
        Name:'',
        Email:'',
        Mobile:'',
        City:'',
        Password:''
    })
    useEffect(()=>{
        document.body.style.backgroundColor = "#00CCFF"
        let loggedIn = store.get('loggedIn')
        if(loggedIn){
            props.history.push('/menu')
        }
    })
    function onChangeUser(e){
        setUser({...user, [e.target.name]: e.target.value})
    }
    return(
        <div>
            <body>
            <form class="box">
                <div className="form-group">
                    <label> Name: </label>
                    <input type="text" placeholder="Name" name="Name" className="form-control"
                    value={user.Name} onChange={onChangeUser}/>
                </div>
                <div className="form-group">
                    <label> Email: </label>
                    <input type="text" placeholder="Email" name="Email" className="form-control"
                    value={user.Email} onChange={onChangeUser}/>
                </div>
                <div className="form-group">
                    <label> Mobile: </label>
                    <input type="number" name="Mobile" className="form-control" placeholder="Mobile"
                    value={user.Mobile} onChange={onChangeUser}/>
                </div>
                <div className="form-group">
                    <label> City: </label>
                    <input type="text" placeholder="City" name="City" className="form-control"
                    value={user.City} onChange={onChangeUser}/>
                </div>
                <div className="form-group">
                    <label> Password </label>
                    <input type="password" placeholder="Password" name="Password" className="form-control"
                     value={user.Password} onChange={onChangeUser}/>
                </div>
                <button class="button"  onClick={(e)=>{
                    e.preventDefault();
                    let record={name:user.Name,email:user.Email,mobile:user.Mobile,city:user.City,password:user.Password}
                   Service.save(record).then(res=>props.history.push('/')).catch(err=>props.history.push('/Register'))
                }}>Register</button>
                <button class="button1" onClick={()=> props.history.push('/')} style={{marginLeft:"10px"}}>Cancel</button>
            </form>
            </body>
        </div>
    )
}
export default RegisterComponent