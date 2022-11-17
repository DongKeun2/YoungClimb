import React from 'react'

const OverviewBox = (props) => {
  const info = {
    "countCenter": 41,
    "countMember": 11,
    "countBoard": 24,
    "reportInfo": {
      "totalReport": 5,
      "countBefore": 5,
      "countIng": 0,
      "countCompleted": 0
  }}
  return (
    <div className='overviewBox'>
      <div>Overview</div>
      <div>
        <div>지점 수: {info.countCenter}</div>
        <div>회원 수: {info.countMember}</div>
        <div>게시물 : {info.countBoard}</div>
      </div>
      <div>Reports</div>
      <div>
        <div>전체 신고: {info.reportInfo.totalReport}</div>
        <div>미처리 신고: {info.reportInfo.countBefore}</div>
        <div>보류 신고: {info.reportInfo.countIng}</div>
        <div>처리 완료: {info.reportInfo.countCompleted}</div>
      </div>
    </div>
  )
}

export default OverviewBox