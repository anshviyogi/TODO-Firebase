import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { useStateValue } from './StateProvider';
import {auth} from './firebase'
import Body from './Body';

function Header() {

    const [{user},dispatch] = useStateValue();
    
    if(user){
        console.log("User is logged in")
    }else{
        console.log("Login in user")
    }

    function signoutHandler(){
        console.log("sign out")
        auth.signOut()   
    }

    // console.log(user.multiFactor.user.email)

  return (
   <> 
    <div className='header'>
        
        <div className='logo__title'>
            <Link to='/'>
        <img className='header__logo' src='https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png'/>
        </Link>
        <h1 className='header__title'>To-Do List</h1>
        
        </div>

        <div className='login__register'>

            {user? <h3 className='signInUser'>Hello {user.multiFactor.user.email.split('@')[0]} </h3>: <Link to='/login' className='link'><h3 className='signInUser'>Sign in</h3></Link>}

            {user? <h3 className='signoutButton' onClick={signoutHandler}>Sign out</h3> : <Link to='/register' className='register__button'>
                <h3>Register</h3>
            </Link>
            }
        </div>
    </div>
    
    {/* Lower body part */}
    {user ? <Body/> : <h2 className='login-alert'>You should be logged in for using this App</h2>}
</>

  )
}

export default Header   