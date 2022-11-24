import React from 'react'
import { useSelector } from 'react-redux'
import api from '../util/api'
import axiosTemp from '../util/axios'

import './userItem.css'

const UserItem = props => {
  const { item } = props

  const accessToken = useSelector(state => state.authToken.accessToken)

  function deleteUser(userId) {
    if (window.confirm('삭제하시겠습니까?')) {
      axiosTemp
        .post(
          api.deleteUser(userId),
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then(res => {
          alert('삭제되었습니다.')
        })
        .catch(err => {
          alert('다시 시도해주세요.')
        })
    } else {
      alert('취소되었습니다.')
    }
  }

  return (
    <div className="userItemContainer">
      <div className="userItemBox">
        <div className="userTitleBox">
          <div className="userItemTitle">[{item.id}]</div>
          <div className="userItemContent userNickname">{item.nickname}</div>
        </div>
        <div className="userItemUnit">
          <div className="userItemContent userFollowing">
            {item.followingNum}
          </div>
          <div className="userItemContent userFollower">{item.followerNum}</div>
          <div className="userItemContent userBoardNum">
            {item.createBoardNum}
          </div>
          <div className="userItemContent userScrapNum">{item.scrapNum}</div>
          <div className="userItemContent userComment">
            {item.createCommentNum}
          </div>
          <div className="userItemContent userRecomment">
            {item.createRecommentNum}
          </div>
          <div className="userItemContent userRank">{item.rank}</div>
          <div className="userItemContent userExp">{item.exp}</div>
          <div className="userItemContent userCreatedAt">{item.createdAt}</div>
          <div className="userItemContent userLastLogin">
            {item.lastLogin?.split('T')[0]}
          </div>
        </div>
      </div>
      <div className="userTag" onClick={() => deleteUser(item.id)}>
        탈퇴
      </div>
    </div>
  )
}

export default UserItem
