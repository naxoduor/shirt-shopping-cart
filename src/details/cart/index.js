import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeCartProduct } from '../../action/requestActions';
import './cart.css'
import { withRouter } from "react-router-dom";

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkoutactive: false
    }
  }

  checkout = (event) => {
    console.log("checkout method has been called")
    this.props.history.push('/checkout')
    this.props.handleClose()
  }
  removeCartProduct = (e, item_id) => {
    e.preventDefault()
    let carturl=`http://127.0.0.1:8080/shoppingcart/removeProduct/?item_id=${item_id}`
    console.log(carturl)
    this.props.removeCartProduct(carturl)
  }

  render() {
    let items = this.props.cartItems.items
    items.forEach((product)=> {
      console.log(product.attributes)
      console.log(product.products)
    })
    console.log(this.props.cartItems.products)
    const showHideClassName = this.props.show ? "cartmodal display-block" : "cartmodal display-none";
    return <div className={ showHideClassName }>
    <h>CART ITEMS</h>
    <div className="cart-main">
    <span className="close" onClick={this.props.handleClose}>&times;</span>
      <table>
        <col width="150"></col>
        <col width="150"></col>
        <col width="150"></col>
        <col width="150"></col>
        <col width="150"></col>
        <col width="150"></col>
        <tr>
          <th>Image</th>
          <th>Attributes</th>
          <th>Quantity</th>
          <th>price</th>
          <th>Subtotal</th>
          <th>Remove</th>
        </tr>

        <tbody>
          {
          this.props.cartItems.items.map(product => <tr>
              <td>
                <img
                  height={70}
                  title={product.name}
                  src={`/products/${product.image}`}
                />
              </td>
              <td>{product.attributes}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.price * product.quantity}</td>
              <td><span className="rmvItem" onClick={(e) => this.removeCartProduct(e, product.item_id)}>&times;</span></td>
            </tr>)
          }
        </tbody>
      </table>
      <div><button className="checkoutbtn" onClick={this.checkout}>Checkout</button></div>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    cartAmount: state.cartAmount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeCartProduct: (carturl) => dispatch(removeCartProduct(carturl)),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))