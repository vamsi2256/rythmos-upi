import axios from 'axios'
const BASE_URL="http://localhost:3001"
class Service{
    getList(){
        return axios.get(BASE_URL+"/",{})
    }
    save(record)
    {
        console.log(record)
        return axios.post(BASE_URL+"/Register",{
            name:record.name,
            email:record.email,
            city:record.city,
            mobileNumber:record.mobile,
            password:record.password,
        })
    }
    checkLogin(record){
        console.log(record)
        return axios.post(BASE_URL+'/login',{
            mobileNumber:record.mobile,
            password:record.password,
        })
    }
    checkBalance(mobileNumber){
        return axios.post(BASE_URL+'/checkBalance',{
            mobileNumber:mobileNumber,
        })
    }
    checkTransaction(obj){
        return axios.post(BASE_URL+'/transaction',{
            rnumber:obj.rnumber,
            sender:obj.sender,
        })
    }
    payTransaction(obj){
        return axios.post(BASE_URL+'/pay',{obj})
    }
    logout(){
        return axios.all(BASE_URL+'/logout')
    }

    // deleteById(id) {
    //     console.log(id)
    //     return axios.delete(BASE_URL+`/delete/${id}`,{})
    // }
    // getById(id){
    //     return axios.get(BASE_URL+`/getById/${id}`,{})
    // }

}
export default new Service()