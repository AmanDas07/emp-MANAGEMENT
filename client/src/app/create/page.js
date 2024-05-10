'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../../../context/page';
import { useRouter } from 'next/navigation.js';
import { ToastContainer, toast } from 'react-toastify';


function EmployeeForm() {
    const [state] = useContext(userContext);
    const rc = JSON.parse(localStorage.getItem('record'));

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '',
        imgUpload: null,
        uniqueId: nanoid()
    });
    useEffect(() => {
        if (rc) {
            setFormData({
                name: rc.name || '',
                email: rc.email || '',
                mobileNo: rc.mobileNo || '',
                designation: rc.designation || '',
                gender: rc.gender || '',
                course: rc.course || '',
                imgUpload: null
            });
        }
    }, []);
    const Router = useRouter();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                course: checked ? value : ''
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prevState => ({
                ...prevState,
                imgUpload: e.target.files[0]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        const employeeData = new FormData()
        employeeData.append('name', formData.name)
        employeeData.append('email', formData.email)
        employeeData.append('mobileNo', formData.mobileNo)
        employeeData.append('designation', formData.designation)
        employeeData.append('gender', formData.gender)
        employeeData.append('course', formData.course)
        employeeData.append('imgUpload', formData.imgUpload)
        employeeData.append('uniqueId', formData.uniqueId)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/emp/upload`, employeeData,
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    }
                }
            );

            if (data.success == true) {
                toast.success(data.message);
                window.localStorage.removeItem('record');
                Router.push("/");
            }
            else {
                toast.error(data.message);
                window.localStorage.removeItem('record');
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const employeeData = new FormData();
        employeeData.append('name', formData.name);
        employeeData.append('email', formData.email);
        employeeData.append('mobileNo', formData.mobileNo);
        employeeData.append('designation', formData.designation);
        employeeData.append('gender', formData.gender);
        employeeData.append('course', formData.course);

        if (formData.imgUpload) {
            employeeData.append('imgUpload', formData.imgUpload);
        }

        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API}/emp/update/${rc._id}`, employeeData, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                Router.push("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating record:', error);
            toast.error("Failed to update record.");
        }
    }
    return (
        <>
            <h2 className='d-flex align-items-center justify-content-center ' style={{ fontSize: '2rem', color: '#fff', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Employee List</h2>
            <div style={{ padding: '20px' }}>
                <div style={{ paddingBottom: '20px' }}>
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
                    <div className="container " style={{ maxWidth: '600px', marginTop: '20px auto', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', backgroundColor: 'white' }}>
                        <form onSubmit={window.localStorage.getItem('record') == null ? handleSubmit : handleUpdate}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mobileNo" className="form-label">Mobile No</label>
                                <input type="text" className="form-control" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="designation" className="form-label">Designation</label>
                                <select className="form-control" id="designation" name="designation" value={formData.designation} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>Gender</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="male">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Course</label>
                                <div>
                                    {['MCA', 'BCA', 'BSC'].map(course => (
                                        <div className="form-check form-check-inline" key={course}>
                                            <input className="form-check-input" type="checkbox" id={course} name="course" value={course} checked={formData.course === course} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor={course}>{course}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="imgUpload" className="form-label">Img Upload</label>
                                <input type="file" className="form-control" id="imgUpload" name="imgUpload" onChange={handleFileChange} style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }} />
                            </div>

                            {window.localStorage.getItem('record') == null ? (
                                <button type="submit" className="btn btn-primary" >Submit</button>
                            ) : (
                                <button type="submit" className="btn btn-primary" >Update</button>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeForm;
