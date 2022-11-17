import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminHome from './admin/AdminHome'
import AdminLogin from './admin/AdminLogin'
import AdminReportList from './admin/AdminReportList'
import AdminReportDetail from './admin/AdminReportDetail'

const Admin = () => {

  return (
      <div>
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
              path="reportDetail"
              element={
                <AdminReportDetail/>
              }            
            />
          </Routes>  
        </div>       
  )
}

export default Admin