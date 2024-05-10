'use client'



import React, { useEffect, useState, useContext } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { Axios } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation.js';
import Link from 'next/link.js';
import { userContext } from '../../../context/page';


const Login = () => {




    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const Router = useRouter();
    const [state, setState] = useContext(userContext);




    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            setLoading(true);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/Login`, {
                email,
                password,

            });
            setState({
                user: data.user,
                token: data.token
            })
            window.localStorage.setItem("auth", JSON.stringify(data));
            toast.success("User Logged in Successfully");
            setLoading(false);
            Router.push("/");
        }
        catch (error) {
            toast.error(error);
            setLoading(false);
        }


    }

    return (
        <div className='container col-md-4 '>
            <div className='row d-flex justify-content-center align-items-center '>
                <div className='col-md-8' />
                <h1 className='d-flex align-items-center justify-content-center mt-3 mb-3' style={{ fontSize: '2rem', color: '#fff', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Login</h1>
                <form className='shadow-lg p-3 mb-5 bg-white rounded' >
                    <ToastContainer position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <div className="mb-3 col-md-15">
                        <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(event) => { setEmail(event.target.value) }
                        } />
                    </div>
                    <div className="mb-3 col-md-15">
                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(event) => { setPassword(event.target.value) }
                        } />
                    </div>
                    <div className='d-flex '>
                        <button type="submit" className="btn btn-primary bg-dark " onClick={handleSubmit} disabled={!password || !email}>{
                            loading ? (<>
                                <span>Loading &nbsp;</span>
                                <span className='spinner-border spinner-border-sm' role='status' area-hidden='true'></span>
                            </>) : ('Login')
                        }</button>
                        <p className='m-3'>New User ?  <Link href="/Register">Click here...</Link></p>

                    </div>


                </form>
            </div>
        </div>



    )


}

export default Login;