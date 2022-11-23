import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import axiosTemp from '../util/axios'
import api from '../util/api'
import { setUserListInfo } from '../reducer/slice/AdminInfoSlice'
import UserItem from './UserItem'
import './components.css'
import './userItem.css'

const UserBoard = () => {
  const dispatch = useDispatch()

  const userItem = useSelector(state => state.adminInfo.userListInfo)

  const accessToken = useSelector(state => state.authToken.accessToken)
  useEffect(() => {
    axiosTemp
      .get(api.fetchUserListInfo(), {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(res => {
        dispatch(setUserListInfo(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="mainBoardContainer">
      <div className="userBoard">
        <div className="boardTitle">회원 정보</div>
        <div className="userItemHeaderContainer">
          <div className="userItemHeaderBox">
            <div>
              <span className="userItemTitle">유저 ID</span>
              <span className="userItemContent">닉네임</span>
            </div>
            <div>
              <span className="userItemContent">팔로잉</span>
              <span className="userItemContent">팔로워</span>
              <span className="userItemContent">게시글</span>
              <span className="userItemContent">스크랩</span>
              <span className="userItemContent">댓글</span>
              <span className="userItemContent">대댓글</span>
              <span className="userItemContent">등급</span>
              <span className="userItemContent">경험치</span>
              <span className="userItemContent">생성 일자</span>
              <span className="userItemContent">최근 로그인</span>
            </div>
          </div>
          <div className={`userHeaderItem`}>관리</div>
        </div>
        <div className="scrollBox width100 overFlowScroll">
          {userItem?.length ? (
            userItem.map(item => {
              return <UserItem item={item} key={item.id} />
            })
          ) : (
            <div style={{ textAlign: 'center' }}>회원이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserBoard
