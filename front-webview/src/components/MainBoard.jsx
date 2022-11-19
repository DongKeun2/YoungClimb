import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import './components.css'
import ReportItem from './ReportItem'
import ReportItemSmall from './ReportItemSmall'

const MainBoard = () => {
  const recentList = useSelector(state=>state.adminInfo.recentList)
  const suspendedList = useSelector(state=>state.adminInfo.suspendedList)
  const beforeList = useSelector(state=>state.adminInfo.beforeList)

  return (
    <div className='mainBoardContainer'>
      <div className='halfs'>
        {/* 최근신고 */}
        <div className='halfBoard'>
          <div className='boardTitle'>최근 신고</div>
          {recentList.map((item,idx)=>{
            return <ReportItem item={item} key={`recent`+idx}/>
          })}
        </div>
        {/* 보류신고 */}
        <div className='halfBoard'>
          <div className='boardTitle'>보류 신고</div>
          {suspendedList.length?
            suspendedList.map((item,idx)=>{
              return <ReportItem item={item} key={`suspend`+idx}/>
            })
          :
          <div>보류 된 신고가 없습니다.</div>}
        </div>
      </div>
      {/* 미처리 신고 */}
      <div className='fullBoard'>
        <div className='height100 width100 overFlowScroll'>
          {beforeList.map((item,idx)=>{
              return <ReportItemSmall item={item} key={`all`+idx}/>
            })}
        </div>
      </div>
    </div>
  )
}

export default MainBoard