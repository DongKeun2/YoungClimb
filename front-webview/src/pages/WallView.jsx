import React from 'react'
import { useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Walls from './Walls'

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
      <Walls centerId={centerId} wallId={wallId}/>
    </div>
  )
}

export default WallView