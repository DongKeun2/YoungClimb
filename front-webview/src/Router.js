<<<<<<< HEAD
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import WallView from './pages/WallView';
import Admin from './pages/Admin';
=======
import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import WallView from "./pages/WallView";
>>>>>>> 7b313d9372eaba41ca27851b26734a6dfadea597

import NotFound404 from "./pages/NotFound404";
import Share from "./pages/Share";

const Router = () => {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path='/' element={<Main/>}/>
      <Route path='/admin/*' element={<Admin/>}/>
      <Route path='/3dWall/:centerId/:wallId' element={<WallView/>}/>
      <Route path='*' element={<NotFound404/>}/>
=======
      <Route path="/" element={<Main />} />
      <Route path="/3dWall/:centerId/:wallId" element={<WallView />} />
      <Route path="/share" element={<Share />}></Route>
      <Route path="*" element={<NotFound404 />} />
>>>>>>> 7b313d9372eaba41ca27851b26734a6dfadea597
    </Routes>
  );
};

export default Router;
