import React, { useState } from 'react'
import UserData, { fetchData } from './UserData'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2000/adduser", {
        name, email
      })
      toast.success(response.data.message);
      console.log(response.data.message);
      setName("");
      setEmail("");
      setRefresh(!refresh);
    }
    catch (err) {
      console.log(err);
      toast.error(err);
    }
  }
  return (
    <>
      <div className='flex justify-center my-14'>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Add User</legend>

            <label className="label">Name</label>
            <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

            <button className="btn btn-neutral mt-4">Add User</button>
          </fieldset>
        </form>
      </div>

      <UserData refresh={refresh} setRefresh={setRefresh}/>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default UserForm
