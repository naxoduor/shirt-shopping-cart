import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShirtListItem from './shirt-list-item'
import DepartmentList from '../departments/departmentlist'
import CategoriesList from '../categories/categorieslist'
import './index.css'
class ShirtList extends Component {

    constructor(props) {
        super(props)
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
                        <CategoriesList />
                    </div>
                    <div className="product-listing">
                        {renderShirtProducts}
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, null)(ShirtList)