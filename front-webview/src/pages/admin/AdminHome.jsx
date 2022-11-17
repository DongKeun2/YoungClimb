import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import NavBar from '../../components/NavBar'
import OverviewBox from '../../components/OverviewBox'
import axiosTemp from '../../util/axios'
import api from '../../util/api'

const AdminHome = () => {
  const accessToken = useSelector(state=>state.authToken.accessToken)
  useEffect(()=>{
    axiosTemp.get(api.adminInfo(),{headers:{Authorization: `Bearer ${accessToken}`}}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
  },[accessToken])
  return (
    <div>
      <NavBar/>
      <OverviewBox/>
    </div>
  )
}

export default AdminHome