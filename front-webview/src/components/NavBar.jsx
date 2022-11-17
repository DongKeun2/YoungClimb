import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/img/Logo.png'
import '../App.css'

const NavBar = () => {
  return (
  <>
    <div style={{height:'48px'}}></div>
    <div className='navbarContainer'>
      <Link to='/admin'>
        <img src={Logo} style={{height:'48px'}} alt="" />
      </Link>
      <div className='linkContainer'>
        <NavLink 
          to='/admin/center'
          className={({ isActive }) =>
          isActive ? 'activeClass' : 'inactiveClass'
           }
        >지점</NavLink>
        <NavLink
          to='/admin/reportList'
          className={({ isActive }) =>
                isActive ? 'activeClass' : 'inactiveClass'
              }

        >신고</NavLink>
        <div className='inactiveClass'>로그아웃</div>
      </div>
    </div>
  </>
  )
}

export default NavBar