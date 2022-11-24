import NavBar from "../../components/NavBar";
import OverviewBox from "../../components/OverviewBox";

import "../../App.css";
import UserBoard from "../../components/UserBoard";

function AdminUser() {
  return (
    <div className="height100">
      <NavBar />
      <div className="homeMainDiv">
        <OverviewBox />
        <UserBoard></UserBoard>
      </div>
    </div>
  );
}

export default AdminUser;
