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
