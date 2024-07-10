import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import AuthContext from "../context/Auth/AuthContext";

const Dashboard = () => {

  const [studentData, setStudentData] = useState([]);
  const {location, setLocation} = useContext(AuthContext);


  const filterStudentData = studentData.filter((element) => {
    return element.location === location
  })


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
      const res = await axios.get(
        "http://192.168.29.89:4000/api/v1/bookedSlot"
      );
      setStudentData(res.data);
    } catch (error) {
      setStudentData([]);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  useEffect(() =>{
    console.log(location)
  }, [location])

  // useEffect(() => {
  //   console.log(studentData);
  // }, [studentData]);

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

                  {/* <p>Guardian Name: {appointment.guardianName}</p>

                  <p>District: {appointment.district}</p>

                  <p>State: {appointment.state}</p>

                  <p>Course Selected: {appointment.courseSelected}</p>

                  <p>Preferred College: {appointment.preferredCollege}</p>

                  <p>NEET Score: {appointment.neetScore}</p>

                  <p>NEET AIR: {appointment.neetAIR}</p> */}

                  <p>Date to Visit: {appointment.DateToVisit}</p>
                  <p>Location: {appointment.location}</p>

                  {/* <h4 className="text-lg font-bold">Remarks:</h4>
                  <ul>
                    {Object.keys(appointment.remarks).map((followUp, index) => (
                      <li key={index}>
                        <h5 className="text-md font-bold">{followUp}</h5>

                        <ul>
                          {appointment.remarks[followUp].map(
                            (remark, index) => (
                              <li key={index}>
                                <p>Subject: {remark.subject}</p>

                                <p>Updated At: {remark.updatedAt}</p>

                                {remark.additionalOption && (
                                  <p>
                                    Additional Option: {remark.additionalOption}
                                  </p>
                                )}

                                {remark.preBookingAmount && (
                                  <p>
                                    Pre-Booking Amount:{" "}
                                    {remark.preBookingAmount}
                                  </p>
                                )}
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul> */}
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

                  {/* <p>Guardian Name: {appointment.guardianName}</p>

                  <p>District: {appointment.district}</p>

                  <p>State: {appointment.state}</p>

                  <p>Course Selected: {appointment.courseSelected}</p>

                  <p>Preferred College: {appointment.preferredCollege}</p>

                  <p>NEET Score: {appointment.neetScore}</p>

                  <p>NEET AIR: {appointment.neetAIR}</p> */}

                  <p>Date to Visit: {appointment.DateToVisit}</p>
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
