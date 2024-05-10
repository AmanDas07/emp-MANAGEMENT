'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation.js';
import { userContext } from "../../context/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const [records, setRecords] = useState([]);
  const [state, setState] = useContext(userContext);
  const Router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const deleteRecord = async (id) => {
    try {

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API}/emp/deleteRecord/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      });
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error("Failed to Delete Record");
      console.error('Failed to delete record:', error);
    }
  };



  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/emp/records`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          }
        })
      setRecords(data.records);
      //console.log(data.records)

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  const fetchedRef = useRef(false);

  useEffect(() => {
    window.localStorage.removeItem('record');
  })


  useEffect(() => {
    if (!fetchedRef.current) {
      fetchData();
      console.log(records);
      fetchedRef.current = true;
    }
  }, [records]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filteredRecords = records.filter(record => {
        const name = record.name ? record.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const mobileNo = record.mobileNo ? record.mobileNo.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const email = record.email ? record.email.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const designation = record.designation ? record.designation.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const course = record.course ? record.course.includes(searchTerm) : false;
        const createdAt = record.createdAt ? record.createdAt.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        return name || mobileNo || email || designation || course || createdAt;
      });
      setRecords(filteredRecords);
    } else {
      fetchData();
    }
  }, [searchTerm]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const editRecord = async (record) => {
    localStorage.setItem('record', JSON.stringify(record));
    Router.push("/create")
  }



  return (
    <div className="container p-3">
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
      <h2 className='d-flex align-items-center justify-content-center  mb-3' style={{ fontSize: '2rem', color: '#fff', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Employee List</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '10px'
      }}>
        <button
          type="button"
          className="btn btn-primary m-3"
          onClick={() => { Router.push("/create") }}
        >
          Create Employee
        </button>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10px',
          backgroundColor: '#f2f2f2',
          borderRadius: '10px',
          width: '100%',
        }}>
          <input
            type="text"
            placeholder="Search records..."
            style={{
              width: '100%',
              marginRight: '10px',
              borderRadius: '5px',
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />

        </div>
      </div>

      <table className="table mt-3 " >
        <thead>
          <tr style={{ width: "100%" }}>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create-Date</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            return (
              <tr key={record._id}>
                <td>{record.uniqueId}</td>
                <td><img src={`data:${record.photo.contentType};base64,${Buffer.from(record.photo.data).toString('base64')}`} height="100"
                  width={"150px"} /></td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.mobileNo}</td>
                <td>{record.designation}</td>
                <td>{record.gender}</td>
                <td>{record.course}</td>
                <td>{record.createdAt.split('T')[0]}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm "
                    onClick={() => editRecord(record)}
                  >
                    Edit
                  </button>


                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this record?")) {
                        deleteRecord(record._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};


export default Home;