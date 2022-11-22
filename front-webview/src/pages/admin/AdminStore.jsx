import NavBar from "../../components/NavBar";
import OverviewBox from "../../components/OverviewBox";

import "../../App.css";
import CenterBoard from "../../components/CenterBoard";

function AdminStore() {
  return (
    <div className="height100">
      <NavBar />
      <div className="homeMainDiv">
        <OverviewBox />
        <CenterBoard></CenterBoard>
      </div>
    </div>
  );
}

export default AdminStore;
