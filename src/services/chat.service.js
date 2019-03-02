import { authHeader } from "../helpers";
import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";
import config from "config";
import { history } from "../helpers";

export const chatService = {
  getDialogs,
  getDialog,
  sendMessage,
  StartTypingTo,
  StopTypingTo,
  joinGame,
  leaveGame,
  getGame
};

function getGame(id) {
  axios.defaults.headers.common["Authorization"] = authHeader();
  return axios
    .get(
      // `${config.apiMatchmakingUrl}/games/game?Id=${id}`,
      `${config.apiMatchmakingUrl}/games`,
      { params: { Id: id } }
      // {
      //   headers: { Authorization: authHeader() }
      // }
    )
    .then(parseJSON)
    .then(
      game => {
        return game;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function joinGame(id) {
  return axios
    .post(`${config.apiMatchmakingUrl}/games/${id}/join`, {
      headers: { Authorization: authHeader() }
    })
    .then(parseJSON)
    .then(
      game => {
        return game;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function leaveGame(id) {
  return axios
    .post(`${config.apiMatchmakingUrl}/games/${id}/leave`, {
      headers: { Authorization: authHeader() }
    })
    .then(parseJSON)
    .then(
      game => {
        return game;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getDialogs() {
  return axios
    .post(
      `${config.apiMatchmakingUrl}/games/getDialog`,
      {},
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      dialogs => {
        return dialogs;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getDialog(interlocutorId) {
  return axios
    .get(
      `${
        config.apiMatchmakingUrl
      }/games/getDialog?interlocutorId=${interlocutorId}`,
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      dialog => {
        return dialog;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function sendMessage(Message, SentTo) {
  return axios
    .post(
      `${config.apiMatchmakingUrl}/games/SendMessage`,
      {
        Message: Message,
        SentTo: SentTo
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

function StartTypingTo(interlocutorId) {
  return axios
    .get(
      `${
        config.apiMatchmakingUrl
      }/games/startTyping?interlocutorId=${interlocutorId}`,
      {
        headers: { Authorization: authHeader() }
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

function StopTypingTo(interlocutorId) {
  return axios
    .get(
      `${
        config.apiMatchmakingUrl
      }/games/stopTyping?interlocutorId=${interlocutorId}`,
      {
        headers: { Authorization: authHeader() }
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
