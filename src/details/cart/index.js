import React, { Component } from 'react'
import localStorage from 'local-storage'
import { connect } from 'react-redux'
import { removeCartProduct, updateCartItem } from '../../action/requestActions';
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

  handleAddProduct = (e, item_id) => {
    e.preventDefault()
    let carturl='http://104.248.73.139:8080/shoppingcart/add'
    let quantity = e.target.value
    this.props.updateCartItem(carturl, item_id, quantity)
  }
  removeCartProduct = (e, item_id) => {
    e.preventDefault()
    let carturl=`http://127.0.0.1:8080/shoppingcart/removeProduct/?item_id=${item_id}`
    console.log(carturl)
    this.props.removeCartProduct(carturl, item_id)
    this.props.handleClose()
  }

  render() {
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
                  padding={10}
                  src={`/products/${product.image}`}
                />
              </td>
              <td>{product.attributes}</td>
              <td>{product.price}</td>
              <td><input type="number" min="0" max="10" step="1" defaultValue={product.quantity} onClick={(e) => this.handleAddProduct(e, product.item_id)}/></td>
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
    removeCartProduct: (carturl, item_id) => dispatch(removeCartProduct(carturl, item_id)),
    updateCartItem: (carturl, item_id, quantity) => dispatch(updateCartItem(carturl, item_id, quantity))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))