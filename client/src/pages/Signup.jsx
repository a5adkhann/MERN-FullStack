import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2000/signup", { name, email, password });
            toast.success(response.data.message);

            setName("");
            setEmail("");
            setPassword("");
        }
        catch (err) {
            toast.error(err);
        }
    }
    return (
        <>
            <div className='flex justify-center my-14'>
                <form onSubmit={handleSignUp}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Signup</legend>

                        <label className="label">Name</label>
                        <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button className="btn btn-neutral mt-4">Signup</button>
                    </fieldset>
                </form>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default Signup
