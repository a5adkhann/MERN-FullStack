import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signin = ({LoginUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2000/signin", { email, password });
            toast.success(response.data.message);
            console.log(response);
            LoginUser(response.data.registeredUser);
            setEmail("");
            setPassword("");    
            navigate("/")
        }
        catch (err) {
            toast.error(err);
        }
    }
    return (
        <>
            <div className='flex justify-center my-14'>
                <form onSubmit={handleSignIn}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Signin</legend>

                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button className="btn btn-neutral mt-4">Signin</button>
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

export default Signin
