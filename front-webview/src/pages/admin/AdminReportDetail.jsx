import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import {useSelector} from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axiosTemp from '../../util/axios'
import api from '../../util/api'

const AdminReportDetail = (props) => {
  const navigate = useNavigate()
  const params = useParams()
  const reportId = params.reportId
  const accessToken = useSelector(state=>state.authToken.accessToken)
  // console.log(accessToken)
  const [reportDetail, setReportDetail] = useState({
    reportId:'',
    memberNickname:'',
    reportReason:'',
    boardId:'',
    boardMedia:'',
    boardContent:'',
    boardLevel:'',
  })

  useEffect(()=>{
    axiosTemp.get(api.reportDetail(reportId), {headers:{Authorization: `Bearer ${accessToken}`}})
    .then((res)=>{setReportDetail(res.data)})
    .catch((err)=>console.log(err))
  },[])

  const onSuspend = () =>{
      axiosTemp.post(api.reportHandlePostpone(reportId),{headers:{Authorization: `Bearer ${accessToken}`}})
      .then((res)=>{
        if(!alert('신고가 보류되었습니다.')){
          navigate('/admin')
        }
      })
      .catch((err)=>{console.log(err)})
  }

  const onDelete = () =>{
    axiosTemp.post(api.reportHandleDelete(reportId),{headers:{Authorization: `Bearer ${accessToken}`}})
    .then((res)=>{
      if(!alert('신고 게시물이 삭제되었습니다.')){
        navigate('/admin')
      }
    })
    .catch((err)=>{console.log(err)})
}

  const onPass = () =>{
    axiosTemp.post(api.reportHandlePass(reportId),{headers:{Authorization: `Bearer ${accessToken}`}})
    .then((res)=>{
      if(!alert('신고가 확인 처리 되었습니다.')){
        navigate('/admin')
      }
    })
    .catch((err)=>{console.log(err)})
  }


  return (
    <div className='height100'>
      <NavBar/>
      <div className='height90 flex paddingDetail'>
        <div className='width30 reportHandleBox'>
          <div className='policy'>Young Climb은 내부 <Link>규정</Link>에 따라 신고 건을 처리하고 있습니다. 게시물 유지 및 삭제 처리에 대한 규정을 참고하시어 처리바랍니다.</div>
          <div>
            <div className='reportHandleTitle'>신고 정보</div>
            <div className='reportContentBox'>
              <div className='reportContent'><strong>신고 ID:</strong> {reportDetail.reportId}</div>
              <div className='reportContent'><strong>신고자:</strong> {reportDetail.memberNickname}</div>
              <div className='reportContent'><div><strong>신고 사유:</strong></div> {reportDetail.reportReason}</div>
            </div>

            <div className='reportHandleTitle'>게시물 정보</div>
            <div className='reportContentBox'>
              <div className='reportContent'><strong>게시물 ID:</strong> {reportDetail.boardId}</div>
              <div className='reportContent'><strong>게시물 난이도:</strong> {reportDetail.boardLevel}</div>
            </div>
            
            <div className='width100 postpone handleBtn' onClick={onSuspend}><div className='textCenter'>보류</div></div>
            <div className='width100 pass handleBtn' onClick={onPass}><div className='textCenter'>게시물 유지 처리</div></div>
            <div className='width100 delete handleBtn' onClick={onDelete}><div className='textCenter'>게시물 삭제 처리</div></div>
          </div>


        </div>
        <video controls muted className='width60' src={reportDetail.boardMedia}></video>
      </div>
    </div>
  )
}

export default AdminReportDetail