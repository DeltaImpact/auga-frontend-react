import config from "config";
import { authHeader } from "../helpers";
import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";

export const boardService = {
  addBoard,
  deleteBoard,
  updateBoard,
  getBoards,
  getBoard,
  getBoardPins
};

function getBoardPins(id) {
  return axios
    .get(
      `${config.apiItemsUrl}/board/getBoardPins`,
      { boardId: id },
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      user => {
        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function addBoard(name, description, img, isPrivate) {
  return axios
    .post(
      `${config.apiItemsUrl}/board/addBoard`,
      {
        Name: name,
        Description: description,
        Img: img,
        IsPrivate: isPrivate
      },
      {
        headers: {
          Authorization: authHeader()
        }
      }
    )
    .then(parseJSON)
    .then(
      response => {
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getBoards(nickname) {
  let requestUrl = `${config.apiItemsUrl}/board/getBoards?userNickname=${nickname}`;
  if (nickname == undefined) {
    requestUrl = `${config.apiItemsUrl}/board/getBoards`;
  }
  // debugger;
  // axios.defaults.headers.common["Authorization"] = authHeader();
  return axios
    .get(requestUrl, {
      // .post("http://httpbin.org/post", {},  {
      headers: { Authorization: authHeader() }
    })
    .then(parseJSON)
    .then(
      user => {
        // console.log(user)
        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getBoard(id) {
  return axios
    .get(
      `${config.apiItemsUrl}/board/${id}`,
      // {},
      {
        // .post("http://httpbin.org/post", {},  {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      user => {
        // console.log(user)

        return user;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function deleteBoard(Id) {
  return axios
    .post(
      `${config.apiItemsUrl}/board/deleteBoard`,
      { Id: Id },
      {
        headers: {
          Authorization: authHeader()
        }
      }
    )
    .then(parseJSON)
    .then(
      response => {
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function updateBoard(id, name, description, isPrivate) {
  return axios
    .post(
      `${config.apiItemsUrl}/board/updateBoard`,
      {
        Id: id,
        Name: name,
        Description: description,
        IsPrivate: isPrivate
      },
      {
        headers: {
          Authorization: authHeader()
        }
      }
    )
    .then(parseJSON)
    .then(
      response => {
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}
