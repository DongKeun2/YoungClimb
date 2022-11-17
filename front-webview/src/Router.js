import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import WallView from "./pages/WallView";

import NotFound404 from "./pages/NotFound404";
import Share from "./pages/Share";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/3dWall/:centerId/:wallId" element={<WallView />} />
      <Route path="/share" element={<Share />}></Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default Router;
