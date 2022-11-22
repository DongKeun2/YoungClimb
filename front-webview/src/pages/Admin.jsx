import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import AdminHome from "./admin/AdminHome";
import AdminLogin from "./admin/AdminLogin";
import AdminReportList from "./admin/AdminReportList";
import AdminReportDetail from "./admin/AdminReportDetail";
import AdminStore from "./admin/AdminStore";

import "../App.css";
import { useEffect } from "react";

const Admin = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.authToken.authenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/report");
    }
    if (!isAuthenticated && location.pathname !== "/admin/login") {
      navigate("/admin/login");
      alert("로그인 후 사용 가능합니다.\n관리자 계정으로 로그인바랍니다.");
    }
  }, []);

  return (
    <div className="adminBox">
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route exact="true" path="report" element={<AdminHome />} />
        {/* <Route
              path="reportList"
              element={
                <AdminReportList/>
              }            
            /> */}
        <Route path="reportDetail/:reportId" element={<AdminReportDetail />} />
        <Route path="center" element={<AdminStore />}></Route>
        <Route exact="false" path="" element={<AdminHome />} />
      </Routes>
    </div>
  );
};

export default Admin;
