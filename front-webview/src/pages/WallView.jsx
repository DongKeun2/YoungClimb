import React from 'react'
import { useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Test from './Test'

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
    <div>
      <Test centerId={centerId} wallId={wallId}></Test>
    </div>
  )
}

export default WallView