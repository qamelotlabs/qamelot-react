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
import Modal from 'react-modal';
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

const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "1rem",
    zIndex: '9999',
    textAlign: 'center'
  },
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const App = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const checkIfCanOpenModal = (val) => {
    setIsOpen(val)
  }
  return (
    <div className="wraper">
      <GlobalStyles />
      <Header canOpenModal={checkIfCanOpenModal} />
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
        <Route element={<RankingRedux />} path="/home" />

        <Route element={<Wallet />} path="/wallet" />
        <Route element={<Login />} path="/login" />
        <Route element={<LoginTwo />} path="/loginTwo" />
        <Route element={<Alerts />} path="/alerts" />

      </Routes>
      <ScrollToTopBtn />

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalCustomStyles}
        contentLabel="Connect Modal"
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          style={{float: 'right'}}
          onClick={closeModal} 
          />

        <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Metamask not installed or removed!</h3>
        <h4>Please install it manually.</h4>
        <p>
        <a href='https://metamask.io/download/' target="_blank">
            <button
            style={{
              backgroundColor: 'black',
              color: 'white',
              fontSize: '16px',
              padding: '4px 30px',
              borderRadius: '5px',
              margin: '10px 0px',
              cursor: 'pointer',
              borderRadius: "1rem",
            }}
            >Go to Metamask Site</button>
          </a>
        </p>

      </Modal>
    </div>
  )
};
export default App;