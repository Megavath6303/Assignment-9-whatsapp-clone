import React from 'react'
import { auth, provider } from '../firebase'
import './Login.css'
import { useStateValue } from './StateProvider'


const Login = () => {
const [{} , dispatch] = useStateValue
 const signIn =() => {
    auth.signInWithPopup(provider)
    .then(result => {
        dispatch({
            type : "SET_USER",
            user : result.user
        })
    })
    .catch(error => alert(error.message))
 }
 
   return (
    <div className='login'>
        <div className='login__container'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1WlAEVZe5Q4Axrw1PlYSTJ_3LHOYKfVCjA&usqp=CAU' alt='whatsapp'/>
            <div className='login__text'>
                <h1>Sign in to whatsapp</h1>
            </div>
            <button onClick={signIn} >sign in with google</button>
        </div>
    </div>
  )
}

export default Login
