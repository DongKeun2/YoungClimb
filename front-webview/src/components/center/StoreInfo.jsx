import "./store.css";

function StoreInfo({ type }) {
  return <>{type === "map" ? <div>지점 지도</div> : <div>지점 리스트</div>}</>;
}

export default StoreInfo;
