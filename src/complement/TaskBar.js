import React, { useState, useEffect } from 'react';
import './TaskBar.css'
import { FiShoppingCart, FiBox, FiGrid } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import logo from '../assets/svg/logo.png'

function TaskBar() {
    const menuItems = [
        { label: 'POS', path: '/POSView', icon: <FiShoppingCart /> },
        { label: 'Stock', path: '/InventoryView', icon: <FiBox /> },
        { label: 'Dashboard', path: '/DashBoard', icon: <FiGrid /> },
    ];

  return (

    <div className='con-pos'>
      <div className='pos-taskbar'>
              {/* <p className='pos-menu-caption'>เมนูหลัก</p> */}
              <div className='pos-menu'>
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `pos-menu-item ${isActive ? 'active' : ''}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
        </div>

    </div>
  )
}


export default TaskBar;