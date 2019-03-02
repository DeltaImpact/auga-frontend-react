import {
  JsonHubProtocol,
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel
} from "@aspnet/signalr"; // version 1.0.4
import { authToken } from "../helpers";
import config from "config";

// action for user authentication and receiving the access_token
import { userConstants } from "../constants/user.constants";

const onNotifReceived = res => {
  console.log("****** NOTIFICATION ******", res);
};

const startSignalRConnection = connection => {
  return connection.start();
  // .then(() => console.info("SignalR Connected"))
  // .catch(err => console.error("SignalR Connection Error: ", err));
};

const signalRMiddleware = ({ getState }) => next => async action => {
  // register signalR after the user logged in

  if (
    action.type === userConstants.GET_SAVED_AUTH ||
    action.type === userConstants.LOGIN_USER_SUCCESS ||
    action.type === userConstants.REGISTER_USER_SUCCESS
  ) {
    const connectionHubUrl = `${config.apiMatchmakingUrl}/chatHub`;
    const protocol = new JsonHubProtocol();
    // let transport to fall back to to LongPolling if it needs to
    const transport =
      HttpTransportType.WebSockets | HttpTransportType.LongPolling;

    const options = {
      transport,
      logMessageContent: true,
      //   logger: LogLevel.Trace,
      accessTokenFactory: () => authToken()
    };

    // create the connection instance
    const connection = new HubConnectionBuilder()
      .withUrl(connectionHubUrl, options)
      .withHubProtocol(protocol)
      .build();

    // event handlers, you can use these to dispatch actions to update your Redux store
    connection.on("OperationProgress", onNotifReceived);
    connection.on("UploadProgress", onNotifReceived);
    connection.on("DownloadProgress", onNotifReceived);
    connection.on("userJoined", onNotifReceived);
    connection.on("userExited", onNotifReceived);
    // connection.on("moves", onNotifReceived);

    // re-establish the connection if connection dropped
    connection.onclose(() =>
      setTimeout(function() {
        console.log("Trying reconnect to hub.");
        startSignalRConnection(connection);
      }, 5000)
    );

    startSignalRConnection(connection);
  }

  return next(action);
};

export default signalRMiddleware;
