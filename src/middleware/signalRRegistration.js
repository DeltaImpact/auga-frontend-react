import {
  HubConnection,
  TransportType,
  ConsoleLogger,
  LogLevel,
  IConnection,
  IHubConnectionOptions
} from "@aspnet/signalr";
import { authToken } from "../helpers";
import config from "config";
const signalR = require("@aspnet/signalr");

export function signalRRegistration(store) {
  let hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${config.apiMatchmakingUrl}/chatHub`, {
      // accessTokenFactory: () => {return authHeader()}
      accessTokenFactory: () => authToken()
    })
    .build();

  if (authToken() != undefined) {
    hubConnection.start().then(e => {
      // isOnline(124);
      // let asd = connection;
      // connection
      //   .then(e => {
      //     isOnline(124);
      //     // debugger;
      //   })
      //   .catch(err => {
      //     // console.error(err, "red");
      //     // debugger;
      //   });
    });
  }

  function connect() {
    hubConnection.start().then(e => {
      // isOnline(124);
      // let asd = connection;
      // connection
      //   .then(e => {
      //     isOnline(124);
      //     // debugger;
      //   })
      //   .catch(err => {
      //     // console.error(err, "red");
      //     // debugger;
      //   });
    });
  }

  function disconnect() {
    hubConnection.stop();
  }

  function isOnline(message) {
    hubConnection
      .invoke("IsOnline", message)
      .catch(err => {
        console.error(err, "red");
        // debugger;
      })
      .then(e => {
        debugger;
      });
  }

  hubConnection.on("SendAction", data => {
    // debugger;
    console.log("Now connected, connection ID=" + hubConnection.id);
  });

  hubConnection.on("MessageSend", message => {
    debugger;
    console.log(`From ${userId} to ${userId2} : "${message}".`);
  });

  function sendMessage(message) {
    hubConnection.invoke("AddMessage", message).catch(err => {
      console.error(err, "red");
      // debugger;
    });
  }

  function sendMessage1(message) {
    hubConnection.invoke("AddMessage1", message).catch(err => {
      console.error(err, "red");
      // debugger;
    });
  }
}
