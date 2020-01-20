import React, { Component } from 'react'
import DetailsModal from './details-modal'
import './shirt-list-item.css';
import { fetchAttributes } from '../../action/requestActions'
import { connect } from 'react-redux'

class ShirtListItem extends Component {

    state = { show: false }
    showModal = (e, product_id) => {
        this.props.fetchAttributes(product_id)
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false })
    }
    render() {
        let product_id=this.props.product.product_id
        return (
            <div className='product-list-item'>
                <div className="image_wrapper" onClick={(e) => this.showModal(e, product_id)}>
                    <div className="list_wrapper">
                        <img
                            title={this.props.product.name}
                            src={`/energy/${this.props.product.image}`}
                        />
                        <div className="title2">{this.props.product.name}</div>
                        <div className="priceButtons">${this.props.product.price}</div>
                    </div>
                    <div className="item_details">
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


const mapDispatchToProps = (dispatch) => {
    return {
        fetchAttributes: (product_id) => dispatch(fetchAttributes(product_id)),
    }
}

export default connect(null, mapDispatchToProps)(ShirtListItem)