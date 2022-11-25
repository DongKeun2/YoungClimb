import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
  BarElement,
} from 'chart.js'
import { Bar, Chart } from 'react-chartjs-2'

import api from '../../util/api'
import axiosTemp from '../../util/axios'
import { setCenterInfo } from '../../reducer/slice/AdminInfoSlice'
import './store.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
)

const levelColorDict = {
  빨강: '#F24E4E',
  주황: '#F0A242',
  노랑: '#F8E437',
  초록: '#55A74D',
  파랑: '#485FB2',
  남색: '#2A3C7A',
  보라: '#711492',
  흰색: '#FAFAFA',
  갈색: '#8F7A5A',
  검정: '#262626',
  핑크: '#EF6790',
  회색: '#A4A4A4',
  하늘: '#ACD4F1',
  예시: {
    backgroundColor: '#3B4BA0',
    fontColor: 'white',
  },
}

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

  function getBG() {
    const backColorList = centerInfo?.centerBoardDetailList?.map(
      item => levelColorDict[item.color]
    )
    return backColorList
  }

  const data = {
    labels: getLabel(),
    datasets: [
      {
        id: 1,
        label: '게시글 수',
        min: 0,
        max: 100,
        borderColor: 'black',
        backgroundColor: getBG(),
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
        <Chart
          type="bar"
          datasetIdKey="id"
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      <div className="detailLinkBox">
        <Link
          to={`/admin/center/${centerInfo?.centerId}/${centerInfo?.centerName}`}
        >
          <div>상세보기</div>
        </Link>
      </div>
    </div>
  )
}

export default DetailChart
