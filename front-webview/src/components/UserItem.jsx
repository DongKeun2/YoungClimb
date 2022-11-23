import React from 'react'
import { useSelector } from 'react-redux'
import api from '../util/api'
import axiosTemp from '../util/axios'

import './userItem.css'

const UserItem = props => {
  const { item } = props

  const accessToken = useSelector(state => state.authToken.accessToken)
  function deleteUser(userId) {
    axiosTemp
      .post(
        api.deleteUser(userId),
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(res => {
        alert('유저 정보가 삭제되었습니다.')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="userItemContainer">
      <div className="userItemBox">
        <div>
          <span className="userItemTitle">[{item.id}]</span>
          <span className="userItemContent">{item.nickname}</span>
        </div>
        <div>
          <span className="userItemContent">{item.followingNum}</span>
          <span className="userItemContent">{item.followerNum}</span>
          <span className="userItemContent">{item.createBoardNum}</span>
          <span className="userItemContent">{item.scrapNum}</span>
          <span className="userItemContent">{item.createCommentNum}</span>
          <span className="userItemContent">{item.createRecommentNum}</span>
          <span className="userItemContent">{item.rank}</span>
          <span className="userItemContent">{item.exp}</span>
          <span className="userItemContent">{item.createdAt}</span>
          <span className="userItemLastLogin">
            {item.lastLogin?.split('T')[0]}
          </span>
        </div>
      </div>
      <div className="userTag" onClick={() => deleteUser(item.id)}>
        탈퇴
      </div>
    </div>
  )
}

export default UserItem
