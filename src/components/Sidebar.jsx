import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import AuthContext from '../context/Auth/AuthContext';



const Sidebar = () => {

  const {location} = useContext(AuthContext)
  
  return (
    <div className="w-64 bg-gray-100 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-5">Receptionist</h1>
      <ul className="list-none mb-5">
        <li className="mb-5">
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Home
          </a>
        </li>
        <li className="mb-5">
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Profile
          </a>
        </li>
        <li className='mb-5'>
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Logout
          </a>
        </li>
        <li>
        <Button variant="contained">
          <a href={`https://ntechzy.in/?utm_source=direct_visit&campaign_id=off_rec_${location}`}>
            Add Offline Visit
          </a>
        </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

