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
import { Chart } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
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

function StoreChart({ centerTotalInfo }) {
  const levelBoardCount = useSelector(state => state.adminInfo?.levelBoardCount)

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

  function getTopLevelList() {
    const topLevelList = levelBoardCount?.slice()
    topLevelList?.sort((a, b) => b.count - a.count)
    return topLevelList
  }

  function getLevelLabel() {
    const levelLabelList = getTopLevelList()
      ?.slice(0, 5)
      ?.map(item => item.name)
    return levelLabelList
  }

  function getLevelData() {
    const dataList = getTopLevelList()
      ?.slice(0, 5)
      ?.map(item => item.count)
    return dataList
  }

  const LevelData = {
    labels: getLevelLabel(),
    datasets: [
      {
        id: 1,
        label: '게시글 수',
        min: 0,
        max: 100,
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        data: getLevelData(),
      },
    ],
  }

  return (
    <div className="centerContainer">
      <div className="totalCenterBox">
        <div className="detailCenterName">전체 지점</div>
      </div>
      <div className="totalCenterBox ">
        <p className="totalDescription">
          작성된 게시물 수 상위 5개 지점의 그래프를 나타냅니다.
        </p>
      </div>
      <div className="totalChartBox">
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
      <div className="detailCenterBox totalDescription">
        작성된 게시물 수 상위 5개 난이도의 그래프를 나타냅니다.
      </div>
      <div className="totalChartBox">
        <Chart
          type="bar"
          datasetIdKey="id"
          data={LevelData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default StoreChart
