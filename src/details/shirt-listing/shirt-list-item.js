import React, { Component } from 'react'
import './shirt-list-item.css';

class ShirtListItem extends Component{

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
                    />
                    <button className="priceButtons">{this.props.product.price}</button>
                </div>
            </div>
        )
    }
}

export default ShirtListItem