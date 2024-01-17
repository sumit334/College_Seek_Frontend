import React, {useState} from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import Login from "./components/account/Login";
import DataProvider from "./context/DataProvider";
import Header from "./components/header/Header";
import Homes from "./components/home/Homes";
import CreatePosts from "./components/create/CreatePosts";
import DetailView from "./components/details/DetailView";
import Update from "./components/create/Update";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

const PrivateRoute = ({ isUserAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isUserAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> 
    : 
    <Navigate replace to='/login' />
};

function App() {

  const [isUserAuthenticated,setUserAuthenticated]=useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{marginTop: 64}}>
          <Routes>
            <Route path='/login' element={<Login setUserAuthenticated={setUserAuthenticated}/>} />

            <Route path='/' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/' element={<Homes />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/create' element={<CreatePosts />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
