import React, { useState, useEffect } from "react";

import StoreInfo from "./center/StoreInfo";
import StoreChart from "./center/StoreChart";
import "./components.css";
import DetailChart from "./center/DetailChart";
import { useDispatch, useSelector } from "react-redux";
import axiosTemp from "../util/axios";
import api from "../util/api";
import { setCenterTotalInfo } from "../reducer/slice/AdminInfoSlice";

const CenterBoard = () => {
  const [type, setType] = useState("map");
  const [focusCenter, setFocusCenter] = useState(0);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authToken.accessToken);
  useEffect(() => {
    axiosTemp
      .get(api.fetchCenterTotalInfo(), {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res);
        dispatch(setCenterTotalInfo());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <StoreInfo type={type} setFocusCenter={setFocusCenter}></StoreInfo>
        </div>
      </div>
      <div className="storeBoard">
        <div className="height100 width100">
          {focusCenter ? (
            <DetailChart></DetailChart>
          ) : (
            <StoreChart></StoreChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default CenterBoard;
