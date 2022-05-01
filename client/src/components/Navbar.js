import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import { userContext } from '../App';


const Navbar = () => {
  const { state, dispatch } = useContext(userContext)

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li class="nav-item active">
            <Link class="nav-link" to="/">Home </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/mark_attendance">Mark-Attendance</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/view_records">View Records</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/logout">Logout</Link>
          </li>
        </>
      )
    } else {
      return (
        <>

          <li class="nav-item active">
            <Link class="nav-link" to="/">Home </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/mark_attendance">Mark-Attendance</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/login">Login</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/signup">Register</Link>
          </li>
        </>)
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Haaj`ri System</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            < RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar