import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../../helpers";
import { alertActions } from "../../actions";
import { PrivateRoute } from "../../components/PrivateRoute";
import { SettingsPage } from "../../components/SettingsPage";
import { DialogsPage } from "../../components/DialogsPage";
import { ProfilePage } from "../../components/ProfilePage";
import { BoardPage as ItemPage } from "../../components/BoardPage";
import { PinPage } from "../../components/PinPage";
import { ParseView } from "../../components/ParseView";
import { bindActionCreators } from "redux";

import { Layout } from "../../components/Layout";
import { MainPage } from "../../components/MainPage";
import { RegisterView } from "../../components/RegisterView";
import { LoginView } from "../../components/LoginView";

import { profileActions } from "../../actions";

import "../../static/styles/app.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
  }

  componentDidMount() {
    this.props.getSavedAuth();
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <div>
            <Layout>
              <PrivateRoute exact path="/" component={MainPage} />
              <PrivateRoute path="/parse" component={ParseView} />
              <PrivateRoute path="/settings" component={SettingsPage} />
              <PrivateRoute path="/messages" component={DialogsPage} />
              <Route path="/login" component={LoginView} />
              <Route path="/register" component={RegisterView} />
              <Route path="/profile/:nickname" component={ProfilePage} />
              <Route path="/item/:id" component={ItemPage} />
              <Route path="/pin/:id" component={PinPage} />
            </Layout>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...profileActions }, dispatch);
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export { connectedApp as App };
