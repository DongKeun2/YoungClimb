import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import OverviewBox from '../../components/OverviewBox'

import '../../components/center/store.css'

function AdminStoreManage() {
  const { centerName, centerId } = useParams()
  const navigate = useNavigate()

  return (
    <div className="height100">
      <NavBar />
      <div className="homeMainDiv">
        <OverviewBox />
        <div className="mainBoardContainer">
          <div className="storeManageTitleBox">
            <div className="storeManageTitle">관리 지점 상세보기</div>
            <div className="storeManageTitle">
              {centerName} 매니저만 접근 가능합니다.
            </div>
            <div
              onClick={() => navigate('/admin/center', { state: centerId })}
              className="storeManageBackBtn"
            >
              뒤로가기
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStoreManage
