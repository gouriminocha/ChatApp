import React, {useContext} from 'react'
import { UserContext } from '../context/user.context'
import { useState } from 'react'
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';



function UserAuth({children}) {

    const {user} = useContext(UserContext)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    
    useEffect(() =>{
        
    if(user){
        setLoading(false)
    }
        if(!token){             //no user has logged in yet
            navigate('/login')
        }

        if(!user){
            navigate('/login')
        }


    },[])

    if(loading){
        return <div>Loading...</div>
    }


  return (
   <>
   {children}
   </>
  )
}

export default UserAuth