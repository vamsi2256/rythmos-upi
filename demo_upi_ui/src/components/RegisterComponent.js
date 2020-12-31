import {useEffect, useState} from 'react'
import Service from '../service/UpiServices'
import store from 'store'
function RegisterComponent(props){
    const [user,setUser]=useState({
        Name:'',
        Email:'',
        Mobile:'',
        City:'',
        Password:''
    })
    useEffect(()=>{
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
             <form>
                <div className="form-group">
                    <label> Name: </label>
                    <input placeholder="Name" name="Name" className="form-control"
                    value={user.Name} onChange={onChangeUser}/>
                </div>
                <div className="form-group">
                    <label> Email: </label>
                    <input placeholder="Email" name="Email" className="form-control"
                    value={user.Email} onChange={onChangeUser}/>
                </div>
                <div className="form-group">
                    <label> Mobile: </label>
                    <input type="number" name="Mobile" className="form-control"
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
                <button className="btn btn-success" onClick={(e)=>{
                    e.preventDefault();
                    let record={name:user.Name,email:user.Email,mobile:user.Mobile,city:user.City,password:user.Password}
                   Service.save(record).then(res=>props.history.push('/')).catch(err=>props.history.push('/Register'))
                }}>Register</button>
                <button className="btn btn-danger" onClick={()=> props.history.push('/')} style={{marginLeft:"10px"}}>Cancel</button>
            </form>
        </div>
    )
}
export default RegisterComponent