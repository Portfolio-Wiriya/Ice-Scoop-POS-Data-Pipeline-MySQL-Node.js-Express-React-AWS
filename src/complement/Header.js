import React, { useState, useEffect } from 'react';
import logo from '../assets/svg/logo.png';
import './TaskBar.css';

function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <header className='pos-header'>
      <div className='pos-header-left'>
        <img src={logo} className="logo-header" alt="logo" />
        <div className='pos-header-divider'></div>
        <div>
          <p className='pos-header-title'>ICE<span>-SCOOP</span></p>
          <p className='pos-header-sub'>ระบบขายหน้าร้าน</p>
        </div>
      </div>

      <div className='pos-header-right'>
        <div className='pos-header-time'>
          {dateStr}
          <strong>{timeStr}</strong>
        </div>

        <div className='pos-user-chip'>
          <div className='pos-user-avatar'>A</div>
          <div className='pos-user-info'>
            <p className='pos-user-name'>Admin</p>
            <p className='pos-user-role'>ผู้ดูแลระบบ</p>
          </div>
        </div>

        {/* <button className='pos-logout-btn' title='ออกจากระบบ'>⏻</button> */}
      </div>
    </header>
  );
}

export default Header;