import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Login.css'
import {auth} from './firebase'

function Login(){
const navigate = useNavigate()
const[email,setEmail] = useState('')
const[password,setPassword] = useState('')

  // Login logic
  const login = (e)=>{
e.preventDefault()

auth.signInWithEmailAndPassword(email,password)
    .then(auth =>{
      // navigate will push the page to localhost:3000/ if everything goes well
      navigate('/')
    })
    .catch(error => alert(error.message))
  }

return(
  <div className='login'>
  <Link to='/'>
  <img className='login__logo' src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png" alt=""/>
  </Link>
  <div className='login__container'>
  <h1>Sign In</h1>
    <form>
    
    <h5>Email</h5>
    <input type="text" onChange={e =>setEmail(e.target.value)} value={email} className='inputField' style={{border:"1px solid black"}}/>

    <h5>Password</h5>
    <input type="password" onChange={e =>setPassword(e.target.value)} value={password} className='inputField' style={{border:"1px solid black"}}/>

    <button className='login__signInButton' onClick={login}>Sign In</button>
    </form>

    
  </div>
</div>
)
}
export default Login