import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import { login } from '../../redux/actionsLogin';
import listItem from '../../redux/actionsListItem';
import { 
  actionAddItem,
  deleteItem,
  actionEditItem,
  editItem
} from '../../redux/actionsCreatItem';

import './main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.props.listItem();
  }

  addItem = () => {
    this.props.actionAddItem();
    document.querySelector('.link').click();
  };

  editElem = (item, keyItem) => {
    this.props.actionEditItem(item, keyItem);
    document.querySelector('.link').click();
  };

  deleteElem = (keyItem) => {
    this.props.deleteItem(keyItem);
  };

  renderContent = (renderListItem) => {
    // console.log(renderListItem);
    const keys = Object.keys(renderListItem);
    // console.log(keys);
    return (
      <div className="main__content">
        {keys.map((item, index) => {
          return (
            <div
              className="main__content__elem"
              key={ index }
            >
              <div
                className="main__content__photo"
              >
                <img
                  src={renderListItem[item].refPhoto}
                  alt={renderListItem[item].header}
                  style={{ width: '200px', height: '200px'}}
                />
              </div>
              <div
                className="main__content__item"
              >
                <h1>{renderListItem[item].header}</h1>
                <span>{renderListItem[item].aboutItem}</span>
                <span>
                  Цена: {renderListItem[item].price}$
                </span>
                <span
                  style={{
                    display: renderListItem[item].percentDiscount ? 'block' : 'none',
                    color: 'red'
                  }}
                >
                  Скидка: {renderListItem[item].percentDiscount}%
                </span>
                <span
                  style={{
                    display: renderListItem[item].percentDiscount ? 'block' : 'none',
                    color: 'red'
                  }}
                >
                  До: {renderListItem[item].endDateDiscount}
                </span>
                <div
                  className="main__content__item__buttonBlock"
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.editElem(renderListItem[item], item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.deleteElem(item)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })
        }
      </div>
    );
  };

  render() {
    const { renderListItem, user } = this.props;
    return (
      <div>
        <div className="main__header">
          <div className="logo__block">
            {user.name}
          </div>
          <div>
            <h1>Catalog Items</h1>
          </div>
          <div className="select__block">
            <Button
              variant="contained"
              onClick={() => this.addItem()}
            >
            Add item
            </Button>
            <Link className="link" to="/creat__item" />
          </div>
        </div>
        {this.renderContent(renderListItem)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  renderListItem: state.listItem
});

export default connect(
  mapStateToProps,
  { login, listItem, deleteItem, editItem, actionAddItem, actionEditItem }
)(Main);
