import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Login.css'
import {auth} from './firebase'

function RegisterUser(){
const navigate = useNavigate()
const[email,setEmail] = useState('')
const[password,setPassword] = useState('')

  // Register logic
  const register = (e)=>{
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email,password)
      .then((auth) =>{
        // successfully created a new user
        console.log(auth)
        if(auth){
          navigate('/')
        }
      })
      .catch(error => alert(error.message))
  }

return(
  <div className='login'>
  <Link to='/'>
  <img className='login__logo' src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png" alt=""/>
  </Link>
  <div className='login__container'>
  <h1>Register Here</h1>
    <form>
    
    <h5>Email</h5>
    <input type="text" onChange={e =>setEmail(e.target.value)} value={email} className='inputField' style={{border:"1px solid black"}}/>

    <h5>Password</h5>
    <input type="password" onChange={e =>setPassword(e.target.value)} value={password} className='inputField' style={{border:"1px solid black"}}/>

    <button className='login__signInButton' onClick={register}>Register</button>
    </form>

    <p>This is a Firebase project, the authentication of firebase doesn't allows us to save Name & Address Feilds</p>

  </div>
</div>
)
}
export default RegisterUser