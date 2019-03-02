import { hubConstants } from "../constants";
import { chatService } from "../services";
import { history } from "../helpers";

export const hubActions = {
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
  return function(dispatch) {
    dispatch(getGameRequest());
    return chatService.getGame(id).then(
      response => {
        dispatch(getGameSuccess(response));
      },
      error => {
        dispatch(getGameFailure(error));
      }
    );
  };
}

export function getGameRequest() {
  return {
    type: hubConstants.GET_GAME_REQUEST
  };
}

export function getGameSuccess(payload) {
  return {
    type: hubConstants.GET_GAME_SUCCESS,
    payload
  };
}

export function getGameFailure(error) {
  return {
    type: hubConstants.GET_GAME_FAILURE,
    payload: error
  };
}

function leaveGame(id) {
  return function(dispatch) {
    dispatch(leaveGameRequest());
    return chatService.leaveGame(id).then(
      response => {
        dispatch(leaveGameSuccess(response));
      },
      error => {
        dispatch(leaveGameFailure(error));
      }
    );
  };
}

export function leaveGameRequest() {
  return {
    type: hubConstants.LEAVE_GAME_REQUEST
  };
}

export function leaveGameSuccess(payload) {
  return {
    type: hubConstants.LEAVE_GAME_SUCCESS,
    payload
  };
}

export function leaveGameFailure(error) {
  return {
    type: hubConstants.LEAVE_GAME_FAILURE,
    payload: error
  };
}

function joinGame(id) {
  return function(dispatch) {
    dispatch(joinGameRequest());
    return chatService.joinGame(id).then(
      response => {
        dispatch(joinGameSuccess(response));
      },
      error => {
        dispatch(joinGameFailure(error));
      }
    );
  };
}

export function joinGameRequest() {
  return {
    type: hubConstants.JOIN_GAME_REQUEST_SUCCESS
  };
}

export function joinGameSuccess(payload) {
  return {
    type: hubConstants.JOIN_GAME_SUCCESS,
    payload
  };
}

export function joinGameFailure(error) {
  return {
    type: hubConstants.JOIN_GAME_FAILURE,
    payload: error
  };
}

function getDialogs() {
  return function(dispatch) {
    dispatch(getDialogsRequest());
    return chatService.getDialogs().then(
      response => {
        dispatch(getDialogsSuccess(response));
      },
      error => {
        dispatch(getDialogsFailure(error));
      }
    );
  };
}

export function getDialogsRequest() {
  return {
    type: hubConstants.GET_DIALOGS_REQUEST
  };
}

export function getDialogsSuccess(payload) {
  return {
    type: hubConstants.GET_DIALOGS_SUCCESS,
    payload
  };
}

export function getDialogsFailure(error) {
  return {
    type: hubConstants.GET_DIALOGS_FAILURE,
    payload: error
  };
}

function getDialog(id) {
  return function(dispatch) {
    dispatch(getDialogRequest());
    return chatService.getDialog(id).then(
      response => {
        dispatch(getDialogSuccess(response));
      },
      error => {
        dispatch(getDialogFailure(error));
      }
    );
  };
}

export function getDialogRequest() {
  return {
    type: hubConstants.GET_DIALOG_REQUEST
  };
}

export function getDialogSuccess(payload) {
  return {
    type: hubConstants.GET_DIALOG_SUCCESS,
    payload
  };
}

export function getDialogFailure(error) {
  return {
    type: hubConstants.GET_DIALOG_FAILURE,
    payload: error
  };
}

function sendMessage(message, sentTo) {
  return function(dispatch) {
    let params = {
      message,
      sentTo
    };
    dispatch(sendMessageRequest(params));
    return chatService.sendMessage(message, sentTo).then(
      response => {
        dispatch(sendMessageSuccess(response));
      },
      error => {
        dispatch(sendMessageFailure(error));
      }
    );
  };
}

export function sendMessageRequest(payload) {
  return {
    type: hubConstants.ADD_ITEM_REQUEST,
    payload
  };
}

export function sendMessageSuccess(payload) {
  return {
    type: hubConstants.ADD_ITEM_SUCCESS,
    payload
  };
}

export function sendMessageFailure(error) {
  return {
    type: hubConstants.ADD_ITEM_FAILURE,
    payload: error
  };
}

function StartTypingTo(id) {
  return function(dispatch) {
    dispatch(StartTypingToRequest());
    return chatService.StartTypingTo(id).then(
      response => {
        // dispatch(StartTypingToSuccess(response));
      },
      error => {
        // dispatch(StartTypingToFailure(error));
      }
    );
  };
}

export function StartTypingToRequest() {
  return {
    type: hubConstants.START_TYPING_TO
  };
}

export function StartTypingToSuccess(payload) {
  return {
    type: hubConstants.GET_DIALOG_SUCCESS,
    payload
  };
}

export function StartTypingToFailure(error) {
  return {
    type: hubConstants.GET_DIALOG_FAILURE,
    payload: error
  };
}

function StopTypingTo(id) {
  return function(dispatch) {
    dispatch(StopTypingToRequest());
    return chatService.StopTypingTo(id).then(
      response => {
        // dispatch(StopTypingToSuccess(response));
      },
      error => {
        // dispatch(StopTypingToFailure(error));
      }
    );
  };
}

export function StopTypingToRequest() {
  return {
    type: hubConstants.STOP_TYPING_TO
  };
}

export function StopTypingToSuccess(payload) {
  return {
    type: hubConstants.GET_DIALOG_SUCCESS,
    payload
  };
}

export function StopTypingToFailure(error) {
  return {
    type: hubConstants.GET_DIALOG_FAILURE,
    payload: error
  };
}
