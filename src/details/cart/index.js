import React, { Component } from 'react'
import localStorage from 'local-storage'
import { connect } from 'react-redux'
import { removeCartProduct, updateCartItem, fetchCartItems, generateTransactionNumber } from '../../action/requestActions';
import './cart.css'
import { withRouter } from "react-router-dom";

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkoutactive: false,
      name:'Maradona'
    }
  }

  checkout = (event) => {
    console.log("checkout method has been called")
    if(this.props.authentication.authenticated){
    this.props.generateTransactionNumber()
    this.props.history.push('/checkout')
    }
    else{
      this.props.showSignIn()
      this.props.history.push('/')
    }
    this.props.handleClose()
  }

  handleAddProduct = (e, item_id) => {
    let carturl = 'http://127.0.0.1:8080/shoppingcart/add'
    let quantity = e.target.value
    this.props.updateCartItem(item_id, quantity)
    this.setState({name:"Nax Oduor"})
  }

  removeCartProduct = (e, item_id) => {
    e.preventDefault()
    let carturl = `http://127.0.0.1:8080/shoppingcart/removeProduct/?item_id=${item_id}`
    console.log(carturl)
    this.props.removeCartProduct(carturl, item_id)
    this.props.handleClose()
  }

  render() {
    let total=0
    let deliveryTotal=0

    this.props.cartItems.items.map(product => 
      deliveryTotal=deliveryTotal+(product.delivery_cost*product.quantity)      
    )

    this.props.cartItems.items.map(product => 
      total=total+(product.price*product.quantity)      
)

    const showHideClassName = this.props.show ? "cartmodal display-block" : "cartmodal display-none";
    return <div className={showHideClassName}>
      <h>CART ITEMS</h>
      <div className="cart-main">
        <span className="close" onClick={this.props.handleClose}>&times;</span>
        <table>
          <col width="160"></col>
          <col width="160"></col>
          <col width="160"></col>
          <col width="160"></col>
          <col width="160"></col>
          <col width="160"></col>
          <tr>
            <th>Image</th>
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
                    height={80}
                    title={product.name}
                    padding={5}
                    src={`/energy/${product.image}`}
                  />
                </td>
                <td><input type="number" min="0" max="10" step="1" defaultValue={product.quantity} onClick={(e) => this.handleAddProduct(e, product.item_id)} /></td>
                <td>{product.price}</td>
                <td>{product.price * product.quantity}</td>
                <td><span className="rmvItem" onClick={(e) => this.removeCartProduct(e, product.item_id)}>&times;</span></td>
                {this.state.update}
              </tr>
              )
            }
            <tr>
                <td>TOTAL</td>
                <td></td>
                <td></td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>DELIVERY COST</td>
                <td></td>
                <td></td>
                <td>{deliveryTotal}</td>
              </tr>
              <tr>
                <td>TOTAL COST PLUS DELIVERY</td>
                <td></td>
                <td></td>
                <td>{total+deliveryTotal}</td>
              </tr>
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
    cartAmount: state.cartAmount,
    authentication: state.authentication
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeCartProduct: (carturl, item_id) => dispatch(removeCartProduct(carturl, item_id)),
    updateCartItem: (carturl, item_id, quantity) => dispatch(updateCartItem(carturl, item_id, quantity)),
    fetchCartItems: (cartshoppingurl, cart_id) => dispatch(fetchCartItems(cartshoppingurl, cart_id)),
    generateTransactionNumber: () => dispatch(generateTransactionNumber())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))