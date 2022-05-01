import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'



const Home = () => {
  const [userName, setUserName] = useState();

  const homePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const data = await res.json()
      setUserName(data.name)

      if (!res.status == 200) {
        throw new Error(res.error)
      }
    }
    catch (err) {
    }
  }

  useEffect(() => {
    homePage();
  }, [])

  return (
    <>
      <div className="splitdiv">
        <div className="centered">
          <h3>{userName ? `Hey ${userName}` : 'Hey User'}</h3>
          <p>Welcome to the Attendance Management System, <span><Link to = '/mark_attendance'>Mark Your Attendance Here</Link></span></p>
        </div>
      </div>
    </>
  )
}

export default Home