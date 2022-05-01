import React, { useContext, useState } from 'react'

import { toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';


const Login = () => {

  const { state, dispatch } = useContext(userContext)

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {
    e.preventDefault()

    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = res.text()
    if (res.status === 400 || !data) {
      toast.error('Invalid Login', {
        position: "top-right",
        theme: "colored",
        autoClose: 2000,
        hideProgressBar: true
      });

    } else {
      toast.success('LoggedIn Successfully', {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: true
      });
      dispatch({ type: 'USER', payload: true })
      navigate('/');
    }
  }

  return (
    <>
      <form>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid" alt="Phone image" />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form method='POST'>
                  <div className="form-outline mb-4">
                    <input type="email" id="form1Example13" className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address" />
                  </div>


                  <div className="form-outline mb-4">
                    <input type="password" id="form1Example23" className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" />
                  </div>

                  <input type="submit" className="btn btn-primary btn-lg btn-block"
                    onClick={loginUser}
                    value="Log In" />

                </form>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}

export default Login