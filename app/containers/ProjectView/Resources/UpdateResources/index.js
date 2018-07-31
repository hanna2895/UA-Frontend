/**
 *
 * UpdateResources
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Row, Col, Button, Modal } from 'react-bootstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUpdateResources, makeSelectListedPlaces } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { updateResourceAction, listPlacesAction } from './actions'
import { styles, headings } from 'assets/styles/variables';





export class UpdateResources extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)

    this.state = {
      item: '',
      quantity: '',
      date: '',
      place: '',
      openModel: false

    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.create(
      {

        item: this.state.item,
        quantity: this.state.quantity,
        dateId: this.state.date,
        placeId: this.state.place,
        projectId: this.props.projectId,


      },
      this.props.updateResources(this.props.projectId)

   );
    setTimeout(() =>{
      this.close();
    },800);

  }

  componentDidMount(){

  }

  open = () => {
    this.setState({
      openModel : true,
    })
  }

  close = () => {
    this.setState({
      openModel : false,
    });
  }

  renderListPlaces = () =>{
    if (this.props.updateResources && this.props.updateResources.listedPlaces && this.props.updateResources.listedPlaces.length > 0) {
      return this.props.Resources.listedPlaces.map(places => {
        return(
           <option key={Math.random()} value={places._id}>{places.name}</option>
           )
      })
    }
  }

  renderButton = () => {
    if (this.props.windowWidth < 600) {
      return (
        <button onClick={this.open} className="btn btn-block" style={styles.primaryLight}>
          <span>Edit this Resource</span>
        </button>
      )
    } else {
      return (
        <button onClick={this.open} className="btn" style={styles.primary}>
          <span>Edit this Resource</span>
        </button>
      )
    }
  }

  render() {
    return (
      <div>

        {this.renderButton()}
            { /* END table-responsive */}
            {/* <div className="panel-footer">Panel Footer</div> */}
        <Modal show={this.state.openModel} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Update Resource</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal"  >
              <fieldset>
                <Row>
                  <Col sm={10}>
                    <div className="col-md-offset-1">
                      <div className="form-group mb">
                        <label className="col-sm-2 control-label mb">Item</label>
                        <Col sm={10}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Please Add item"
                          />
                        </Col>
                      </div>
                      <div className="form-group mb">
                        <label className="col-sm-2 control-label mb">Quantity</label>
                        <Col sm={10}>
                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            placeholder="Quantity number"
                          />
                        </Col>
                      </div>
                      <div className="form-group mb">
                        <label className="col-sm-2 control-label mb">date</label>
                        <Col sm={10}>
                          <input
                            type="date"
                            name="date"
                            className="form-control"
                            placeholder="date"
                          />
                        </Col>
                      </div>
                      <div className="form-group mb">
                        <label className="col-sm-2 control-label mb">Place</label>
                        <Col md={10}>
                          <p style={{
                            color: 'red'
                          }}>
                            {/* {this.state.projectname} */}
                          </p>
                            <select value={this.state.place} name="place" className="form-control">
                              {this.renderListPlaces()}
                            </select>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
              </fieldset>
              <button className="btn-block btn btn-success">Add Resources</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={this.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

UpdateResources.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({

  updateResources: makeSelectUpdateResources(),
  placesList: makeSelectListedPlaces(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    listPlace: () => dispatch(listPlacesAction()),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'updateResources', reducer });
const withSaga = injectSaga({ key: 'updateResources', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UpdateResources);