import React, { Component } from 'react';
import { connect } from 'react-redux'
import { c2bSimulate } from '../../payments/endpoints/moneyActions'

class SafaricomPayment extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let amount = "";
        let phoneNumber = this.props.customer.item.mob_phone
        let msisdn=phoneNumber.replace(/^[0]/, '254');   // 2345
        let billRefNumber = this.props.trxNumber.transactionNumber
        this.props.cartAmount.items.map(amt => {
            if (amt.total_amount) {
                amount = amt.total_amount
            }
        })
        amount=500
        
        this.props.c2bSimulate(msisdn, amount, billRefNumber, null, null)
    }
    render() {
        let phoneNumber = this.props.customer.item.mob_phone
        let msisdn=phoneNumber.replace(/^\+[0-9]/, '254');
        let total= 0;
        let deliveryTotal=0;
        this.props.orderDetails.items.map(product =>{
            total=total+(product.unit_cost * product.quantity)
        })
        this.props.orderDetails.items.map(product =>{
            deliveryTotal=deliveryTotal+(product.delivery_cost * product.quantity)
        })
        return (
            <div className="payment">
                <div className="payment-main">
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="header">Submit Payment</div>
                        <div className="box">
                        <div className="input-group">
                                <label htmlFor="paybill" className="paybill">Paybill Number</label>
                                <input type="text" id="paybill" className="paybill-input" value=""></input>
                            </div>
                            <div className="input-group">
                                <label htmlFor="transaction" className="transaction">Transaction Number</label>
                                <input type="text" id="transaction" className="transaction-input" value={this.props.trxNumber.transactionNumber}></input>
                            </div>
                            <div className="input-group">
                                <label htmlFor="amount" className="amount-label">AMOUNT PLUS DELIVERY COST</label>
                                <input type="text" id="amount" className="amount-input" value={total+deliveryTotal}></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        trxNumber: state.trxNumber,
        cartAmount: state.cartAmount,
        customer: state.customer,
        cartItems: state.cartItems,
        orderDetails: state.orderDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    c2bSimulate: (msisdn, amount, billRefNumber, commandId, shortCode) => dispatch(c2bSimulate(msisdn, amount, billRefNumber, commandId, shortCode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SafaricomPayment)