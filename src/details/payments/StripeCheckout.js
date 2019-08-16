import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'


class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.onToken = this.onToken.bind(this)
    }

    onToken = (amount, description) => token => {

        this.getMoney(token)

    }

    async getMoney(token) {

        let response = await fetch("http://127.0.0.1:9000/charge", {
            method: 'POST',
            headers: { 'Content-type': 'text/plain' },
            body: token.id
        });
        //this.props.removeAllProductsFromCart();
        this.props.history.push("/");
        if (response.ok) {
            console.log("Purchase Completed")
        }

    }

    render() {
        let description = "Awesome Amount"

        let amount = "";
        this.props.cartAmount.items.map(amt => {
            if (amt.total_amount) {
                amount = amt.total_amount
            }
        })

        let totalamt = parseInt(amount)

        console.log("the amount found is")
        console.log(amount)
        return (
            <StripeCheckout
                amount={totalamt}
                billingAddress
                description={description}
                locale="auto"
                token={this.onToken(amount, description)}
                stripeKey="pk_test_74JXRfxXWD6utRVyr7DRUFqT"
                zipCode />
        )
    }
}

const mapStateToProps = state => ({
    cartAmount: state.cartAmount
})
export default withRouter(connect(mapStateToProps, null)(Checkout))
