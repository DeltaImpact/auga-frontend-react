import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../actions";
import { Card } from "./Card";
import {
  parseJSON,
  processErrorResponse,
  dateInWordsToNow,
  renderError
} from "../utils/misc";
class PinPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.match.params.id != null) {
      let pinId = this.props.match.params.id;
      this.props.getItem(pinId);
      this.props.getBoardsWherePinNotSaved(pinId);
      this.props.getBoardsWherePinSaved(pinId);
    }
  }

  renderBoards() {
    return this.props.pin.getItemBoards.map((board, i) => {
      return (
        <Card
          key={board.id}
          item={board}
          updateBoard={this.props.updateBoard}
          deleteBoard={this.props.deleteBoard}
          loading={this.props.board.updateBoardLoading}
          error={this.props.board.updateBoardError}
          objectWithErrorId={this.props.board.updateBoardId}
          typeOfElement="board"
          unpinAction={this.props.deleteItemFromBoard}
          pinId={this.props.pin.pin.id}
        />
      );
    });
  }

  renderBoardsToSave() {
    return this.props.pin.getItemAvaliableBoards.map((board, i) => {
      return (
        <Card
          key={board.id}
          item={board}
          updateBoard={this.props.updateBoard}
          deleteBoard={this.props.deleteBoard}
          loading={this.props.board.updateBoardLoading}
          error={this.props.board.updateBoardError}
          objectWithErrorId={this.props.board.updateBoardId}
          typeOfElement="board"
          pinAction={this.props.addItemToBoard}
          pinId={this.props.pin.pin.id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {this.props.pin.getItemLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              {this.props.pin.getItemBoardsError &&
                renderError(this.props.pin.getItemBoardsError)}
              <ul className="collection">
                {this.props.pin.pin && (
                  <Card
                    item={this.props.pin.pin}
                    updateItem={this.props.updateItem}
                    deleteItem={this.props.deleteItem}
                    loading={this.props.pin.updateItemLoading}
                    error={this.props.pin.updateItemError}
                    typeOfElement="pin"
                    cardType="full"
                  />
                )}
              </ul>
              {this.props.pin.pin && (
                <div class="card-content grey lighten-3">
                  User{" "}
                  <Link to={"/profile/" + this.props.pin.pin.lastAction.userName}>
                    {this.props.pin.pin.lastAction.userName}
                  </Link>{" "}
                  saved this pin to the <Link to={"/board/" + this.props.pin.pin.lastAction.boardId}>
                    {this.props.pin.pin.lastAction.boardName}
                  </Link> board.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {this.props.pin.deleteItemFromBoardError &&
                renderError(this.props.pin.deleteItemFromBoardError)}
              {this.props.pin.deleteItemFromBoardLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              {this.props.pin.pin && this.props.pin.getItemBoards && (
                <div>
                  <h4 className="left-align">Saved to</h4>
                  <ul className="collection">{this.renderBoards()}</ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {this.props.pin.addItemToBoardError &&
                renderError(this.props.pin.addItemToBoardError)}
              {this.props.pin.deleteItemFromBoardLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}

              {this.props.pin.pin && this.props.pin.getItemAvaliableBoards && (
                <div>
                  <h4 className="left-align">Save to</h4>
                  <ul className="collection">{this.renderBoardsToSave()}</ul>
                </div>
              )}
            </div>
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

const connectedPinPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PinPage);
export { connectedPinPage as PinPage };
