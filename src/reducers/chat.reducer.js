import { createReducer } from "../utils/misc";
import {
  GET_DIALOGS_REQUEST,
  GET_DIALOGS_SUCCESS,
  GET_DIALOGS_FAILURE,
  GET_DIALOG_REQUEST,
  GET_DIALOG_SUCCESS,
  GET_DIALOG_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  START_TYPING_TO,
  STOP_TYPING_TO,
  LEAVE_GAME_REQUEST,
  LEAVE_GAME_SUCCESS,
  LEAVE_GAME_FAILURE,
  JOIN_GAME_REQUEST,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILURE,
  GET_GAME_REQUEST,
  GET_GAME_SUCCESS,
  GET_GAME_FAILURE
} from "../constants/hub.constants";

const reducerInitialState = {
  GetDialogs: null,
  GetDialogsLoading: null,
  GetDialogsError: null,
  GetDialog: null,
  GetDialogLoading: null,
  GetDialogError: null,
  SendMessage: null,
  SendMessageLoading: null,
  SendMessageError: null,
  JoinGameLoading: null,
  GetGameLoading: null,
  LeaveGameLoading: null,
  game: null,
  gameError: null
};
// debugger
export default createReducer(reducerInitialState, {
  GET_GAME_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      GetGameLoading: true,
      gameError: null,
      game: null
    }),
  GET_GAME_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      GetGameLoading: false,
      game: payload
    }),
  GET_GAME_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      GetGameLoading: false,
      gameError: payload
    }),
  JOIN_GAME_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      JoinGameLoading: true,
      gameError: null,
      game: null
    }),
  JOIN_GAME_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      JoinGameLoading: false,
      game: [...state.game, payload]
    }),
  JOIN_GAME_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      JoinGameLoading: false,
      gameError: payload
    }),
  LEAVE_GAME_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      LeaveGameLoading: true,
      gameError: null
      // game: null
    }),
  LEAVE_GAME_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      LeaveGameLoading: false,
      game: state.game.filter(t => t.UserId != payload.UserId)
    }),
  LEAVE_GAME_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      LeaveGameLoading: false,
      gameError: payload
    }),

  GET_DIALOGS_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      GetDialogsLoading: true,
      GetDialogsError: null
    }),
  GET_DIALOGS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      GetDialogsLoading: false,
      GetDialogs: payload
    }),
  GET_DIALOGS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      GetDialogsLoading: false,
      GetDialogsError: payload
    }),
  GET_DIALOG_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      GetDialogLoading: true,
      GetDialogError: null
    }),
  GET_DIALOG_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      GetDialogLoading: false,
      GetDialog: payload
    }),
  GET_DIALOG_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      GetDialogLoading: false,
      GetDialogError: payload
    }),
  SEND_MESSAGE_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      SendMessageLoading: true,
      SendMessageError: null
    }),
  SEND_MESSAGE_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      SendMessageLoading: false,
      SendMessage: payload
    }),
  SEND_MESSAGE_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      SendMessageLoading: false,
      SendMessageError: payload
    })
});
