import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { dateInWordsToNow, renderError } from "../../utils/misc";
export class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      mode: "preview",
      editTitle: "",
      editDescription: "",
      editCost: 0,
      editNumberOfParticipants: 0,
      editIsPrivateBoard: null,
      editTitle_error_text: null,
      editCost_error_text: null,
      editNumberOfParticipants_error_text: null,
      disabled: false,
      contentType: null
      // editTitle_error_text: null,
    };
  }

  componentWillMount() {
    this.isDisabled();
  }

  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;

    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  isDisabled() {
    let editTitle_is_valid = false;
    let boardDescription_is_valid = false;
    let boardCost_is_valid = false;
    let boardNumberOfParticipants_is_valid = false;
    if (this.state.editTitle === "" || this.state.editTitle === null) {
      // this.setState({
      //   editTitle_error_text: null
      // });
    } else if (
      this.state.editTitle.length > 3 &&
      this.state.editTitle.length < 256
    ) {
      editTitle_is_valid = true;
      // this.setState({
      //   editTitle_error_text: null
      // });
    } else {
      editTitle_is_valid = false;
      // this.setState({
      //   editTitle_error_text: "Title length should be between 3 and 256."
      // });
    }

    if (
      this.state.editDescription == "" ||
      this.state.editDescription.length <= 500
    ) {
      boardDescription_is_valid = true;
    } else {
      boardDescription_is_valid = false;
    }

    if (this.state.editCost > 2) {
      // debugger;
      boardCost_is_valid = true;
      this.state.editCost_error_text = "";
    } else {
      boardCost_is_valid = false;
      this.state.editCost_error_text = this.state.editCost + " < 2";
    }

    if (this.state.editNumberOfParticipants > 2) {
      // debugger;
      boardNumberOfParticipants_is_valid = true;
      this.state.editNumberOfParticipants_error_text = "";
    } else {
      boardNumberOfParticipants_is_valid = false;
      this.state.editNumberOfParticipants_error_text =
        this.state.editCost + " < 2";
    }

    if (
      editTitle_is_valid &&
      boardDescription_is_valid &&
      boardCost_is_valid &&
      boardNumberOfParticipants_is_valid
    ) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  }

  renderCharacterCounter(string, minLength, maxLength) {
    let length = string != null ? string.length : 0;

    return (
      <span className="character-counter">
        <span className={length < minLength ? "error--text" : ""}>
          {minLength}/
        </span>
        {length}
        <span className={length > maxLength ? "error--text" : ""}>
          /{maxLength}
        </span>
      </span>
    );
  }

  renderCardImage(item, typeOfElement) {
    if (typeOfElement == "addItem") {
      return <i className="material-icons circle green">add</i>;
    }

    if (typeOfElement == "UserCard") {
      return <i className="material-icons circle green">person</i>;
    }
    if (typeOfElement == "board")
      return <i className="material-icons circle green">folder</i>;
    // if (item.img == null)
    //   return <i className="material-icons circle green">folder</i>;
    // debugger
    if (item.img != null)
      return <img src={item.img} alt="" className="circle" />;
    return <i className="material-icons circle green">folder</i>;
  }

  renderEditCard(item, typeOfElement) {
    // debugger
    return (
      <div>
        {this.renderCardImage(item, typeOfElement)}
        <div className="col m10">
          {this.props.error && renderError(this.props.error)}
          {this.props.loading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )}
          <div className="input-field col s12">
            <input
              id="editTitle"
              type="text"
              value={this.state.editTitle != null ? this.state.editTitle : ""}
              className={this.state.editTitle_is_valid != null ? "invalid" : ""}
              onChange={e => this.changeValue(e, "editTitle")}
            />
            <label
              htmlFor="editTitle"
              className={this.state.editTitle != null ? "active" : ""}
            >
              Title
            </label>
            {this.renderCharacterCounter(this.state.editTitle, 3, 80)}
            {this.state.editTitle_error_text && (
              <div className="error--text">
                {this.state.editTitle_error_text}
              </div>
            )}
          </div>
          <div className="input-field col s12">
            <input
              id="boardDescription"
              type="text"
              value={
                this.state.editDescription != null
                  ? this.state.editDescription
                  : ""
              }
              className={
                this.state.boardDescription_is_valid != null ? "invalid" : ""
              }
              onChange={e => this.changeValue(e, "editDescription")}
            />
            <label
              htmlFor="boardDescription"
              className={this.state.editDescription != null ? "active" : ""}
            >
              Description
            </label>
            {this.renderCharacterCounter(this.state.editDescription, 0, 500)}
            {this.state.boardDescription_error_text && (
              <div className="error--text">
                {this.state.boardDescription_error_text}
              </div>
            )}
          </div>
          {this.props.typeOfElement == "addItem" && (
            <div>
              <div className="input-field col s12">
                <input
                  id="boardCost"
                  type="number"
                  value={this.state.editCost != null ? this.state.editCost : ""}
                  className={
                    this.state.boardCost_is_valid != null ? "invalid" : ""
                  }
                  onChange={e => this.changeValue(e, "editCost")}
                />
                <label
                  htmlFor="boardCost"
                  className={this.state.editCost != null ? "active" : ""}
                >
                  Cost
                </label>
                {this.state.editCost_error_text && (
                  <div className="error--text">
                    {this.state.editCost_error_text}
                  </div>
                )}
              </div>

              <div className="input-field col s12">
                <input
                  id="boardNumberOfParticipants"
                  type="number"
                  value={
                    this.state.editNumberOfParticipants != null
                      ? this.state.editNumberOfParticipants
                      : ""
                  }
                  className={
                    this.state.boardNumberOfParticipants_is_valid != null
                      ? "invalid"
                      : ""
                  }
                  onChange={e =>
                    this.changeValue(e, "editNumberOfParticipants")
                  }
                />
                <label
                  htmlFor="boardNumberOfParticipants"
                  className={
                    this.state.editNumberOfParticipants != null ? "active" : ""
                  }
                >
                  Number of participants
                </label>
                {this.state.editNumberOfParticipants_error_text && (
                  <div className="error--text">
                    {this.state.editNumberOfParticipants_error_text}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderCardFaceAddItem(item, typeOfElement) {
    // debugger
    return (
      <div
        onClick={() => {
          this.setState({
            editIsPrivateBoard: false,
            disabled: true
          });
          this.setState({ mode: "edit" });
        }}
      >
        {this.renderCardImage(item, typeOfElement)}
        <span className="title board__card__text--short">Create item</span>
      </div>
    );
  }

  renderCardFacePinOrBoard(item, typeOfElement) {
    // debugger
    return (
      <div>
        <Link to={"/" + typeOfElement + "/" + item.id}>
          {this.renderCardImage(item, typeOfElement)}
          <div
            className={
              this.props.cardType == "full"
                ? "title "
                : "title board__card__text--short"
            }
          >
            {item.name}
          </div>

          <p
            className={
              this.props.cardType == "full" ? "" : "board__card__text--short"
            }
          >
            {item.description}
          </p>
        </Link>
        {item.link && (
          <a href={item.link} className="">
            <span className="board__misc board__card__text--short">
              {item.link}
            </span>
          </a>
        )}

        {item.cost && (
          <p className="board__misc board__card__text--short">
            Cost: {item.cost}
          </p>
        )}

        {item.numberOfParticipants && (
          <p className="board__misc board__card__text--short">
            Number of players: {item.numberOfParticipants}
          </p>
        )}

        {/* {item} */}
        {/* {JSON.stringify(item)} */}

        {this.renderMiscOfCard(item, typeOfElement)}
      </div>
    );
  }

  renderCardFaceUserCard(item, typeOfElement) {
    // debugger
    return (
      <div>
        <div>
          {this.renderCardImage(item, typeOfElement)}
          <div
            className={
              this.props.cardType == "full"
                ? "title "
                : "title board__card__text--short"
            }
          >
            {item.userName}
          </div>

          <p
            className={
              this.props.cardType == "full" ? "" : "board__card__text--short"
            }
          >
            {item.email}
          </p>
        </div>
        {item.link && (
          <a href={item.link} className="">
            <span className="board__misc board__card__text--short">
              {item.link}
            </span>
          </a>
        )}

        {this.renderMiscOfCard(item, typeOfElement)}
      </div>
    );
  }

  renderCardFace(item, typeOfElement) {
    if (typeOfElement == "addItem")
      return this.renderCardFaceAddItem(item, typeOfElement);
    if (typeOfElement == "UserCard")
      return this.renderCardFaceUserCard(item, typeOfElement);
    return this.renderCardFacePinOrBoard(item, typeOfElement);
  }

  renderMiscOfCardFull(item, typeOfElement) {
    return (
      <div className="board__misc">
        {item.modified && (
          <span className="board__misc__item--time">
            Last change {dateInWordsToNow(item.modified)}
          </span>
        )}
        {item.created && (
          <span className="board__misc__item--time">
            Last change {dateInWordsToNow(item.created)}
          </span>
        )}
        {item.isPrivate ? (
          <span className="board__misc__item--lock">Private board</span>
        ) : null}
      </div>
    );
  }

  renderMiscOfCardSmall(item, typeOfElement) {
    let content;
    if (
      typeOfElement != "UserCard" &&
      typeOfElement != "board" &&
      typeOfElement != "item"
    ) {
      debugger;
    }

    if (typeOfElement == "board" || typeOfElement == "item")
      content = this.renderMiscOfCardSmallBoardOrPin(item, typeOfElement);

    if (typeOfElement == "UserCard")
      content = this.renderMiscOfCardSmallUserCard(item, typeOfElement);
    return <div className="board__misc">{content}</div>;
    // if (typeOfElement == "UserCard") return (<div className="board__misc">{this.renderMiscOfCardSmallUserCard(item, typeOfElement)}</div>);
  }

  renderMiscOfCardSmallBoardOrPin(item, typeOfElement) {
    {
      item.modified ||
        (item.created && (
          <span className="board__misc__item--time">
            {`Last change `}
            {item.modified
              ? dateInWordsToNow(item.modified)
              : dateInWordsToNow(item.created)}
          </span>
        ));
    }

    let date = item.modified
      ? dateInWordsToNow(item.modified)
      : dateInWordsToNow(item.created);
    // debugger;
    // {item.modified ||
    //   (item.created && (
    //     <span className="board__misc__item--time">
    //       {`Last change `}
    //       {/* {item.modified
    //         ? dateInWordsToNow(item.modified)
    //         : dateInWordsToNow(item.created)} */}
    //     </span>
    //   ))}
    return (
      <div className="board__misc">
        {item.pinsCount ? (
          <span className="board__misc__item--save">{item.pinsCount} pins</span>
        ) : null}

        {date ? (
          <span className="board__misc__item--time">
            {`Last change ` + date}
          </span>
        ) : null}

        {item.isPrivate ? (
          <span className="board__misc__item--lock">Private board</span>
        ) : null}
      </div>
    );
  }

  renderMiscOfCardSmallUserCard(item, typeOfElement) {
    // debugger
    return (
      <React.Fragment>
        {item.isOnline ? (
          <span className="board__misc__item--radio_button_checked">
            Connected
          </span>
        ) : (
          <span className="board__misc__item--radio_button_unchecked">
            Offline
          </span>
        )}
      </React.Fragment>
    );
  }

  renderMiscOfCard(item, typeOfElement) {
    if (typeOfElement == "full")
      return this.renderMiscOfCardFull(item, typeOfElement);
    return this.renderMiscOfCardSmall(item, typeOfElement);
  }

  renderConfirmDelete(item, typeOfElement) {
    // debugger
    let deleteCompletelyButton;
    if (this.props.deleteBoard || this.props.deleteItem) {
      deleteCompletelyButton = (
        <a
          onClick={e => {
            e.preventDefault;
            if (this.props.deleteBoard) this.props.deleteBoard(item.id);
            debugger;
            if (this.props.deleteItem) this.props.deleteItem(item.id);
          }}
          className="waves-effect waves-light btn"
        >
          Delete {typeOfElement} completely
        </a>
      );
    }

    return (
      <div>
        {this.renderCardImage(item, typeOfElement)}
        {`Please confirm, that you want to delete ${typeOfElement} ${
          item.name
        }.`}
        <div className="card-action">{deleteCompletelyButton}</div>
      </div>
    );
  }

  renderCardActionsEdit(item, typeOfElement, isHovered) {
    return (
      <div className="secondary-content">
        <i
          className="material-icons board__card__button"
          onClick={e => {
            e.preventDefault;

            this.setState({
              mode: "preview"
            });
          }}
        >
          close
        </i>
        <i
          className={
            this.state.disabled
              ? "material-icons board__card__button grey-text"
              : "material-icons board__card__button"
          }
          onClick={e => {
            e.preventDefault;
            if (!this.state.disabled) {
              if (this.props.updateBoard) {
                this.props.updateBoard(
                  item.id,
                  this.state.editTitle,
                  this.state.editDescription,
                  this.state.editIsPrivateBoard
                );
              }

              if (this.props.updateItem) {
                this.props.updateItem(
                  item.id,
                  this.state.editTitle,
                  this.state.editDescription
                );
              }

              if (this.props.addItem)
                // debugger;
                this.props.addItem(
                  this.state.editTitle,
                  this.state.editDescription,
                  this.state.editCost,
                  this.state.editNumberOfParticipants
                );
            }
          }}
        >
          check
        </i>
      </div>
    );
  }

  renderCardActionsConfirmDelete(item, typeOfElement, isHovered) {
    return (
      <Fragment>
        {/* Are you sure about this? */}
        <div className="secondary-content">
          <i
            className="material-icons board__card__button"
            onClick={e => {
              e.preventDefault;
              this.setState({
                mode: "preview"
              });
            }}
          >
            close
          </i>
        </div>
      </Fragment>
    );
  }

  renderCardActionsPinOrBoard(item, typeOfElement, isHovered) {
    // debugger
    if (this.props.editable != "false")
      return (
        <div className="secondary-content">
          {/* <i
            className="material-icons board__card__button"
            onClick={e => {
              e.preventDefault;
              this.setState({
                editTitle: item ? item.name : "",
                editDescription: item ? item.description : "",
                editIsPrivateBoard:
                  item && item.isPrivate ? item.isPrivate : null,
                editTitle_error_text: null,
                disabled: false
              });
              this.setState({
                mode: "edit"
              });
            }}
          >
            edit
          </i> */}
          <i
            className="material-icons board__card__button"
            onClick={e => {
              e.preventDefault;
              this.setState({
                mode: "confirmDelete"
              });
            }}
          >
            delete
          </i>
          {this.props.pinAction && (
            <i
              className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                this.props.pinAction(this.props.pinId, this.props.item.id);
              }}
            >
              playlist_add
            </i>
          )}
          {this.props.unpinAction && (
            <i
              className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                this.props.unpinAction(this.props.pinId, this.props.item.id);
              }}
            >
              playlist_add_check
            </i>
          )}
        </div>
      );
  }

  renderCardActionsUserCard(item, typeOfElement, isHovered) {
    // debugger
    return (
      <div className="secondary-content">
        <Link to={"/messages/" + item.userName}>
          <i className="material-icons board__card__button">message</i>
        </Link>
        {/* <i className="material-icons board__card__button">message</i> */}
      </div>
    );
  }

  renderCardActions(item, typeOfElement, isHovered) {
    // debugger;
    if (this.state.mode == "edit")
      return this.renderCardActionsEdit(item, typeOfElement, isHovered);

    if (this.state.mode == "confirmDelete")
      return this.renderCardActionsConfirmDelete(
        item,
        typeOfElement,
        isHovered
      );

    if (this.state.mode == "preview" && typeOfElement == "UserCard")
      return this.renderCardActionsUserCard(item, typeOfElement, isHovered);

    if (isHovered && typeOfElement != "addItem" && typeOfElement != "UserCard")
      return this.renderCardActionsPinOrBoard(item, typeOfElement, isHovered);
  }

  render() {
    const { item, typeOfElement } = this.props;

    this.state.contentType = typeOfElement;
    let cardContent;
    // debugger
    switch (this.state.mode) {
      case "preview":
        cardContent = this.renderCardFace(item, typeOfElement);
        break;
      case "edit":
        cardContent = this.renderEditCard(item, typeOfElement);
        break;
      case "confirmDelete":
        cardContent = this.renderConfirmDelete(item, typeOfElement);
        break;
      default:
        return null;
    }

    return (
      <li
        className={
          this.state.isHovered
            ? "collection-item avatar pin-content board__card board__card__container--active"
            : "collection-item avatar pin-content board__card"
        }
        // className={"collection-item avatar pin-content board__card board__card__container--active"}
        // className={
        //   "collection-item avatar pin-content board__card" +
        //   this.state.isHovered
        //     ? " board__card__container--active"
        //     : ""
        // }
        onMouseEnter={() =>
          this.setState({
            isHovered: true
          })
        }
        onMouseLeave={() =>
          this.setState({
            isHovered: false
          })
        }
      >
        <div className="board__card__content col m12">{cardContent}</div>
        {this.renderCardActions(item, typeOfElement, this.state.isHovered)}
      </li>
    );
  }
}
