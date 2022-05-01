import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import { toast } from 'react-toastify';



const Logout = () => {
  const {state, dispatch} = useContext(userContext)
    //this time conenct backend using using promise
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            credentials: "include"
        }).then((res) => {
            dispatch({ type: 'USER', payload: false })
            navigate('/login', { replace: true })
            if (!res.status == 200) {
                throw new Error(res.error)
            }
            toast.info('Logout Successfully', {
                position: "top-right",
                theme: "colored",
                autoClose: 3000,
                hideProgressBar: true
              });
        }).catch((err) => {
        })
    })
    return (
        <div></div>
    )
}

export default Logout