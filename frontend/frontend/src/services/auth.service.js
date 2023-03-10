import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const addHost = (name, city, country, address, price, description) => {
  return axios.post(API_URL + "add_host", {
    name,
    city,
    country,
    address,
    price,
    description,
  });
};

const reservePlace = (host_id, date_at) => {
  return axios.post(API_URL + "reserve", {
    host_id,
    date_at,
  });
};

const postReview = (host_id, stars, comment) => {
    return axios.post(API_URL + "create_rev", {
        host_id,
        stars,
        comment,
    })
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  addHost,
  getCurrentUser,
  reservePlace,
  postReview,
}

export default AuthService;
