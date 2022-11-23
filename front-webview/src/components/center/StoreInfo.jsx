import React from "react";

import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

import "./store.css";

function StoreInfo({ type, setFocusCenter }) {
  return (
    <>
      {type === "map" ? (
        <ViewMap setFocusCenter={setFocusCenter}></ViewMap>
      ) : (
        <ViewList setFocusCenter={setFocusCenter}></ViewList>
      )}
    </>
  );
}

function ViewMap({ setFocusCenter }) {
  return (
    <div
      style={{
        width: "100%",
        height: "92%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RenderAfterNavermapsLoaded
        ncpClientId="ldd4putzij"
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMap
          mapDivId={"maps-getting-started-controlled"} // default: react-naver-map
          style={{
            width: "100%",
            height: "99%",
          }}
          defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
          defaultZoom={10}
        >
          <Marker position={{ lat: 37.5013, lng: 127.0397 }} />
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </div>
  );
}

function ViewList({ setFocusCenter }) {
  return (
    <div>
      <div className="height100 width100 overFlowScroll">
        <div className="userItemContainer">
          <div className="userItemBox">
            <div>
              <span className="userItemTitle">ID</span>
              <span className="userItemContent">센터이름</span>
            </div>
            <div>
              <span className="userItemContent">호호</span>
              <span className="userItemContent">ㅎㅎ</span>
            </div>
          </div>
          <div onClick={() => setFocusCenter(1)} className={`userTag grayBg`}>
            상세보기
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreInfo;
