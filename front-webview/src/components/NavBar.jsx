import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { DELETE_TOKEN } from '../reducer/slice/TokenSlice'
import { removeRefreshToken } from '../reducer/slice/Cookie'
import axiosTemp from '../util/axios'
import api from '../util/api'
import Logo from '../assets/img/Logo.png'
import '../App.css'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = useSelector(state=>state.authToken.accessToken)
  const Logout = ()=>{
    axiosTemp.post(api.logout(),{}, {headers:{Authorization: `Bearer ${accessToken}`}})
    .then((res)=>{
      navigate('/admin/login') 
      alert('성공적으로 로그아웃 되었습니다.')
      dispatch(DELETE_TOKEN())
      removeRefreshToken()
    })
    .catch((err)=>console.log(err))
  }

  return (
  <>
    <div style={{height:'48px'}}></div>
    <div className='navbarContainer'>
      <div className='navInnerContainer'>
        <Link to='/admin'>
          <img src={Logo} style={{height:'48px'}} alt="" />
        </Link>
        <div className='linkContainer'>
          {/* <NavLink 
            to='/admin/center'
            className={({ isActive }) =>
            isActive ? 'activeClass' : 'inactiveClass'
            }
          >지점</NavLink> */}
          <NavLink
            to='/admin'
            className={({ isActive }) =>
                  isActive ? 'activeClass' : 'inactiveClass'
                }
          >신고</NavLink>
          <div className='inactiveClass' onClick={Logout}>로그아웃</div>
        </div>
      </div>
    </div>
  </>
  )
}

export default NavBar