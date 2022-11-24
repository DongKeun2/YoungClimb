import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'
// import { Chart } from 'react-chartjs-2'

import api from '../../util/api'
import axiosTemp from '../../util/axios'
import { setCenterInfo } from '../../reducer/slice/AdminInfoSlice'
import './store.css'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// )

function DetailChart({ focusCenter, setFocusCenter }) {
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

  function getLabel() {
    const labelList = centerInfo?.centerBoardDetailList?.map(item => item.color)
    return labelList
  }

  function getData() {
    const dataList = centerInfo?.centerBoardDetailList?.map(
      item => item.boardNum
    )
    return dataList
  }

  const data = {
    labels: getLabel(),
    datasets: [
      {
        id: 1,
        label: '게시글 수',
        min: 0,
        max: 100,
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        data: getData(),
      },
    ],
  }

  return (
    <div className="centerContainer">
      <div className="detailBackBox">
        <div className="detailBack" onClick={() => setFocusCenter(0)}>
          지점 나가기
        </div>
      </div>
      <div className="detailCenterBox">
        <div className="detailCenterName">{centerInfo?.centerName}</div>
      </div>

      <div className="detailChartBox">
        {/* <Chart type="line" datasetIdKey="id" data={data} /> */}
      </div>
    </div>
  )
}

export default DetailChart
