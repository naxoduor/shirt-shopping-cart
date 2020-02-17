import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProductsByCategory } from '../../action/requestActions'
import './categorieslist.css'

class CategoriesList extends Component {
    constructor(props) {
        super(props)
        let state={
            categoryId=""
        }
    }

    getCategoryProducts = (event, id) => {
        event.preventDefault();

        this.setState({categoryId:id})
        let productsurl="http://127.0.0.1:8080/products/inCategory/?id="+id;
        this.props.fetchProductsByCategory(productsurl)
    }
    render() {
        const renderCategories = this.props.categories.items && this.props.categories.items.map(category=>(
            <button className="catButton"><li className="categoryListItem"><Link to={'/'} onClick={(e) => this.getCategoryProducts(e, category.category_id)}>{category.name}</Link></li></button>
        ))
        return(
            <div>
                <ul className="categoryList" style={{ listStyle: 'none' }}>
                { renderCategories }
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductsByCategory: (productsurl) => dispatch(fetchProductsByCategory(productsurl))
    }
}

const mapStateToProps = state => ({
    categories: state.categories
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)
