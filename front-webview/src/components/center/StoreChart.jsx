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

function StoreChart({ centerTotalInfo }) {
  function getTopCenterList() {
    const topCenterList = centerTotalInfo?.slice()
    topCenterList?.sort((a, b) => b.boardNum - a.boardNum)
    return topCenterList
  }

  function getLabel() {
    const labelList = getTopCenterList()
      ?.slice(0, 5)
      ?.map(item => item.name)
    return labelList
  }

  function getData() {
    const dataList = getTopCenterList()
      ?.slice(0, 5)
      ?.map(item => item.boardNum)
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
      <div className="detailCenterBox">
        <div className="detailCenterName">전체 지점</div>
      </div>
      <div className="detailCenterBox">
        전체 지점 중 게시물 수 상위 5개 지점의 그래프를 나타냅니다.
      </div>
      <div className="totalChartBox">
        {/* <Chart type="line" datasetIdKey="id" data={data} /> */}
      </div>
    </div>
  )
}

export default StoreChart
