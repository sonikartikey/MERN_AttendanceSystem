import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", gender: "", course: "", phone: "", password: "", cpassword: ""
  })

  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault()
    const { name, email, gender, course, phone, password, cpassword } = user
    const res = await fetch('/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, gender, course, phone, password, cpassword })
    })

    // const data = await res.json();
    const data = res.text();
    if (res.status === 422 || !data) {
      toast.error('Registration Falied ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });

    } else {
      toast.success('Registered Successfully ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
      navigate('/login');
    }
  }

  return (
    <>
      <form method="POST">
        <section className="h-100 bg-dark">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-registration my-4">
                  <div className="row g-0">
                    <div className="col-xl-6 d-none d-xl-block">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                        alt="Sample photo" className="img-fluid"
                      />
                    </div>

                    <div className="col-xl-6">
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">Student registration form</h3>

                        <div className="form-outline mb-4">
                          <input type="text" className="form-control form-control-lg"
                            value={user.name}
                            onChange={handleInputs}
                            placeholder="Enter your full Name" name="name" />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="text" className="form-control form-control-lg"
                            value={user.email}
                            onChange={handleInputs}
                            placeholder="Enter Email" name="email" />
                        </div>


                        <div className="d-md-flex justify-content-start align-items-center mb-4 py-2" name="gender"
                          onChange={handleInputs} value={user.gender}>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="gender" id="femaleGender" value='female' />
                            <label className="form-check-label" for="femaleGender">Female</label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="gender" id="maleGender" value='male' />
                            <label className="form-check-label" for="maleGender">Male</label>
                          </div>

                          <div className="form-check form-check-inline mb-0">
                            <input className="form-check-input" type="radio" name="gender" id="otherGender" value='other' />
                            <label className="form-check-label" for="otherGender">Other</label>
                          </div>

                        </div>


                        <div className="form-outline mb-4">

                          <select id="form3Example99" className="form-control form-control-lg"
                            name="course" onChange={handleInputs} value={user.course}>
                            <option>Course</option>
                            <option>B.Tech</option>
                            <option>BCA</option>
                            <option>BBA</option>
                          </select>

                        </div>


                        <div className="form-outline mb-4">
                          <input type="number" id="form3Example9" className="form-control form-control-lg"
                            value={user.phone}
                            onChange={handleInputs}
                            placeholder="Phone Nummber" name="phone" />

                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" className="form-control form-control-lg"
                            value={user.password}
                            onChange={handleInputs}
                            placeholder="Password" name="password" />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" className="form-control form-control-lg"
                            value={user.cpassword}
                            onChange={handleInputs}
                            placeholder="Confirm Password" name="cpassword" />
                        </div>

                        <div className="d-flex justify-content-end pt-3">
                          <input type="submit" className="btn btn-warning btn-lg ms-2" onClick={postData}
                            value="Register" />

                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </ >
  )
}

export default Signup