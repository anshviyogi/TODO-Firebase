import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './component/Header'
import Login from './component/Login'
import { useStateValue } from './component/StateProvider'
import {auth} from './component/firebase'
import RegisterUser from './component/RegisterUser'

function App(){
  const [{user},dispatch] = useStateValue()

  useEffect(()=>{
    auth.onAuthStateChanged(authUser =>{
      
      // console.log("user is >>>",authUser)

      if(authUser){
        // user just logged in / the user was logged in

        dispatch({
          type:"SET_USER",
          user: authUser
        })

      }else{
        // user is logged out
        dispatch({
          type:"SET_USER",
          user: null
        })
        
      }
    })
  },[])
return(
  <Router>
  <div>
    <Routes>

      {/* <Route path='/checkout' element={<><Header/><Checkout/></>}/> */}
    
      <Route path='/login' element={<Login/>}/>

      <Route path='/register' element={<RegisterUser/>}/>
      
      {/* <Route path='/payment' element={<><Header/><Payment/></>}/> */}
      <Route path='/' element={<><Header/></>}/>
      
    </Routes>
  </div>
  </Router>
)
}
export default App