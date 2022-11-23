import React, { useState } from "react";

import StoreInfo from "./center/StoreInfo";
import StoreChart from "./center/StoreChart";
import "./components.css";

const CenterBoard = () => {
  const [type, setType] = useState("map");

  return (
    <div className="mainBoardContainer">
      <div className="storeBoard">
        <div className="height100 width100">
          <div className="mapTitleTab">
            <div
              onClick={() => setType("map")}
              className={type === "map" ? "activeTab" : "deactiveTab"}
            >
              지점 지도로 보기
            </div>
            <div
              onClick={() => setType("list")}
              className={type === "list" ? "activeTab" : "deactiveTab"}
            >
              지점 리스트로 보기
            </div>
          </div>
          <StoreInfo type={type}></StoreInfo>
        </div>
      </div>
      <div className="storeBoard">
        <div className="height100 width100">
          <StoreChart></StoreChart>
        </div>
      </div>
    </div>
  );
};

export default CenterBoard;
