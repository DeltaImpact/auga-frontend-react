import axios from "axios";
// import cheerio from "cheerio";
import { parseJSON, processErrorResponse } from "../utils/misc";
import config from "config";

export const dataService = {
  parsing
};

function parsing(url) {
  return axios
    .post(`${config.apiItemsUrl}/parse`, {
      url: url
    })
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
