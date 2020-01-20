import React, { Component } from 'react'
import localStorage from 'local-storage'
import { connect } from 'react-redux'
import { addToCart, fetchCartItems } from '../../action/requestActions'
import './details-modal.css';

class DetailsModal extends Component {
    constructor() {
        super()
        this.state = {
            color: 'W',
            size: 'S',
            quantity: null
        }
    }

    handleQuantityClick = (event) => {
        event.preventDefault()
        this.setState({
            quantity:parseInt(event.target.value)
        })
    }

    handleColorClick = (event) => {
        event.preventDefault()
        this.setState({
            color: event.target.id
        })
        this.props.product.color = event.target.id
    }

    handleSizeClick = (event) => {
        event.preventDefault()
        this.setState({
            size: event.target.id
        })
        this.props.product.size = event.target.id;
    }

    handleAddToCart = (event, product) => {
        event.preventDefault()
        let quantity=1
        if(this.state.quantity){
            quantity=this.state.quantity
        }
        else{
            quantity=1
        }
        let carturl = 'http://127.0.0.1:8080/shoppingcart/add'
        let cartId = localStorage.get("cartId")
        this.props.addToCart(carturl, cartId, product, quantity)
        this.props.handleClose()
    }

    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        let colors = this.props.attributes.items.colorAttributes
        let size = this.props.attributes.items.sizeAttributes
        let renderSize=""
        let renderColors=""
        if(size) {
           renderSize = size.map(currentSize => {
            return (
                <button id={currentSize.value} className={this.state.size === currentSize.value ? "sizeButton small" : "nsizeButton small"} onClick={this.handleSizeClick} >{currentSize.value}</button>
            )
        })
    }

    if(colors) {
        renderColors = colors.map(currentColor => {
         return (
            <button id={currentColor.value} className={this.state.color === currentColor.value ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>{currentColor.value}</button>
         )
     })
 }
        return (
            <div className={showHideClassName}>
                <div className="modal-main">
                <span className="close" onClick={this.props.handleClose}>&times;</span>
                    <div className="left_frame">
                        <div className='right_images'>
                            <div className='modalImage'>
                                <img
                                    height={150}
                                    width={170}
                                    title={this.props.product.name}
                                    src={`/energy/${this.props.product.image}`}
                                />
                            </div>
                            <div className='modalImage2'>
                                <img
                                    height={40}
                                    width={40}
                                    title={this.props.product.name}
                                    src={`/products/${this.props.product.image}`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="right_frame">
                        <div className='modal-product-details'>
                        <span className="close" onClick={this.props.handleClose}>&times;</span>
                            <div className='product-title'>{this.props.product.name}</div>
                            <div className='product-price'>${this.props.product.price}</div>
                            <div className='product-description'>{this.props.product.description}</div>
                            <label>Quantity</label>
                            <input className="quainput" type="number" min={0} max={10} defaultValue={1} step={1} onClick={(e) => this.handleQuantityClick(e)}/>
                            <label className="label">size</label>
                            <div className='sizebs'>
                                    { renderSize }
                                </div>
                            </div>
                            <label className='label'>Color</label><br/>
                            <div className='moColorButtons'>
                                    { renderColors }
                            </div>
                            <div className="cartbtn"><button className='cartButton' onClick={(e) => this.handleAddToCart(e, this.props.product)}>Add to Cart</button></div>
                        </div>


                    </div>
                </div>
        )

    }
}


const mapStateToProps = state => ({
    attributes: state.attributes,
    
})


const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (carturl, cartId, product, quantity) => dispatch(addToCart(carturl, cartId, product, quantity)),
        fetchCartItems: (cartshoppingurl, cart_id) => dispatch(fetchCartItems(cartshoppingurl, cart_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal)