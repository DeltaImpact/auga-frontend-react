import config from "config";
import { authHeader } from "../helpers";

import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";
import { signalRRegistration } from "../middleware/signalRRegistration";

import jwtDecode from "jwt-decode";

export const authService = {
  login,
  register,
  logout
};

function login(email) {
  return axios
    .post(`${config.apiItemsUrl}/users/user/token`, {
      Email: email
    })
    .then(parseJSON)
    .then(
      response => {
        if (response.token) {
          // let tpm = jwtDecode(response.token);
          let user = {
            username: response.userName,
            email: response.email,
            token: response.token,
            id: response.id
          };
          localStorage.setItem("user", JSON.stringify(user));
          // signalRRegistration.
          // axios.defaults.headers.common['Authorization'] =
          //     'Bearer ' + response.token;
          return user;
        }
        return error;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function register(email, username) {
  return axios
    .post(`${config.apiItemsUrl}/users/user`, {
      Username: username,
      Email: email
    })
    .then(parseJSON)
    .then(
      response => {
        if (response.token) {
          // let tpm = jwtDecode(response.token);
          let user = {
            username: response.userName,
            email: response.email,
            token: response.token,
            id: response.id
          };
          localStorage.setItem("user", JSON.stringify(user));
          // debugger;

          // axios.defaults.headers.common['Authorization'] =
          //     'Bearer ' + response.token;
          return user;
        }
        return error;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function logout() {
  localStorage.removeItem("user");
}
