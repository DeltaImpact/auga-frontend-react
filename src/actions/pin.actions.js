import { itemConstants } from "../constants";
import { pinService } from "../services";
import { history } from "../helpers";

export const pinActions = {
  addItem,
  deleteItem,
  getItems,
  getUserItems,
  getItem,
  updateItem,
  getBoardsWherePinSaved,
  getBoardsWherePinNotSaved,
  addItemToBoard,
  deleteItemFromBoard
};

function getUserItems(userId) {
  return function(dispatch) {
    dispatch(getUserItemsRequest());
    return pinService.getUserItems(userId).then(
      response => {
        dispatch(getUserItemsSuccess(response));
      },
      error => {
        dispatch(getUserItemsFailure(error));
      }
    );
  };
}

export function getUserItemsRequest() {
  return {
    type: itemConstants.GET_USER_ITEMS_REQUEST
  };
}

export function getUserItemsSuccess(payload) {
  return {
    type: itemConstants.GET_USER_ITEMS_SUCCESS,
    payload
  };
}

export function getUserItemsFailure(error) {
  return {
    type: itemConstants.GET_USER_ITEMS_FAILURE,
    payload: error
  };
}

function updateItem(id, name, description) {
  return function(dispatch) {
    let boardParams = {
      id,
      name,
      description
    };
    dispatch(updateItemRequest(boardParams));
    return pinService.updateItem(id, name, description).then(
      response => {
        dispatch(updateItemSuccess(response));
      },
      error => {
        dispatch(updateItemFailure(error));
      }
    );
  };
}

export function updateItemRequest(payload) {
  return {
    type: itemConstants.UPDATE_ITEM_REQUEST,
    payload
  };
}

export function updateItemSuccess(payload) {
  return {
    type: itemConstants.UPDATE_ITEM_SUCCESS,
    payload
  };
}

export function updateItemFailure(error) {
  return {
    type: itemConstants.UPDATE_ITEM_FAILURE,
    payload: error
  };
}

function addItem(name, description, cost, participantsNumber) {
  return function(dispatch) {
    let pinParams = {
      name,
      description,
      cost,
      participantsNumber
    };
    dispatch(addItemRequest(pinParams));
    return pinService.addItem(name, description, cost, participantsNumber).then(
      response => {
        dispatch(addItemSuccess(response));
        // // debugger
        // // let pinAddress = "/pin/" + response.id;
        // let user = JSON.parse(localStorage.getItem("user"));
        // // debugger
        // debugger;
        // let pinAddress = "/profile/" + user.username;
        // history.push(pinAddress);
      },
      error => {
        dispatch(addItemFailure(error));
      }
    );
  };
}

export function addItemRequest(tmp) {
  return {
    type: itemConstants.ADD_ITEM_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addItemSuccess(payload) {
  return {
    type: itemConstants.ADD_ITEM_SUCCESS,
    payload
  };
}

export function addItemFailure(error) {
  return {
    type: itemConstants.ADD_ITEM_FAILURE,
    payload: error
  };
}

function getItems() {
  return function(dispatch) {
    dispatch(getItemsRequest());
    return pinService.getItems().then(
      response => {
        dispatch(getItemsSuccess(response));
      },
      error => {
        dispatch(getItemsFailure(error));
      }
    );
  };
}

export function getItemsRequest() {
  return {
    type: itemConstants.GETALL_ITEM_REQUEST
  };
}

export function getItemsSuccess(payload) {
  return {
    type: itemConstants.GETALL_ITEM_SUCCESS,
    payload
  };
}

export function getItemsFailure(error) {
  return {
    type: itemConstants.GETALL_ITEM_FAILURE,
    payload: error
  };
}

function deleteItem(name) {
  return function(dispatch) {
    let pinParams = {
      name
    };
    dispatch(deleteItemRequest(pinParams));
    return pinService.deleteItem(name).then(
      response => {
        dispatch(deleteItemSuccess(response));
      },
      error => {
        dispatch(deleteItemFailure(error));
      }
    );
  };
}

export function deleteItemRequest(tmp) {
  return {
    type: itemConstants.DELETE_ITEM_REQUEST,
    payload: {
      tmp
    }
  };
}

export function deleteItemSuccess(payload) {
  return {
    type: itemConstants.DELETE_ITEM_SUCCESS,
    payload
  };
}

export function deleteItemFailure(error) {
  return {
    type: itemConstants.DELETE_ITEM_FAILURE,
    payload: error
  };
}

function getItem(id) {
  return function(dispatch) {
    dispatch(getItemRequest());
    return pinService.getItem(id).then(
      response => {
        dispatch(getItemSuccess(response));
      },
      error => {
        dispatch(getItemFailure(error));
      }
    );
  };
}

export function getItemRequest() {
  return {
    type: itemConstants.GET_ITEM_REQUEST
  };
}

export function getItemSuccess(payload) {
  return {
    type: itemConstants.GET_ITEM_SUCCESS,
    payload
  };
}

export function getItemFailure(error) {
  return {
    type: itemConstants.GET_ITEM_FAILURE,
    payload: error
  };
}

function getBoardsWherePinSaved(id) {
  return function(dispatch) {
    dispatch(getBoardsWherePinSavedRequest());
    return pinService.getBoardsWherePinSaved(id).then(
      response => {
        dispatch(getBoardsWherePinSavedSuccess(response));
      },
      error => {
        dispatch(getBoardsWherePinSavedFailure(error));
      }
    );
  };
}

export function getBoardsWherePinSavedRequest() {
  return {
    type: itemConstants.GET_ITEM_BOARDS_REQUEST
  };
}

export function getBoardsWherePinSavedSuccess(payload) {
  return {
    type: itemConstants.GET_ITEM_BOARDS_SUCCESS,
    payload
  };
}

export function getBoardsWherePinSavedFailure(error) {
  return {
    type: itemConstants.GET_ITEM_BOARDS_FAILURE,
    payload: error
  };
}

function getBoardsWherePinNotSaved(id) {
  return function(dispatch) {
    dispatch(getBoardsWherePinNotSavedRequest());
    return pinService.getBoardsWherePinNotSaved(id).then(
      response => {
        dispatch(getBoardsWherePinNotSavedSuccess(response));
      },
      error => {
        dispatch(getBoardsWherePinNotSavedFailure(error));
      }
    );
  };
}

export function getBoardsWherePinNotSavedRequest() {
  return {
    type: itemConstants.GET_ITEM_AVALIABE_BOARDS_REQUEST
  };
}

export function getBoardsWherePinNotSavedSuccess(payload) {
  return {
    type: itemConstants.GET_ITEM_AVALIABE_BOARDS_SUCCESS,
    payload
  };
}

export function getBoardsWherePinNotSavedFailure(error) {
  return {
    type: itemConstants.GET_ITEM_AVALIABE_BOARDS_FAILURE,
    payload: error
  };
}

function addItemToBoard(pinId, boardId) {
  return function(dispatch) {
    let pinParams = {
      pinId,
      boardId
    };
    dispatch(addItemToBoardRequest(pinParams));
    return pinService.addItemToBoard(pinId, boardId).then(
      response => {
        dispatch(addItemToBoardSuccess(response));
      },
      error => {
        dispatch(addItemToBoardFailure(error));
      }
    );
  };
}

export function addItemToBoardRequest(tmp) {
  return {
    type: itemConstants.ADD_ITEM_TO_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function addItemToBoardSuccess(payload) {
  return {
    type: itemConstants.ADD_ITEM_TO_BOARD_SUCCESS,
    payload
  };
}

export function addItemToBoardFailure(error) {
  return {
    type: itemConstants.ADD_ITEM_TO_BOARD_FAILURE,
    payload: error
  };
}

function deleteItemFromBoard(pinId, boardId) {
  return function(dispatch) {
    let pinParams = {
      pinId,
      boardId
    };
    dispatch(deleteItemFromBoardRequest(pinParams));
    return pinService.deleteItemFromBoard(pinId, boardId).then(
      response => {
        dispatch(deleteItemFromBoardSuccess(response));
      },
      error => {
        dispatch(deleteItemFromBoardFailure(error));
      }
    );
  };
}

export function deleteItemFromBoardRequest(tmp) {
  return {
    type: itemConstants.DELETE_ITEM_FROM_BOARD_REQUEST,
    payload: {
      tmp
    }
  };
}

export function deleteItemFromBoardSuccess(payload) {
  return {
    type: itemConstants.DELETE_ITEM_FROM_BOARD_SUCCESS,
    payload
  };
}

export function deleteItemFromBoardFailure(error) {
  return {
    type: itemConstants.DELETE_ITEM_FROM_BOARD_FAILURE,
    payload: error
  };
}

// function getItems() {
//   return function(dispatch) {
//     dispatch(getItemsRequest());
//     return pinService.getItems().then(
//       response => {
//         dispatch(getItemsSuccess(response));
//       },
//       error => {
//         dispatch(getItemsFailure(error));
//       }
//     );
//   };
// }

// export function getItemsRequest() {
//   return {
//     type: pinConstants.GET_ITEM_MAIN_PAGE_REQUEST
//   };
// }

// export function getItemsSuccess(payload) {
//   return {
//     type: pinConstants.GET_ITEM_MAIN_PAGE_SUCCESS,
//     payload
//   };
// }

// export function getItemsFailure(error) {
//   return {
//     type: pinConstants.GET_ITEM_MAIN_PAGE_FAILURE,
//     payload: error
//   };
// }
