import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:2000/getusers");
    console.log(response.data.users);
    return response.data.users
  }
  catch (err) {
    console.log(err);
  }
}

const UserData = ({refresh, setRefresh}) => {
  const [userData, setUserData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [searchUser, setSearchUser] = useState("");
  
  
  const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:2000/getusers");
    console.log(response.data.users);
  }
  catch (err) {
    console.log(err);
  }
}

  useEffect(() => {
    fetchData();
  }, [refresh]);
  
  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:2000/deleteuser/${id}`);
    console.log(response.data.message);
    toast.success(response.data.message, {
      iconTheme: {
        primary: "red"
      }
    })
    fetchData();
  }

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
  }

  const saveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:2000/updateuser/${editingId}`, {
        name: editName,
        email: editEmail
      })
      toast.success(response.data.message);
      setEditingId(null);
      setEditName("");
      setEditEmail("");
      setRefresh(!refresh);
    }
    catch (err) {
      console.log(err);
      toast.error(err);
    }
  }
  const handleSearch = async () => {
    if (!searchUser.trim()) {
      fetchData();
      return;
    }
    try {
      const response = await axios.get(`http://localhost:2000/search-user/${searchUser}`);
      console.log(response.data.filteredUsers);
      setUserData(response.data.filteredUsers);
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {userData.length > 0 ?
        <>
          <div className="flex justify-center my-4">
            <input type="text" className='border border-gray-700 w-[50%] p-1 px-4 focus:outline-none focus:border-red-600' placeholder='Search users'
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              onKeyUp={handleSearch}
            />
          </div>

          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-[50%] mx-auto mb-24">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {userData.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>

                    <td>
                      {editingId == user._id ?
                        <input className='border border-blue-500 p-2 w-[100%] focus:outline-none focus:border-red-600' type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        :
                        user.name
                      }
                    </td>

                    <td>
                      {editingId == user._id ?
                        <input className='border border-blue-500 p-2 w-[100%] focus:outline-none focus:border-red-600' type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                        :
                        user.email
                      }
                    </td>
                    <td className='space-x-2'>
                      {editingId == user._id ?

                        <>
                          <button className="btn btn-soft btn-success" onClick={saveEdit}>Save</button>
                          <button className="btn btn-soft btn-warning" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                        :
                        <>
                          <button className="btn btn-soft btn-info" onClick={() => handleEdit(user)}>Edit</button>
                          <button className="btn btn-soft btn-error" onClick={() => handleDelete(user._id)}>Delete</button>
                        </>
                      }
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </>
        :
        null}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default UserData