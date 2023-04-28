import React from 'react';
import {Route, Routes,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar"
import TimerDemo from './components/TimerDemo';
import Register from './components/Register';
import Login from './components/Login';
import CompanyList from './components/CompanyList';
import UserList from './components/UserList';
import AllUserList from './components/AllUserList';
import CaptureImageUrl from './components/CaptureImageUrl';
import Protected from './components/Protected';
import Views from './components/Views';

import './App.css';


function App() {
  return (
    <div className="App">
     
       <Routes>
       <Route path='/' exact element={<Navigate to='/login'></Navigate>}></Route>
           <Route path='/user_list/:id' element={<Protected Component={CompanyList} />} />
           <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/company_list/user_list' element={<Protected Component={UserList} />} />
          <Route path='/all_user_list' element={<AllUserList />} />
          <Route path='/user/image_url_list/:id' element={<CaptureImageUrl />} />
          <Route path='/view_image' element={<Views />} />
          
          
         </Routes>
    </div>
  );
}

export default App;
