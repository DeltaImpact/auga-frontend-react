/* eslint max-len: 0, no-param-reassign: 0 */
import React from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import parse from "date-fns/parse";
var ruLocale = require("date-fns/locale/ru");

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}

export function parseJSON(response) {
  return response.data;
}

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function processErrorResponse(error) {
  let err = {};
  if (error.response) {
    err.response = error.response;
    if (error.response.status === 400) {
      err.status = error.response.status;
      err.info = error.response.statusText;
      err.message = error.response.data.message;
    }

    if (error.response.data) {
      err.messages = error.response.data;
    }
  }

  if (error.message === "Network Error") {
    err.status = 503;
    err.message = "Network Error";
  }
  return err;
}

function convertUTCTimeToLocalTime(UTCDateString) {
  var convertLocalTime = new Date(UTCDateString);
  var hourOffset = convertLocalTime.getTimezoneOffset() / 60;
  convertLocalTime.setHours(convertLocalTime.getHours() - hourOffset);
  return convertLocalTime;
}

export function dateInWordsToNow(date) {
  return date == null
    ? null
    : distanceInWordsToNow(
        parse(date)
        // convertUTCTimeToLocalTime(date)
        // {
        //     locale: ruLocale
        //   }
      );
}

export function renderError(error) {
  let array = [];
  if (error.messages) {
    if (error.messages.Name) {
      array.push(error.messages.Name);
    }
    if (error.messages.Description) {
      array.push(error.messages.Description);
    }
    if (error.messages.FirstName) {
      array.push(error.messages.FirstName);
    }

    if (error.messages.Surname) {
      array.push(error.messages.Surname);
    }

    if (error.messages.Email) {
      array.push(error.messages.Email);
    }

    if (error.messages.Username) {
      array.push(error.messages.Username);
    }
  }

  if (error.message) {
    array.push(error.message);
  }

  if (error.response) {
    if (error.response.statusText && array.length == 0) {
      array.push(error.response.statusText);
    }
  }

  return (
    <div className="error--container">
      {array
        .map((error, i) => {
          return (
            <div key={i} className="error error--text alert alert-info">
              {!Array.isArray(error) && error}
              {Array.isArray(error) &&
                error.map((error, i) => {
                  return <p key={i}>{error}</p>;
                })}
            </div>
          );
        })
        .filter(n => n)}
    </div>
  );
}
