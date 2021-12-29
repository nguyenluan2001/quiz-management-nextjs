import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/slices/user';
const ProtectRoute = ({children}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const checkAuth = async () =>{  
          let res = await axios.get("/api/authentication/checkAuth")
          if(res.data.status === 401 ) {
            router.push("/signin")
          } else {
            console.log(res.data)
            dispatch(getUser(res.data));
          }
        }
        checkAuth()
      }, []);
    return (
        <>{children}</>
    )
}
export default ProtectRoute;