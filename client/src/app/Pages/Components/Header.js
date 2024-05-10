'use client'

import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../../../context/page';
import { useRouter } from 'next/navigation.js';

const Header = () => {
    const [state, setState] = useContext(userContext);
    const [currentTab, setTab] = useState("");
    const router = useRouter();

    const logoutController = () => {
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem('record');
        setState(null);
        router.push("/login");
    }


    useEffect(() => {
        typeof window !== 'undefined' && setTab(window.location.pathname)
    }, [])


    useEffect(() => {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(innerLink => innerLink.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }, [])

    return (

        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'gray', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="container">
                <Link className="navbar-brand" href="/"><img src="https://i.ibb.co/chdWVN0/2560px-Logo-EMS-svg.png" alt="2560px-Logo-EMS-svg" border="0" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-1">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>

                        {state != null ? (
                            <>

                                <button className="btn btn-secondary " type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                    {state && state.user && state.user.name}
                                </button>


                                <li className="nav-item">

                                    <a className="nav-link" style={{ cursor: 'pointer' }} onClick={logoutController}>Logout</a>

                                </li>
                            </>
                        ) : (<>   <li className="nav-item">
                            <Link legacyBehavior href="/Register">
                                <a className="nav-link" >Register</a>
                            </Link>
                        </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/login">Login</Link>
                            </li>
                        </>)}



                    </ul>

                </div>
            </div>
        </nav>

    )
}

export default Header