import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShirtListItem from './shirt-list-item'
class ShirtList extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        let currentShirtProducts = this.props.products.items
        const renderShirtProducts = currentShirtProducts.map(product => {
            return (
                <ShirtListItem product={product}/>
            )
        })

        return(
            <div>
            <h>Render Products</h>
            { renderShirtProducts }
            </div>
        );

    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, null)(ShirtList)