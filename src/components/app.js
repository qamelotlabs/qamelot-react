import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Wallet from './pages/wallet';
import RankingRedux from './pages/RankingRedux';
import Login from './pages/login';
import LoginTwo from './pages/loginTwo';
import Alerts from './pages/alerts';
import auth from '../core/auth';
import Profile from './pages/Profile';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const isAuth = auth.getToken() !== null;

  return (
      isAuth ? children : <Navigate to="/login" state={{ from: location }} replace />
  )
};

const app= () => (
  <div className="wraper">
  <GlobalStyles />
    <Header/>
    <Routes>
      <Route path="*" element={<Navigate to="/home" replace />} />
      <Route path="/Profile">
        <Route 
          path=":authorId" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Route>
      <Route element={<RankingRedux/>} path="/home" />
      
      <Route element={<Wallet />} path="/wallet" />
      <Route element={<Login />} path="/login" />
      <Route element={<LoginTwo />} path="/loginTwo" />
      <Route element={<Alerts />} path="/alerts" />
      
    </Routes>
    <ScrollToTopBtn />
  </div>
);
export default app;