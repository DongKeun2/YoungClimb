import React from 'react'
import { useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Test from './Test'
import Test2 from './Test2'

const WallView = () => {
  const params = useParams()
  const navigate = useNavigate()
  const {centerId, wallId} = params
  useEffect(()=>{
    if (!centerId||!wallId) {
      navigate('/notFound')
    }
  },[]
  )

  return (
    <div>WallView
      <div>{centerId}</div>
      <div>{wallId}</div>
      <Test></Test>
    </div>
  )
}

export default WallView