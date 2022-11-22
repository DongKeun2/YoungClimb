import NavBar from "../../components/NavBar";
import OverviewBox from "../../components/OverviewBox";

import "../../App.css";

function AdminStore() {
  return (
    <div className="height100">
      <NavBar />
      <div className="homeMainDiv">
        <OverviewBox />
      </div>
    </div>
  );
}

export default AdminStore;
