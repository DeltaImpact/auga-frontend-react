import React from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import { Card } from "../Card/Card";
import { dateInWordsToNow, renderError } from "../../utils/misc";
import { userNickname } from "../../helpers/auth-header";

class BoardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowNewBoardForm: false,
      boardTitle: "123",
      boardDescription: null,
      isBoardPrivate: false,
      boardTitle_error_text: null,
      boardDescription_error_text: null,
      disabled: true
    };
  }

  componentWillMount() {
    if (this.props.UserId) this.props.getUserItems(this.props.UserId);
    // debugger
    // this.props.getItems();
    // this.props.getBoards(this.props.UserNickname);
  }

  renderPublicBoards() {
    return this.props.pin.getUserItems
      .map((item, i) => {
        return this.renderBoard(item);
      })
      .filter(n => n);
  }

  renderBoard(board) {
    // debugger;
    return (
      <Card
        key={board.id}
        item={board}
        updateItem={this.props.updateItem}
        deleteItem={this.props.deleteItem}
        loading={this.props.board.updateItemLoading}
        error={this.props.board.updateItemError}
        objectWithErrorId={this.props.board.updateBoardId}
        typeOfElement="item"
      />
    );
  }

  renderCreateNewBoardForm() {
    if (
      this.props.UserNickname == userNickname() ||
      this.props.UserNickname == undefined
    )
      // debugger
      return (
        <Card
          addItem={this.props.addItem}
          // loading={this.props.board.AddBoardLoading}
          // error={this.props.board.AddBoardError}
          loading={this.props.pin.addItemLoading}
          error={this.props.pin.addItemError}
          typeOfElement="addItem"
        />
      );
  }

  renderCreateNewBoardFormPreview() {
    return (
      <div>
        <i
          className="material-icons circle green"
          onClick={() =>
            this.setState({ ShowNewBoardForm: !this.state.ShowNewBoardForm })
          }
        >
          add
        </i>
        <div className="col m12">
          <span className="title">Create a board</span>
        </div>
      </div>
    );
  }

  renderCreateNewBoardFormEdit() {
    return (
      <div>
        <i
          className={
            this.state.disabled
              ? "material-icons circle grey"
              : "material-icons circle green"
          }
          onClick={e => this.createNewBoard(e)}
        >
          {!this.props.board.AddBoardLoading &&
            !this.props.board.AddBoardError &&
            "send"}
          {this.props.board.AddBoardError &&
            !this.props.board.AddBoardLoading &&
            "autorenew"}
          {this.props.board.AddBoardLoading && "hourglass_empty"}
        </i>
        <div className="col m12">
          <span className="title">Create a board</span>
        </div>
        <div className="row">
          {this.props.board.AddBoardError && (
            <div className="error--container">
              <div className="error error--text alert alert-info">
                {this.props.board.AddBoardError.message}
              </div>
            </div>
          )}
          <div className="input-field col s12">
            <input
              id="boardTitle"
              type="text"
              value={this.state.boardTitle != null ? this.state.boardTitle : ""}
              className={
                this.state.boardTitle_is_valid != null ? "invalid" : ""
              }
              onChange={e => this.changeValue(e, "boardTitle")}
            />
            <label
              htmlFor="boardTitle"
              className={this.state.boardTitle != null ? "active" : ""}
            >
              Title
            </label>
            {this.state.boardTitle_error_text && (
              <div className="error--text">
                {this.state.boardTitle_error_text}
              </div>
            )}
          </div>
          <div className="input-field col s12">
            <input
              id="boardDescription"
              type="text"
              value={
                this.state.boardDescription != null
                  ? this.state.boardDescription
                  : ""
              }
              className={
                this.state.boardDescription_is_valid != null ? "invalid" : ""
              }
              onChange={e => this.changeValue(e, "boardDescription")}
            />
            <label
              htmlFor="boardDescription"
              className={this.state.boardDescription != null ? "active" : ""}
            >
              Description
            </label>
            {this.state.boardDescription_error_text && (
              <div className="error--text">
                {this.state.boardDescription_error_text}
              </div>
            )}
          </div>
          <p>
            <label>
              <input
                type="checkbox"
                className="filled-in"
                onChange={e => {
                  this.setState({
                    isBoardPrivate: e.target.checked
                  });
                }}
              />
              <span>Private desk</span>
            </label>
          </p>
        </div>
      </div>
    );
  }

  createNewBoard(e) {
    e.preventDefault();
    if (!this.state.disabled)
      this.props.addBoard(
        this.state.boardTitle,
        this.state.boardDescription,
        null,
        this.state.isBoardPrivate
      );
  }

  isDisabled() {
    let boardTitle_is_valid = false;
    let boardDescription_is_valid = false;
    if (this.state.boardTitle === "" || this.state.boardTitle === null) {
    } else if (
      this.state.boardTitle.length > 3 &&
      this.state.boardTitle.length < 500
    ) {
      boardTitle_is_valid = true;
    } else {
      boardTitle_is_valid = false;
    }

    if (
      this.state.boardDescription === "" ||
      this.state.boardDescription === null
    ) {
    } else if (
      this.state.boardDescription.length > 0 &&
      this.state.boardDescription.length < 500
    ) {
      boardDescription_is_valid = true;
    } else {
      boardDescription_is_valid = false;
    }

    if (boardTitle_is_valid) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  }

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;

    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  render() {
    // debugger;
    return (
      <div className="container">
        <div className="row">
          <div className="col m8 offset-m2">
            <h4 className="left-align">User items</h4>
            {this.props.pin.getAllPinsLoading && (
              <div className="progress">
                <div className="indeterminate" />
              </div>
            )}

            {this.props.pin.getAllPinsError &&
              renderError(this.props.pin.getAllPinsError)}

            <ul className="collection">
              {this.renderCreateNewBoardForm()}
              {this.props.pin.getUserItems && this.renderPublicBoards()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { board, pin } = state;
  return {
    board,
    pin
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...dataActions, ...boardActions, ...pinActions },
    dispatch
  );
}

const connectedMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsContainer);
export { connectedMainPage as BoardsContainer };
