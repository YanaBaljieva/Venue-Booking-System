import React, { useState, useEffect } from "react";
import {  Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthVerify from "./common/AuthVerify";
import { Navbar, Nav, Container } from 'react-bootstrap';

import PrivateRoute from "./common/PrivateRoute";
import PrivateRouteLogin from "./common/PrivateRouteLogin";
import AuthService from "./services/auth.service";

import AddHost from "./components/AddHost";
import ViewHost from "./components/ViewHost";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";

import EventBus from "./common/EventBus";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <div>
      <Navbar className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Test
        </Link>
        <Navbar className="navbar-nav mr-auto">
          <Nav.Item className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </Nav.Item>

          {currentUser && (
            <Nav.Item className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Host
              </Link>
            </Nav.Item>
          )}
        </Navbar>

        {currentUser ? (
          <Navbar className="navbar-nav ml-auto">
            <Nav.Item className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </Nav.Item>
          </Navbar>
        ) : (
          <Navbar className="navbar-nav ml-auto">
            <Nav.Item className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </Nav.Item>

            <Nav.Item className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </Nav.Item>
          </Navbar>
        )}
      </Navbar>
      <Container className="container mt-3">

        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/home"} element={<Home />} />
          <Route element={<PrivateRouteLogin />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/add" element={<AddHost />} />
          </Route>
          <Route path="/view/*" element={<ViewHost />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
