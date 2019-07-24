import React, { Component } from 'react'

class ShirtListItem extends Component{

    render(){
        return (
            <div className='product-list-item'>
                <h10>Shirt item</h10>
                <div>
                    <h10 className="title">{this.props.product.name}</h10>
                    <h10>{this.props.product.image}</h10>
                    <img
                    height={70}
                    title={this.props.product.name}
                    src={`products/${this.props.product.image}`} 
                    />
                    <button>{this.props.product.price}</button>
                </div>
            </div>
        )
    }
}

export default ShirtListItem