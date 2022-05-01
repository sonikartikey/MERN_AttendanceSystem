import React, { useEffect, useState } from 'react'

const ViewRecords = () => {
  const [userData, setUserData] = useState();

  const viewRecords = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const data = await res.json()
      setUserData(data)

      if (!res.status == 200) {
        throw new Error(res.error)
      }
    }
    catch (err) {
    }
  }

  useEffect(() => {
    viewRecords();
  }, [])

  return (
    <>
      <div className='container-fluid mt-5'>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Marked Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {userData ? userData.markedDates.map((listValue, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{++index}</th>
                  <td>{userData.name}</td>
                  <td>{listValue.markedDate}</td>
                  <td><i class="fa fa-check" aria-hidden="true"></i></td>
                </tr>
              )
            }) : "No data"}

          </tbody>
        </table>


      </div>
    </>
  )
}

export default ViewRecords