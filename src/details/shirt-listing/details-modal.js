import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import localStorage from 'local-storage'
import { connect } from 'react-redux'
import { addToCart } from '../../action/requestActions'
import './details-modal.css';

class DetailsModal extends Component {
    constructor() {
        super()
        this.state = {
            color: 'W',
            size: 'S'
        }
    }

    handleColorClick = (event) => {
        this.setState({
            color: event.target.id
        })
        this.props.product.color = event.target.id
    }

    handleSizeClick = (event) => {
        this.setState({
            size: event.target.id
        })
        this.props.product.size = event.target.id;
    }

    handleAddToCart = (event, product) => {
        let carturl = 'http://127.0.0.1:8080/shoppingcart/add'
        let cartId = localStorage.get("cartId")
        console.log(cartId)
        this.props.addToCart(carturl, cartId, product)
        this.props.handleClose()
    }

    render() {
        console.log("we have the modal action")
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        console.log(showHideClassName)
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
                                    src={`/products/${this.props.product.image}`}
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
                            <div className='product-title'>{this.props.product.name}</div>
                            <div className='product-price'>${this.props.product.price}</div>
                            <div className='product-description'>{this.props.product.description}</div>
                            <label className="label">size</label>
                            <div className='sizebs'>
                                    <button id='S' className={this.state.size === 'S' ? "sizeButton small" : "nsizeButton small"} onClick={this.handleSizeClick} >S</button>
                                    <button id='M' className={this.state.size === 'M' ? "sizeButton medium" : "nsizeButton medium"} onClick={this.handleSizeClick} >M</button>
                                    <button id='L' className={this.state.size === 'L' ? "sizeButton large" : "nsizeButton large"} onClick={this.handleSizeClick} >L</button>
                                    <button id='XL' className={this.state.size === 'XL' ? "sizeButton xlarge" : "nsizeButton xlarge"} onClick={this.handleSizeClick} >XL</button>
                                    <button id='XXL' className={this.state.size === 'XXL' ? "sizeButton xxlarge" : "nsizeButton xxlarge"} onClick={this.handleSizeClick} >XXL</button>
                                </div>
                            </div>

                            <div className='moColorButtons'>
                                <div>
                                <label className='label'>Color</label><br/>
                                    <button id='white' className={this.state.color === 'white' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>white</button>
                                    <button id='black' className={this.state.color === 'black' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>black</button>
                                    <button id='red' className={this.state.color === 'red' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>red</button>
                                    <button id='orange' className={this.state.color === 'orange' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>orange</button>
                                    <button id='yellow' className={this.state.color === 'yellow' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>yellow</button>
                                    <button id='green' className={this.state.color === 'green' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>green</button>
                                    <button id='blue' className={this.state.color === 'blue' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>blue</button>
                                    <button id='purple' className={this.state.color === 'purple' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>purple</button>
                                    <button id='pink' className={this.state.color === 'pink' ? "colorButton small" : "ncolorButton small"} onClick={this.handleColorClick}>pink</button>
                                </div>
                            </div>
                            <div className="cartbtn"><button className='cartButton' onClick={(e) => this.handleAddToCart(e, this.props.product)}>Add to Cart</button></div>
                        </div>


                    </div>
                </div>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (carturl, cartId, product) => dispatch(addToCart(carturl, cartId, product))
    }
}

export default connect(null, mapDispatchToProps)(DetailsModal)