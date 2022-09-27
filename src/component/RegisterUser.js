import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Login.css'
import {auth, db} from './firebase'
// import {useState,useEffect} from 'react'
import axios from 'axios'

function RegisterUser(){
const navigate = useNavigate()
const[email,setEmail] = useState('')
const[password,setPassword] = useState('')

// Getting IP Address
const [ip, setIP] = useState('');

//creating function to load ip address from the API
const getData = async () => {
  const res = await axios.get('https://geolocation-db.com/json/')
  setIP(res.data.IPv4)
}

// Handle timings
const time = null;
const [ctime,setDate] = useState(time); 

const handelTime = () =>{
  let time = new Date().toLocaleTimeString();
  setDate(time.toString());
}

useEffect(()=>{
  getData()
  handelTime()
},[])


  // Register logic
  const register = (e)=>{

    console.log(ctime)
    e.preventDefault()

      // Save in firebase collection
      // Email,password,time,IP Address

      db.collection('users').add({
        email:email,
        password:password,
        signupTime: ctime,
        IP:ip
      })

      .then(()=> alert("User created Successfully"))
      .catch((error)=> alert(error.message))


      // Save in firebase auth database
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