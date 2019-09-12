import React from 'react'
import { connect } from 'react-redux'
import CheckoutForm from './checkoutform';
import StripeCheckout from '../payments/StripeCheckout'

class Checkout extends React.Component{
state = {
    flag: true,
  }

showStripeModule = () => { 
this.setState({
    flag: false
})
}

render() {
  //const { cart } = this.props.cart
  return <div>
      <div style={{ border: '1px solid black'}}>
      </div>
      {this.state.flag ?
      <CheckoutForm handleStripe={this.showStripeModule}/>
       :
      <StripeCheckout/>
      }

  </div>
}
}

const mapDispatchToProps = (dispatch) => {
    return {
     // createOrder: (user) => dispatch(createOrder(user)),
    }
  }
  
  const mapStateToProps = (state) => {
  return {        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
