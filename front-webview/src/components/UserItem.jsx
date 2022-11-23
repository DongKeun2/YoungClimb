import React from "react";

import "./userItem.css";

const UserItem = (props) => {
  const { item } = props;

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
            {item.lastLogin?.split("T")[0]}
          </span>
        </div>
      </div>
      <div
        onClick={() => {
          alert("해치웠습니다.");
        }}
        className={`userTag`}
      >
        해치우기
      </div>
    </div>
  );
};

export default UserItem;
