import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { IoIosHelpCircle } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";



const NavigationBar = () => {
  return (
    <div>
      <div className="side-nav">
        <div className="nav-logo">
          <span><FaBrain size={40} /></span>
          <span className='nav-bar-title'>NeuraSage</span>
        </div>
        <div className="nav-items">
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <span className='items'>
              <FaHome size={20} />
              <span className='nav-item-text'>Home</span>
            </span>
          </NavLink>

          <NavLink to="/display_detection" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} activeClassName="active">
            <span className='items'>
              <FaBrain size={20} />
              <span className='nav-item-text'>Disease Detection</span>
            </span>
          </NavLink>

          <NavLink to="/cognitive" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <span className='items'>
              <CgNotes size={20} />
              <span className='nav-item-text'>Cognitive Assesment</span>
            </span>
          </NavLink>
        </div>
        <div className="nav-footer">
          <NavLink className="nav-footer-item">
            <span className='items'>
              <IoIosHelpCircle size={20} />
              <span className='nav-item-text'>Help</span>
            </span>
          </NavLink>

          <NavLink className="nav-footer-item">
            <span className='items'>
              <RiLogoutBoxRFill size={20} />
              <span className='nav-item-text'>LogOut</span>
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
