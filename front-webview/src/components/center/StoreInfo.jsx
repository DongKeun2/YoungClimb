import React from 'react'

import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'

import '../components.css'
import './store.css'

function StoreInfo({ type, focusCenter, setFocusCenter, centerTotalInfo }) {
  return (
    <>
      {type === 'map' ? (
        <ViewMap
          focusCenter={focusCenter}
          setFocusCenter={setFocusCenter}
          centerTotalInfo={centerTotalInfo}
        ></ViewMap>
      ) : (
        <ViewList
          focusCenter={focusCenter}
          setFocusCenter={setFocusCenter}
          centerTotalInfo={centerTotalInfo}
        ></ViewList>
      )}
    </>
  )
}

function ViewMap({ setFocusCenter, centerTotalInfo }) {
  return (
    <div
      style={{
        width: '100%',
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RenderAfterNavermapsLoaded ncpClientId="ldd4putzij">
        <NaverMap
          mapDivId={'maps-getting-started-controlled'} // default: react-naver-map
          style={{
            width: '100%',
            height: '99%',
          }}
          defaultCenter={{ lat: 37.4975, lng: 127.032 }}
          zoom="15"
        >
          {centerTotalInfo.map(item => {
            return (
              <Marker
                position={{ lat: item.latitude, lng: item.longitude }}
                title={item.name}
              />
            )
          })}
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </div>
  )
}

function ViewList({ setFocusCenter, focusCenter, centerTotalInfo }) {
  return (
    <div className="storeListContainer width100 overFlowScroll">
      {centerTotalInfo?.length ? (
        centerTotalInfo.map(item => {
          return (
            <StoreListItem
              item={item}
              key={item.id}
              focusCenter={focusCenter}
              setFocusCenter={setFocusCenter}
            />
          )
        })
      ) : (
        <div style={{ textAlign: 'center' }}>지점 정보가 없습니다.</div>
      )}
    </div>
  )
}

function StoreListItem({ item, focusCenter, setFocusCenter }) {
  return (
    <div
      className={
        focusCenter === item.id ? 'activeStoreItem' : 'storeItemContainer'
      }
    >
      <div className="storeItemBox " onClick={() => setFocusCenter(item.id)}>
        <div>
          <span className="storeItemTitle">{item.id}</span>
          <span className="storeItemContent">{item.name}</span>
        </div>
      </div>
      <div onClick={() => setFocusCenter(item.id)} className={`storeTag`}>
        상세보기
      </div>
    </div>
  )
}

export default StoreInfo
