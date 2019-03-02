import { authHeader } from "../helpers";
import axios from "axios";
import { parseJSON, processErrorResponse } from "../utils/misc";
import config from "config";
import { history } from "../helpers";

export const pinService = {
  getItems,
  getUserItems,
  getItem,
  addItem,
  deleteItem
};

function getItems() {
  return axios
    .get(
      `${config.apiItemsUrl}/items`,
      {},
      {
        headers: { Authorization: authHeader() }
      }
    )
    .then(parseJSON)
    .then(
      object => {
        return object;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

function getUserItems(userId) {
  return axios
    .get(`${config.apiItemsUrl}/items?userId=${userId}`, {
      headers: { Authorization: authHeader() }
    })
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

function getItem(id) {
  return axios
    .get(`${config.apiItemsUrl}/items/${id}`, {
      headers: { Authorization: authHeader() }
    })
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

function addItem(name, description, cost, participantsNumber) {
  // debugger
  return axios
    .post(
      `${config.apiItemsUrl}/items/item`,
      {
        Name: name,
        Description: description,
        Cost: cost,
        ParticipantsNumber: participantsNumber,
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

function deleteItem(id) {
  axios.defaults.headers.common["Authorization"] = authHeader();
  return axios
    .delete(`${config.apiItemsUrl}/items/item`, { data: { Id: id } })
    .then(parseJSON)
    .then(
      response => {
        window.location.reload();
        return response;
      },
      error => {
        return Promise.reject(processErrorResponse(error));
      }
    );
}

// function updateItem(id, name, description) {
//   return axios
//     .post(
//       `${config.apiItemsUrl}/pin/updateItem`,
//       {
//         Id: id,
//         Name: name,
//         Description: description
//       },
//       {
//         headers: {
//           Authorization: authHeader()
//         }
//       }
//     )
//     .then(parseJSON)
//     .then(
//       response => {
//         return response;
//       },
//       error => {
//         return Promise.reject(processErrorResponse(error));
//       }
//     );
// }

// function getBoardsWherePinSaved(id) {
//   return axios
//     .get(`${config.apiItemsUrl}/pin/getBoardsWherePinSaved?pinId=${id}`, {
//       headers: { Authorization: authHeader() }
//     })
//     .then(parseJSON)
//     .then(
//       user => {
//         return user;
//       },
//       error => {
//         return Promise.reject(processErrorResponse(error));
//       }
//     );
// }

// function getBoardsWherePinNotSaved(id) {
//   return axios
//     .get(`${config.apiItemsUrl}/pin/getBoardsWherePinNotSaved?pinId=${id}`, {
//       headers: { Authorization: authHeader() }
//     })
//     .then(parseJSON)
//     .then(
//       user => {
//         return user;
//       },
//       error => {
//         return Promise.reject(processErrorResponse(error));
//       }
//     );
// }

// function addItemToBoard(pinId, boardId) {
//   return axios
//     .post(
//       `${config.apiItemsUrl}/pin/addItemToBoard`,
//       { PinId: pinId, BoardId: boardId },
//       {
//         headers: { Authorization: authHeader() }
//       }
//     )
//     .then(parseJSON)
//     .then(
//       user => {
//         return user;
//       },
//       error => {
//         return Promise.reject(processErrorResponse(error));
//       }
//     );
// }

// function deleteItemFromBoard(pinId, boardId) {
//   return axios({
//     url: `${config.apiItemsUrl}/pin/deleteItemFromBoard`,
//     method: "delete",
//     data: { PinId: pinId, BoardId: boardId },
//     headers: { Authorization: authHeader() }
//   })
//     .then(parseJSON)
//     .then(
//       user => {
//         if (user.isLast) history.push("/");
//         return user;
//       },
//       error => {
//         return Promise.reject(processErrorResponse(error));
//       }
//     );
// }
