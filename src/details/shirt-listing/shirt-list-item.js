import React, { Component } from 'react'
import DetailsModal from './details-modal'
import './shirt-list-item.css';

class ShirtListItem extends Component {

    state = { show: false }

    showModal = () => {
        console.log("show the modal")
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false })
    }
    render() {
        return (
            <div className='product-list-item'>
                <div className="image_wrapper">
                    <div className="list_wrapper">
                        <img
                            title={this.props.product.name}
                            src={`/products/${this.props.product.image}`}
                            onClick={this.showModal}
                        />
                        <div className="title2">{this.props.product.name}</div>
                        <div className="priceButtons">${this.props.product.price}</div>
                    </div>
                    <div className="item_details" onClick={this.showModal}>
                        <h10 className="title">{this.props.product.name}</h10>
                        <label className="priceButtons">${this.props.product.price}</label>
                    <button className="addButton">Add To Cart</button>
                    </div>
                </div>
                <DetailsModal show={this.state.show} handleClose={this.hideModal} product={this.props.product} />
            </div>
        )
    }
}

export default ShirtListItem