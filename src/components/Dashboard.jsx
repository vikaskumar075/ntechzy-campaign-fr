import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import AuthContext from "../context/Auth/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const [studentData, setStudentData] = useState([]);
  const {location, setLocation} = useContext(AuthContext);

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    console.log(dateString)
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const filterStudentData = studentData.filter((element) => {
    return element.location === location
  })

  // console.log(filterStudentData)

  const today = new Date(); // Get today's date
  const todaysAppointments = filterStudentData.filter((appointment) => {
    const appointmentDate = new Date(appointment.DateToVisit);
    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    );
  });

  const upcomingAppointments = filterStudentData.filter((appointment) => {
    const appointmentDate = new Date(appointment.DateToVisit);
    return appointmentDate > today;
  });


  const getStudentData = async () => {
    try {
      const res = await toast.promise(
        axios.get(
          `${process.env.REACT_APP_NTECHZY}/api/v1/bookedSlot`
        ),

        {
          loading: "Fetching Data ...",
          success: "Data fetched Successfully",
          error: "Failed to fetch Data"
        }

      )
      setStudentData(res.data);
    } catch (error) {
      setStudentData([]);
    }
  };

  // useEffect(() => {
  //   getStudentData();
  // }, []);

  useEffect(() =>{
    console.log(location)
  }, [location])


  useEffect(() =>{
    const savedLocation = sessionStorage.getItem("location")
    const isAuthenticated = sessionStorage.getItem("isAuthenticated")

    if(savedLocation && isAuthenticated){
      setLocation(savedLocation);
    }

    getStudentData();
  }, [])


  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-5">
        <h1 className="text-3xl font-bold mb-5">Receptionist Dashboard</h1>
        <div className="flex">
          <div className="w-3/4 pr-5">
            <h2 className="text-2xl font-bold mb-5">Today's Appointments</h2>
            <div className="flex flex-col gap-5 ">
              {todaysAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white p-5 rounded shadow-md"
                >
                  <h3 className="text-lg font-bold">{appointment.name}</h3>

                  <p>Contact Number: {appointment.contactNumber}</p>

                  <p>Email: {appointment.email}</p>

                  <p>WhatsApp Number: {appointment.whatsappNumber}</p>

                  <p>Date to Visit: {formatDate(appointment.DateToVisit)}</p>
                  <p>Location: {appointment.location}</p>

                </div>
              ))}
            </div>
          </div>
          <div className="w-1/4 pl-5">
            <h2 className="text-2xl font-bold mb-5">Upcoming Appointments</h2>
            <div className="flex flex-col gap-5">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white p-5 rounded shadow-md"
                >
                  <h3 className="text-lg font-bold">{appointment.name}</h3>

                  <p>Contact Number: {appointment.contactNumber}</p>

                  <p>Email: {appointment.email}</p>

                  <p>WhatsApp Number: {appointment.whatsappNumber}</p>
                  <p>Date to Visit: {formatDate(appointment.DateToVisit)}</p>
                  <p>Location: {appointment.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
