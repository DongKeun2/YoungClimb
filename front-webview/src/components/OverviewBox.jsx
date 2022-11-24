import React from 'react'
import { useSelector } from 'react-redux'
import './components.css'

const OverviewBox = () => {
  const info = useSelector(state => state.adminInfo)

  return (
    <div className="overviewBox">
      <div className="overviewTitle">Overview</div>
      <div className="overviewContentBox">
        <div className="overviewContent">
          지점 수: <span className="marginleft10">{info?.countCenter}</span> 개
        </div>
        <div className="overviewContent">
          회원 수: <span className="marginleft10">{info?.countMember}</span> 명
        </div>
        <div className="overviewContent">
          게시물 : <span className="marginleft10">{info?.countBoard}</span> 개
        </div>
      </div>
      <div className="overviewTitle marginTop10">Reports</div>
      <div className="overviewContentBox">
        <div className="overviewContent">
          전체 신고:{' '}
          <span className="marginleft10">{info?.reportInfo?.totalReport}</span>{' '}
          건
        </div>
        <div className="overviewContent">
          미처리 신고:{' '}
          <span className="marginleft10">{info?.reportInfo?.countBefore}</span>{' '}
          건
        </div>
        <div className="overviewContent">
          보류 신고:{' '}
          <span className="marginleft10">{info?.reportInfo?.countIng}</span> 건
        </div>
        <div className="overviewContent">
          처리 완료:{' '}
          <span className="marginleft10">
            {info?.reportInfo?.countCompleted}
          </span>{' '}
          건
        </div>
      </div>
    </div>
  )
}

export default OverviewBox
