import React from 'react'
import { useNavigate } from 'react-router-dom'

const ReportItem = (props) => {
  const navigate= useNavigate()
  const {item} = props
  const tagCol = {
    0: 'pinkBg',
    1: 'blueBg',
    2: 'grayBg'
  }

  const tagCon = {
    0:'미처리',
    1:'처리 완료',
    2:'보류'
  }

  const reasons = {
    '스팸' : '스팸',
    '상품 판매 등 상업 활동':'상업 활동',
    '혐오 발언 및 상징': '혐오 발언',
    '오해의 소지가 있는 콘텐츠 또는 사기': '오해의 소지/사기',
    '실제 문제 난이도와 게시물상 난이도가 다릅니다':'난이도 상이',
    '풀이를 완료하지 못한 문제를 완료로 표기했습니다':'풀이 실패'

  }

  const toDetail = () =>{
    navigate(`/admin/reportDetail/${item.reportId}`)
    
  }
  
  return (
    <div className='reportItem' onClick={toDetail}>
      <div>
      <span className='reportItemTitle'>[{reasons[item.reportReason]}]</span>
      <span className='reportItemContent'>게시물 Id: {item.boardId}</span>  
      </div>
      <div className={`reportTag ${tagCol[item.treated]}`}>{tagCon[item.treated]}</div>
    </div>
  )
}

export default ReportItem