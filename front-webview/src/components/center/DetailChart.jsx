import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCenterInfo } from '../../reducer/slice/AdminInfoSlice'
import api from '../../util/api'
import axiosTemp from '../../util/axios'
import './store.css'

function DetailChart({ focusCenter }) {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.authToken.accessToken)

  const centerInfo = useSelector(state => state.adminInfo.centerInfo)

  useEffect(() => {
    axiosTemp
      .get(api.fetchCenterInfo(focusCenter), {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(res => {
        dispatch(setCenterInfo(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }, [focusCenter])

  return (
    <div className="centerContainer">
      <div className="centerBox">
        센터 정보
        <div>{centerInfo?.centerId}</div>
        <div>{centerInfo?.centerName}</div>
      </div>

      <div className="chartBox">차트</div>
    </div>
  )
}

export default DetailChart
