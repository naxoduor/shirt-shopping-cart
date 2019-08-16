import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShirtListItem from './shirt-list-item'
import DepartmentList from '../departments/departmentlist'
import Cart from '../cart'
import localStorage from 'local-storage'
import {
    fetchCartItems, fetchCategoryPaginationProducts,
    fetchDepartmentPaginationProducts, fetchCartTotalAmount, 
    searchProducts
} from '../../action/requestActions'
import './index.css'
class ShirtList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showCart: false,
            id: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    
    displayCart = () => {
        let carturl = "http://127.0.0.1:8080/shoppingcart/?cart_id=" + localStorage.get("cartId");
        let cartamounturl = "http://127.0.0.1:8080/shoppingcart/totalamount/?cart_id=" + localStorage.get("cartId");
        this.props.fetchCartItems(carturl)
        this.props.fetchCartTotalAmount(cartamounturl)
        console.log("set state to true")
        this.setState({ showCart: true })
    }

    hideCart = () => {
        this.setState({ showCart: false })

    }

    handleClick = (event) => {
        event.preventDefault()
        let currentPage = parseInt(event.target.id) - 1
        console.log("the current page is")
        console.log(currentPage)
        let productsPerPage = 8
        let productDescriptionLength = 30
        let startItem = currentPage * productsPerPage
        let params = {}
        params.productDescriptionLength = productDescriptionLength
        params.productsPerPage = productsPerPage
        params.startItem = startItem

        if (this.props.selectedId.items.department_id) {
            let id = this.props.selectedId.items.department_id
            params.department_id = id
            console.log(params)
            var productsurl = "http://127.0.0.1:8080/products/inDepartment/pagination/*" + id;
            this.props.fetchDepartmentPaginationProducts(productsurl, params)
        }

        if (this.props.selectedId.items.category_id) {
            let id = this.props.selectedId.items.category_id
            params.category_id = id
            let productsurl = "http://127.0.0.1:8080/products/inCategory/pagination/*" + id
            this.props.fetchCategoryPaginationProducts(productsurl, params)
        }
    }

    render() {
        let pageCount = "";
        this.props.totalItems.items.map(page => {
            if (page.products_on_department_count) {
                pageCount = page.products_on_department_count
            }
            if (page.categories_count) {
                pageCount = page.categories_count
            }
        })

        let productsPerPage = 8
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(pageCount / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}>
                    {number}
                </li>
            );
        });


        let currentShirtProducts = this.props.products.items
        const renderShirtProducts = currentShirtProducts.map(product => {
            return (
                <ShirtListItem product={product} />
            )
        })

        return (
            <div className="contents">
                <div>
                    <ul id="page-numbers">
                        {renderPageNumbers}
                    </ul>
                </div>
                <div>
                    <div className="menu">
                        <DepartmentList />
                        <div><button className="viewcart"onClick={this.displayCart}>View Cart</button></div>
                    </div>
                    <div className="product-listing">
                        {renderShirtProducts}
                        <Cart show={this.state.showCart} handleClose={this.hideCart} />
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    products: state.products,
    totalItems: state.totalItems,
    selectedId: state.selectedId
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCartItems: (carturl) => dispatch(fetchCartItems(carturl)),
        fetchCartTotalAmount: (cartamounturl) => dispatch(fetchCartTotalAmount(cartamounturl)),
        fetchCategoryPaginationProducts: (productsurl, params) => dispatch(fetchCategoryPaginationProducts(productsurl, params)),
        fetchDepartmentPaginationProducts: (productsurl, params) => dispatch(fetchDepartmentPaginationProducts(productsurl, params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShirtList)