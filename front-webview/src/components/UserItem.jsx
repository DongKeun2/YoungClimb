import React from "react";

import "./components.css";

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
          <span className="userItemContent">{item.rank}</span>
          <span className="userItemContent">{item.exp}</span>
          <span className="userItemContent">{item.createdAt}</span>
          <span className="userItemContent">{item.lastLogin}</span>
          <span className="userItemContent">{item.state}</span>
        </div>
      </div>
      <div className={`userTag pinkBg`}>해치우기</div>
    </div>
  );
};

export default UserItem;
