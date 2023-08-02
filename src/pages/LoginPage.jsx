import axios from 'axios'
import React,{useState} from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {

    const [loginDetails, setLoginDetails] = useState(null)
     const navigate = useNavigate()
    console.log(loginDetails)
    function handleChange(e){
       const {name,value} = e.target
       setLoginDetails((prev)=>{
        return {
            ...prev,
            [name] : value 
        }
       })
       
    }
  async  function handleSubmit(e){
        e.preventDefault();
        console.log("cl")
        try{
            console.log(loginDetails)
            const res = await axios.post("/sunbase/portal/api/assignment_auth.jsp",loginDetails);
            console.log(res.status)
            if (res.status>=300) {
                console.log(res.status)
                throw Error("failed")
            }
            
            const data = await res.data
            console.log(data)
            localStorage.setItem("token",data.access_token)
            navigate("/customerList")
        }catch(e){
            console.log(e)
        }
    }
  return (
    <div  >
      
      <div className='login-container'>
     
        <div className='login-box'>
        <h1 >Login</h1>
        <div className='box'></div>
        <div className='input-container'>
            <input 
            value={loginDetails?.login_id}
            placeholder='email'
            name='login_id'
            type='text'
            onChange={handleChange}
              />
        </div>
        <div className='input-container'>
            <input 
            value={loginDetails?.password}
            placeholder='password'
            name='password'
            type='password'
            onChange={handleChange}
              />
        </div>
        <button
        onClick={handleSubmit}
        >
            Submit
        </button>
        </div>
      </div>
    </div>
  )
}
