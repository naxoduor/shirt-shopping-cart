import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Row, Col, FormGroup, FormLabel, FormControl, Button, FormCheck } from 'react-bootstrap';
import { fetchShippingInformation, updateShippingId, updateShippingCost, createOrder } from '../../action/requestActions'
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
    let customerId = this.props.customer.item.customer_id
    let shippingId = this.props.shippingId.shippingId
    let order={}
    order.cartId = cartId
    order.customerId = customerId
    order.shippingId = shippingId
    order.taxId = 1

    console.log(order)

    localStorage.set("cartId", null);
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
        this.props.updateShippingId(selectedRegion)
    }

    render() {

        const renderRegions = this.props.shippingRegions.items.map(region => {
            return (
                <option value={region.shipping_region_id} >{region.shipping_region}</option>
            )
        })

      
        return (
            <div>
                <h>CHOOSE DELIVERY REGION</h>
                <div>
                    <Form onSubmit={this.submitOrder}>
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
        updateShippingId: (shipping_id) => dispatch(updateShippingId(shipping_id)),
        createOrder: (order) => dispatch(createOrder(order)),
        updateShippingCost: (shipping_cost) => dispatch(updateShippingCost(shipping_cost))
    }
}

const mapStateToProps = (state) => {
    return {
        shippingRegions: state.shippingRegions,
        shippingInfo: state.shippingInfo,
        customer: state.customer,
        shippingId: state.shippingId,
        cartItems:state.cartItems,
        orderDetails:state.orderDetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutForm)