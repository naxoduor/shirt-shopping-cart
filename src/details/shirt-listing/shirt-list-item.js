import React, { Component } from 'react'
import DetailsModal from './details-modal'
import './shirt-list-item.css';

class ShirtListItem extends Component{

    state = { show: false }

    showModal = () => {
        console.log("show the modal")
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false })
    }
    render(){
        return (
            <div className='product-list-item'>
                <div>
                    <h10 className="title">{this.props.product.name}</h10>
                    <img
                    width='40%'
                    height={70}
                    title={this.props.product.name}
                    src={`/products/${this.props.product.image}`}
                    onClick={ this.showModal } 
                    />
                    <button className="priceButtons">{this.props.product.price}</button>
                    <DetailsModal show={ this.state.show } handleClose={ this.hideModal } product={ this.props.product}/>
                </div>
            </div>
        )
    }
}

export default ShirtListItem