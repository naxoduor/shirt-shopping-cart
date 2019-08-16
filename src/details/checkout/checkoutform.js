import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Row, Col, FormGroup, FormLabel, FormControl, Button, FormCheck } from 'react-bootstrap';
import { fetchShippingInformation, updateShippingId, createOrder } from '../../action/requestActions'
import localStorage from 'local-storage'
class CheckOutForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            shippingPresent: false
        }
    }

   submitOrder=(event)=>{
       event.preventDefault()
        console.log("has reached submitOrder")
        console.log(this.state)

        const {email, firstName} = this.state
    
    axios.post("http://127.0.0.1:3001/api/form",{
        order: {
            firstName,
            email,
            order_items_attributes: this.props.cartItems.items.map(item => ({
                product_id: item.id,
                qty: item.quantity,
                pname: item.name
            }))
        }
    }).then(json =>{
        if(json.errors) {
            alert('something went wrong')
            return
        }
        document.location.href = `/orders/${json.id}`
    })
    let cartId = localStorage.get("cartId")
    let customerId = "";
    this.props.customerId.items.map(custoId => {
      if(custoId.customer_id){
      customerId = custoId.customer_id
      }
    })
    //let customerId = this.props.customerid.items[0].customer_id
    let shippingId = this.props.shippingId.items.shippingId
    let order={}
    order.cartId = cartId
    order.customerId = customerId
    order.shippingId = shippingId
    order.taxId = 1

    console.log(order)

    localStorage.clear();
    this.props.createOrder(order)
    this.props.handleStripe()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegionChange = (event, id) => {
        event.preventDefault()
        let selectedRegion = event.target.value
        this.props.fetchShippingInformation(selectedRegion)
        this.setState({ shippingPresent: true })
    }

    handleAddShippingType = (event) => {
        event.preventDefault()
        let id=event.target.value
        console.log(id)
        this.props.updateShippingId(id)
    }

    render() {
        console.log(this.props.shippingInfo.items)

        const renderRegions = this.props.shippingRegions.items.map(region => {
            return (
                <option value={region.shipping_region_id}>{region.shipping_region}</option>
            )
        })

        let renderShippingInfo=[]

        if (this.state.shippingPresent) {
                renderShippingInfo = this.props.shippingInfo.items.map(shipping => {
                return (
                    <option value={shipping.shipping_id}>{shipping.shipping_cost}</option>
                )
            })

        }

        return (
            <div>
                <h>Component Loaded</h>
                <div>
                    <Form onSubmit={this.submitOrder}>
                        <Row>
                            <Col>
                                <FormGroup controlId="formGridFirstName">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId="formGridLastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId="formGridEmail">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId="formGridAddress">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup controlId="formGridCity">
                                    <FormLabel>City</FormLabel>
                                    <FormControl type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup controlId="formGridState">
                                    <FormLabel>State</FormLabel>
                                    <FormControl type="text" name="state" placeholder="State" value={this.state.state} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup controlId="formGridCountry">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl type="text" name="country" placeholder="Country" value={this.state.country} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup controlId="formGridZipCode">
                                    <FormLabel>ZipCode</FormLabel>
                                    <FormControl type="text" name="zipcode" placeholder="ZipCode" value={this.state.zipcode} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormLabel>Shippng</FormLabel>
                        <Row>
                            <Col>
                                <FormGroup controlId="formGridRegion">
                                    <FormLabel>Region</FormLabel>
                                    <FormControl as="select" onChange={(e) => this.handleRegionChange(e)}>
                                        <option>Choose...</option>
                                        {renderRegions}
                                    </FormControl>
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup controlId="formGridType">
                                    <FormLabel>Type</FormLabel>
                                    <FormControl as="select" onClick={(event)=>this.handleAddShippingType(event)}>
                                        <option>Choose...</option>
                                        {renderShippingInfo}
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup id="formGridCheckbox">
                            <FormCheck type="checkbox" label="Check me out" />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Submit</Button>
                    </Form>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShippingInformation: (region_id) => dispatch(fetchShippingInformation(region_id)),
        updateShippingId: (id) => dispatch(updateShippingId(id)),
        createOrder: (order) => dispatch(createOrder(order))
    }
}

const mapStateToProps = (state) => {
    return {
        shippingRegions: state.shippingRegions,
        shippingInfo: state.shippingInfo,
        customerId: state.customerId,
        shippingId: state.shippingId,
        cartItems:state.cartItems
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutForm)