import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  dataActions,
  boardActions,
  pinActions,
  chatActions
} from "../../actions";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Card } from "../Card";
import {
  parseJSON,
  processErrorResponse,
  dateInWordsToNow,
  renderError
} from "../../utils/misc";

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  componentWillMount() {
    if (this.props.match.params.id != null) {
      let itemId = this.props.match.params.id;
      this.props.getItem(itemId);
      this.props.getGame(itemId);
    }
  }

  renderPins() {
    return this.props.board.getBoard.pins.map((pin, i) => {
      return this.renderPin(pin);
    });
  }

  renderPin(pin) {
    return (
      <Card
        key={pin.id}
        item={pin}
        updateItem={this.props.updateItem}
        deleteItem={this.props.deleteItem}
        loading={this.props.pin.updateItemLoading}
        error={this.props.pin.updateItemError}
        typeOfElement="pin"
      />
    );
  }

  renderPlayers() {
    return this.props.chat.game
      .map((item, i) => {
        // return item;

        return this.renderPlayer(item);
      })
      .filter(n => n);
  }

  renderPlayer(item) {
    let date = new Date(item.created);
    // date.addHours(4);
    return (
      <li
        key={item.id}
        className="collection-item avatar pin-content board__card"
      >
        <div className="board__card__content col m12">
          <div>
            <div className="title ">{item.username}</div>

            {/* <p className="title ">{item.created}</p> */}
          </div>
          <span className="board__misc__item--time">
            {`Last change `}
            {distanceInWordsToNow(date)}
          </span>

          {/* {JSON.stringify(item)} */}
        </div>
      </li>
    );
  }

  isInGame() {
    this.props.chat.game.find(function(element, index, array) {
      debugger;
    });
    // debugger;
  }

  render() {
    // debugger
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              <h4 className="left-align">Item</h4>
              {this.props.pin.getItemLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              {this.props.pin.pin && (
                <ul className="collection">
                  <Card
                    item={this.props.pin.pin}
                    updateBoard={this.props.updateBoard}
                    deleteItem={this.props.deleteItem}
                    loading={this.props.pin.updateBoardLoading}
                    error={this.props.pin.updateBoardError}
                    typeOfElement="item"
                    cardType="full"
                  />
                </ul>
              )}
              {this.props.pin.getItemError && (
                <div className="row error--container">
                  <div className="error error--text alert alert-info">
                    {this.props.pin.getItemError.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              <div className="title left-align">
                <h4 className="left-align players__list__item">Players </h4>
                {!this.props.chat.GetGameLoading && (
                  <i
                    className="material-icons board__card__button"
                    onClick={e => {
                      e.preventDefault;
                      let itemId = this.props.match.params.id;
                      this.props.getGame(itemId);
                      // debugger;
                    }}
                  >
                    refresh
                  </i>
                )}
                {this.props.chat.GetGameLoading && (
                  <div className="preloader-wrapper small active">
                    <div className="spinner-layer spinner-green-only">
                      <div className="circle-clipper left">
                        <div className="circle" />
                      </div>
                      <div className="gap-patch">
                        <div className="circle" />
                      </div>
                      <div className="circle-clipper right">
                        <div className="circle" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {this.props.chat.gameError && (
                <div className="row error--container">
                  <div className="error error--text alert alert-info">
                    {this.props.chat.gameError.message}
                  </div>
                </div>
              )}
              <ul className="collection">
                {this.props.chat.game && this.renderPlayers()}
                {/* {JSON.stringify(this.props.chat.game)} */}
                {/* {this.props.board.getBoard && this.renderPins()} */}
              </ul>
              {!this.props.chat.gameError && !this.props.chat.GetGameLoading && (
                <a
                  onClick={e => {
                    e.preventDefault;
                    let itemId = this.props.match.params.id;
                    this.props.joinGame(itemId);
                  }}
                  className="waves-effect waves-light btn-small"
                >
                  Leave
                </a>
              )}

              {!this.props.chat.gameError &&
                !this.props.chat.GetGameLoading &&
                this.props.chat.game &&
                this.isInGame() && (
                  <a
                    onClick={e => {
                      e.preventDefault;
                      let itemId = this.props.match.params.id;
                      this.props.leaveGame(itemId);
                    }}
                    className="waves-effect waves-light btn-small"
                  >
                    Join
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { board, pin, chat } = state;
  return {
    board,
    pin,
    chat
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...dataActions, ...boardActions, ...pinActions, ...chatActions },
    dispatch
  );
}

const connectedBoardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPage);
export { connectedBoardPage as BoardPage };
