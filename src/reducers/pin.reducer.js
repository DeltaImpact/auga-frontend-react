import { createReducer } from "../utils/misc";
import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  GETALL_ITEM_REQUEST,
  GETALL_ITEM_SUCCESS,
  GETALL_ITEM_FAILURE,
  GET_ITEM_BOARDS_REQUEST,
  GET_ITEM_BOARDS_SUCCESS,
  GET_ITEM_BOARDS_FAILURE,
  GET_ITEM_AVALIABE_BOARDS_REQUEST,
  GET_ITEM_AVALIABE_BOARDS_SUCCESS,
  GET_ITEM_AVALIABE_BOARDS_FAILURE,
  ADD_ITEM_TO_BOARD_REQUEST,
  ADD_ITEM_TO_BOARD_SUCCESS,
  ADD_ITEM_TO_BOARD_FAILURE,
  DELETE_ITEM_FROM_BOARD_REQUEST,
  DELETE_ITEM_FROM_BOARD_SUCCESS,
  DELETE_ITEM_FROM_BOARD_FAILURE,
  GET_ITEM_MAIN_PAGE_REQUEST,
  GET_ITEM_MAIN_PAGE_SUCCESS,
  GET_ITEM_MAIN_PAGE_FAILURE
} from "../constants/pin.constants";

const reducerInitialState = {
  pins: null,
  pin: null,
  getItemLoading: null,
  addItemError: null,
  loading: null,
  getAllPinsLoading: null,
  getAllPinsError: null,
  addItemLoading: null,
  addItemRedirectTo: null,
  deleteItemError: null,
  deleteItemLoading: null,
  updateItemLoading: null,
  updateItemError: null,
  updateItemId: null,
  addItemToBoardLoading: null,
  addItemToBoard: null,
  addItemToBoardError: null,
  deleteItemFromBoardLoading: null,
  deleteItemFromBoard: null,
  deleteItemFromBoardError: null,
  getItemBoardsLoading: null,
  getItemBoards: null,
  getItemBoardsError: null,
  getItemAvaliableBoardsLoading: null,
  getItemAvaliableBoards: null,
  getItemAvaliableBoardsError: null,
  getItemsLoading: null,
  getItems: null,
  getItemsError: null,
  getUserItemsLoading: null,
  getUserItems: null,
  getUserItemsError: null
};

export default createReducer(reducerInitialState, {
  GET_USER_ITEMS_REQUEST: state =>
    Object.assign({}, state, {
      getUserItemsLoading: true,
      getUserItemsError: null
    }),
  GET_USER_ITEMS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getAllPinsLoading: false,
      getUserItems: payload
    }),
  GET_USER_ITEMS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getUserItemsLoading: false,
      getUserItems: null,
      getUserItemsError: payload
    }),
  GET_ITEM_MAIN_PAGE_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      // updateItem: null,
      getItemsLoading: true,
      updateItemError: null
    }),
  GET_ITEM_MAIN_PAGE_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getItemsLoading: false,
      getItems: payload
    }),
  GET_ITEM_MAIN_PAGE_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getItemsLoading: false,
      getItemsError: payload
    }),
  ADD_ITEM_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      addItemLoading: true,
      addItemRedirectTo: null,
      addItemError: payload
    }),
  ADD_ITEM_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      addItemLoading: false,
      addItemRedirectTo: payload.id
    }),
  ADD_ITEM_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      addItemLoading: false,
      pin: null,
      addItemError: payload
    }),
  UPDATE_ITEM_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      // updateItem: null,
      updateItemLoading: true,
      updateItemError: null,
      updateItemId: payload.id
    }),
  UPDATE_ITEM_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      updateItemLoading: false
    }),
  UPDATE_ITEM_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      updateItemLoading: false,
      // updateItem: null,
      updateItemError: payload
    }),
  DELETE_ITEM_REQUEST: (state, payload) =>
    Object.assign({}, state, {
      deleteItemLoading: true,
      deleteItemError: true
    }),
  DELETE_ITEM_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      deleteItemLoading: false,
      pin: payload
      // pins: state.pins.filter(t => t.id != payload.pin.id)
    }),
  DELETE_ITEM_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      deleteItemLoading: false,
      pin: null,
      deleteItemError: payload
    }),
  GETALL_ITEM_REQUEST: state =>
    Object.assign({}, state, {
      getAllPinsLoading: true,
      getAllPinsError: null
    }),
  GETALL_ITEM_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getAllPinsLoading: false,
      pins: payload
    }),
  GETALL_ITEM_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getAllPinsLoading: false,
      pins: null,
      getAllPinsError: payload
    }),
  GET_ITEM_REQUEST: state =>
    Object.assign({}, state, {
      getItemLoading: true,
      getItemError: null
    }),
  GET_ITEM_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getItemLoading: false,
      pin: payload
    }),
  GET_ITEM_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getItemLoading: false,
      pin: null,
      getItemError: payload
    }),
  ADD_ITEM_TO_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      addItemToBoardLoading: true,
      addItemToBoardError: null
    }),
  ADD_ITEM_TO_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      addItemToBoardLoading: false,
      getItemBoards: [...state.getItemBoards, payload],
      getItemAvaliableBoards: state.getItemAvaliableBoards.filter(
        t => t.id != payload.id
      )
    }),
  ADD_ITEM_TO_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      addItemToBoardLoading: false,
      addItemToBoard: null,
      addItemToBoardError: payload
    }),
  DELETE_ITEM_FROM_BOARD_REQUEST: state =>
    Object.assign({}, state, {
      deleteItemFromBoardLoading: true,
      deleteItemFromBoardError: null
    }),
  DELETE_ITEM_FROM_BOARD_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      deleteItemFromBoardLoading: false,
      getItemAvaliableBoards: [...state.getItemAvaliableBoards, payload],
      getItemBoards: state.getItemBoards.filter(t => t.id != payload.id)
    }),
  DELETE_ITEM_FROM_BOARD_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      deleteItemFromBoardLoading: false,
      deleteItemFromBoard: null,
      deleteItemFromBoardError: payload
    }),
  GET_ITEM_BOARDS_REQUEST: state =>
    Object.assign({}, state, {
      getItemBoardsLoading: true,
      getItemBoardsError: null
    }),
  GET_ITEM_BOARDS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getItemBoardsLoading: false,
      getItemBoards: payload
    }),
  GET_ITEM_BOARDS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getItemBoardsLoading: false,
      getItemBoards: null,
      getItemBoardsError: payload
    }),
  GET_ITEM_AVALIABE_BOARDS_REQUEST: state =>
    Object.assign({}, state, {
      getItemAvaliableBoardsLoading: true,
      getItemAvaliableBoardsError: null
    }),
  GET_ITEM_AVALIABE_BOARDS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      getItemAvaliableBoardsLoading: false,
      getItemAvaliableBoards: payload
    }),
  GET_ITEM_AVALIABE_BOARDS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      getItemAvaliableBoardsLoading: false,
      getItemAvaliableBoards: null,
      deleteItemFromBoardError: payload
    })
});
