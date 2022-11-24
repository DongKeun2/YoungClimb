import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from '../../components/NavBar'
import OverviewBox from '../../components/OverviewBox'
import MainBoard from '../../components/MainBoard'

import axiosTemp from '../../util/axios'
import api from '../../util/api'
import { set_adminInfo } from '../../reducer/slice/AdminInfoSlice'

import '../../App.css'

const AdminHome = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.authToken.accessToken)
  useEffect(() => {
    if (accessToken) {
      console.log('어드민 정보 요청')
      axiosTemp
        .get(api.adminInfo(), {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(res => {
          console.log('어드민 정보 요청 성공')
          dispatch(set_adminInfo(res.data))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])
  return (
    <div className="height100">
      <NavBar />
      <div className="homeMainDiv">
        <OverviewBox />
        <MainBoard />
      </div>
    </div>
  )
}

export default AdminHome
