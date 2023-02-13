//import React from "react";
//import { withRouter } from "react-router-dom";
//
//const parseJwt = (token) => {
//  try {
//    return JSON.parse(atob(token.split(".")[1]));
//  } catch (e) {
//    return null;
//  }
//};
//
//const AuthVerify = (props) => {
//  props.history.listen(() => {
//    const user = JSON.parse(localStorage.getItem("user"));
//
//    if (user) {
//      const decodedJwt = parseJwt(user.accessToken);
//
//      if (decodedJwt.exp * 1000 < Date.now()) {
//        props.logOut();
//      }
//    }
//  });
//
//  return <div></div>;
//};
//
//export default withRouter(AuthVerify);

//import React, { useEffect } from "react";
//import { withRouter } from "react-router-dom";
//
//
//const AuthVerify = (props) => {
//const parseJwt = (token) => {
//  try {
//    return JSON.parse(atob(token.split(".")[1]));
//  } catch (e) {
//    return null;
//  }
//};
//  useEffect(() => {
//    const user = JSON.parse(localStorage.getItem("user"));
//
//    if (user) {
//      const decodedJwt = parseJwt(user.accessToken);
//
//      if (decodedJwt.exp * 1000 < Date.now()) {
//        localStorage.removeItem("user");
//        props.history.push("/login");
//      }
//    } else {
//      props.history.push("/login");
//    }
//  }, [props.history]);
//
//  return null;
//};
//
//export default withRouter(AuthVerify);
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = ({ logOut }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location]);

  return <div></div>;
};

export default AuthVerify;


