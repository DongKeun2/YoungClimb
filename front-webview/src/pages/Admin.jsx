import React from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

import AdminHome from './admin/AdminHome'
import AdminLogin from './admin/AdminLogin'
import AdminReportList from './admin/AdminReportList'
import AdminReportDetail from './admin/AdminReportDetail'

import '../App.css'
import { useEffect } from 'react'

const Admin = () => {
  const location = useLocation()
  const isAuthenticated = useSelector(state=>state.authToken.authenticated)
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/admin')
    }
    if (!isAuthenticated && location.pathname!=='/admin/login'){
      navigate('/admin/login')
      alert('로그인 후 사용 가능합니다.\n관리자 계정으로 로그인바랍니다.')
    }
  },[])

  return (
      <div className='adminBox'>
          <Routes>
            <Route
              exact="true"
              path=""
              element={
                <AdminHome/>
              }
            />
            <Route
              path="login"
              element={
                <AdminLogin/>
              }
            />
            <Route
              path="reportList"
              element={
                <AdminReportList/>
              }            
            />
            <Route
              path="reportDetail/:reportId"
              element={
                <AdminReportDetail/>
              }            
            />
          </Routes>  
        </div>       
  )
}

export default Admin