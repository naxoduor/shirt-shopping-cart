import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShirtListItem from './shirt-list-item'
import DepartmentList from '../departments/departmentlist'
import Cart from '../cart'
import localStorage from 'local-storage'
import { fetchCartItems } from '../../action/requestActions'
import './index.css'
class ShirtList extends Component {

    constructor(props) {
        super(props)
        this.state = { showCart:false }

    }

    displayCart = () => {

        let carturl="http://127.0.0.1:8080/shoppingcart/?cart_id="+localStorage.get("cartId");
        this.props.fetchCartItems(carturl)
        console.log("set state to true")
        this.setState({ showCart: true })
      }
    
      hideCart = () => {
        this.setState({ showCart: false })
      }

    render() {

        let currentShirtProducts = this.props.products.items
        const renderShirtProducts = currentShirtProducts.map(product => {
            return (
                <ShirtListItem product={product} />
            )
        })

        return (
            <div>
                <div>
                    <div className="menu">
                        <DepartmentList />
                        <div><button onClick = { this.displayCart }>View Cart</button></div>
                    </div>
                    <div className="product-listing">
                        {renderShirtProducts}
                        <Cart show={ this.state.showCart } handleClose={this.hideCart } />
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    products: state.products
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCartItems: (carturl) => dispatch(fetchCartItems(carturl))    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShirtList)