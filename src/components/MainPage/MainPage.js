import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Card } from "../Card";
import {
  parseJSON,
  processErrorResponse,
  dateInWordsToNow,
  renderError
} from "../../utils/misc";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  componentWillMount() {
    this.props.getItems();
  }

  renderPins() {
    return this.props.pin.pins.map((pin, i) => {
      return this.renderPin(pin);
    });
  }

  renderPin(item) {
    return (
      <Card
        key={item.id}
        item={item}
        // updateItem={this.props.updateItem}
        // deleteItem={this.props.deleteItem}
        // deleteItem={this.props.deleteItem}
        // loading={this.props.pin.updateItemLoading}
        // error={this.props.pin.updateItemError}
        typeOfElement="item"
        editable="false"
      />
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {this.props.pin.getItemsLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              {this.props.pin.getItemsError && (
                <div className="row error--container">
                  <div className="error error--text alert alert-info">
                    {this.props.pin.getItemsError.message}
                  </div>
                </div>
              )}
              <ul className="collection">
                {this.props.pin.pins && this.renderPins()}
              </ul>
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

const connectedBoardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
export { connectedBoardPage as MainPage };
