import React from "react";

import UserItem from "./UserItem";
import "./components.css";

const userItem = [
  {
    id: 1,
    nickname: "동근",
    rank: "Y1",
    exp: 100,
    createdAt: "2022-11-20",
    lastLogin: "2022-11-22",
    createBoardNum: 10,
    createCommentNum: 3,
    createRecommentNum: 5,
    followingNum: 22,
    follwerNum: 30,
    scrapNum: 3,
    state: "정상",
  },
  {
    id: 2,
    nickname: "영준",
    rank: "Y1",
    exp: 100,
    createdAt: "2022-11-20",
    lastLogin: "2022-11-22",
    createBoardNum: 10,
    createCommentNum: 3,
    createRecommentNum: 5,
    followingNum: 22,
    follwerNum: 30,
    scrapNum: 3,
    state: "정상",
  },
  {
    id: 3,
    nickname: "연준",
    rank: "Y1",
    exp: 100,
    createdAt: "2022-11-20",
    lastLogin: "2022-11-22",
    createBoardNum: 10,
    createCommentNum: 3,
    createRecommentNum: 5,
    followingNum: 22,
    follwerNum: 30,
    scrapNum: 3,
    state: "정상",
  },
  {
    id: 4,
    nickname: "우석",
    rank: "Y1",
    exp: 100,
    createdAt: "2022-11-20",
    lastLogin: "2022-11-22",
    createBoardNum: 10,
    createCommentNum: 3,
    createRecommentNum: 5,
    followingNum: 22,
    follwerNum: 30,
    scrapNum: 3,
    state: "정상",
  },
  {
    id: 5,
    nickname: "군선",
    rank: "Y1",
    exp: 100,
    createdAt: "2022-11-20",
    lastLogin: "2022-11-22",
    createBoardNum: 10,
    createCommentNum: 3,
    createRecommentNum: 5,
    followingNum: 22,
    follwerNum: 30,
    scrapNum: 3,
    state: "정상",
  },
  {
    id: 6,
    nickname: "민성",
    rank: "Y1",
    exp: 100,
    createdAt: "2022-11-20",
    lastLogin: "2022-11-22",
    createBoardNum: 10,
    createCommentNum: 3,
    createRecommentNum: 5,
    followingNum: 22,
    follwerNum: 30,
    scrapNum: 3,
    state: "정상",
  },
];

const UserBoard = () => {
  return (
    <div className="mainBoardContainer">
      <div className="userBoard">
        <div className="boardTitle">회원 정보</div>
        <div className="height100 width100 overFlowScroll">
          {userItem.length ? (
            userItem.map((item) => {
              return <UserItem item={item} key={item.id} />;
            })
          ) : (
            <div style={{ textAlign: "center" }}>회원이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBoard;
