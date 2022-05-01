import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
  + (currentdate.getMonth() + 1) + "/"
  + currentdate.getFullYear()


const MarkAttendance = () => {

  const navigate = useNavigate()
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", markedDate: "" });

  const markAttendancePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        credentials: "include"
      })
      const data = await res.json()
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone, markedDate: data.markedDate })
  

      if (!res.status == 200) {
        throw new Error(res.error)
      }
    }
    catch (err) {
      navigate("/login")
    }
  }

  useEffect(() => {
    markAttendancePage();
  }, [])


  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setUserData({ ...userData, [name]: value })
  }

  const addMarkedAttendanceDate = async(e) => {
    e.preventDefault()
    const { name, email, phone, markedDate } = userData
    const res = await fetch('/mark_attendance', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, markedDate })
    })
    //givinf syntax error
    // const data = res.json();
    const data = await res.text();

    if (!data || !markedDate) {
      toast.error('Error In marking Attendance ', {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: true
      });

    } else {
      toast.success('Attendance Marked Successfully', {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: true
      });
      setUserData({ ...userData, markedDate: "" })
    }
  }


  return (
    <div>
      <div className="container">
        <div className="col-md-6 mx-auto text-center">
          <div className="header-title">
            <h1 className="wv-heading--title">
              Mark you Attendance here
            </h1>
            <h2 className="wv-heading--subtitle">
              Today's Date : {datetime}
            </h2>
          </div>
        </div>
        <br /><br />
        <div className="row">
          <div className="col-md-4 mx-auto">
            <div className="myform form ">
              <form method='POST'>
                <div className="form-group">
                  <input type="text" name="name" className="form-control my-input" id="name"
                    value={userData.name}
                    placeholder="Name" />
                </div>
                <div className="form-group">
                  <input type="email" name="email" className="form-control my-input" id="email"
                    value={userData.email}
                    placeholder="Email" />
                </div>

                <div className="form-group">
                  <input type="number" min="0" name="phone" id="phone" className="form-control my-input"
                    value={userData.phone}
                    placeholder="Phone" />
                </div>

                <div className="form-group">
                  <input type="date" name="markedDate" className="form-control my-input" id="date"
                    value={userData.markedDate}
                    onChange={handleInputs}
                    placeholder="date" />
                </div>

                <div className="d-flex justify-content-end pt-3">
                  <input type="submit" className="btn btn-warning btn-lg ms-2" onClick={addMarkedAttendanceDate} value="Register" />
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MarkAttendance