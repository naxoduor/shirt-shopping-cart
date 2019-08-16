import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {
    fetchProductsByDepartment, fetchCategoriesByDepartment,
    fetchProductsByCategory, fetchTotalDepartmentItems, fetchTotalCategoryItems,
    searchProducts
} from '../../action/requestActions'
import './departmentlist.css'
import './categorieslist.css'

import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

class DepartmentList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryId: "",
            departmentId: "",
            searchString: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    } 

    getSearchProducts = (event) => {
        event.preventDefault()
        this.setState({categoryId: ""})
        this.setState({departmentId: ""})
        let params = {}
        params.inSearchString = this.state.searchString
        params.inAllWords = "ON"
        params.inShortProductDescriptionLength = 45
        params.inProductsPerPage = 8
        params.inStartItem = 0
        let searchurl = "http://127.0.0.1:8080/products/search"
        this.props.searchProducts(searchurl, params)
    }



    getDepartmentCategoriesAndProducts = (event, id) => {
        event.preventDefault();
        console.log("get department products")
        console.log(id)
        this.setState({ departmentId: id })
        this.getDepartmentCategories(id);
        this.getDepartmentProducts(id);
        this.getDepartmentTotalItems(id)

    }

    getDepartmentCategories(id) {
        let categoriesurl = "http://127.0.0.1:8080/categories/inDepartment/?id=" + id;
        this.props.fetchCategoriesByDepartment(categoriesurl, id)
    }

    getDepartmentProducts(id) {
        let productsurl = "http://127.0.0.1:8080/products/inDepartment/?id=" + id;
        console.log(productsurl)
        console.log(id)
        this.props.fetchProductsByDepartment(productsurl, id)
    }

    getDepartmentTotalItems(id) {
        let totalitemsurl = "http://127.0.0.1:8080/departments/totalitems/?id=" + id;
        this.props.fetchTotalDepartmentItems(totalitemsurl, id)
    }

    getCategoryProducts = (event, id) => {

        event.preventDefault()
        console.log("get category products")
        console.log(id)
        this.setState({ categoryId: id })
        let productsurl = "http://127.0.0.1:8080/products/inCategory/?id=" + id;
        let totalitemsurl = "http://127.0.0.1:8080/categories/totalitems/?id=" + id;
        this.props.fetchProductsByCategory(productsurl, id)
        this.props.fetchTotalCategoryItems(totalitemsurl, id)
    }


    render() {

        const departments = this.props.departments.items.map(department => (
            <button style={department.department_id === this.state.departmentId ? {
                textDecoration: 'none', width: '80%',
                 height: 'auto', marginLeft: '10px', borderRadius: '5px',
                fontSize: '15px', textAlign: 'center', marginTop: '3px', backgroundColor: 'rgb(180, 15, 56)', color: 'rgb(14, 7, 7)'
            } : {
                textDecoration: 'none', width: '80%', height: 'auto', marginLeft: '10px', borderRadius: '5px',
                    fontSize: '15px', textAlign: 'center', color: '808080', marginTop: '3px', backgroundColor: 'rgb(240, 240, 240)', color: 'rgb(85, 83, 83)'
                }} onClick={(e) => this.getDepartmentCategoriesAndProducts(e, department.department_id)}>{department.name}</button>
        ))

        let renderCategories = ""

        if (this.props.categories) {
            renderCategories = this.props.categories.items.map(category => (
                <button style={category.category_id === this.state.categoryId ? {
                    textDecoration: 'none', width: '80%', height: 'auto', marginLeft: '10px', borderRadius: '5px',
                    fontSize: '15px', textAlign: 'center', marginTop: '3px', backgroundColor: 'rgb(180, 15, 56)', color: 'rgb(14, 7, 7)'
                } : {
                    textDecoration: 'none', width: '80%', height: 'auto', marginLeft: '10px', borderRadius: '5px',
                        fontSize: '15px', textAlign: 'center', color: '808080', marginTop: '3px', backgroundColor: 'rgb(240, 240, 240)', color: 'rgb(85, 83, 83)'
                    }} onClick={(e) => this.getCategoryProducts(e, category.category_id)}> {category.name}</button>
            ))
        }
        return (
            <div>
                <Form onSubmit={this.getSearchProducts}>
                    <FormGroup controlId="formGridsearchShirt">
                        <FormControl type="text" name="searchString" placeholder="Search Shirt" value={this.state.searchString} onChange={this.handleChange} />
                    </FormGroup>
                </Form>
                <label>Departments</label>
                {departments}
                <label>Categories</label>
                {renderCategories}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    departments: state.departments,
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductsByDepartment: (productsurl, id) => dispatch(fetchProductsByDepartment(productsurl, id)),
        fetchCategoriesByDepartment: (categoriesurl, id) => dispatch(fetchCategoriesByDepartment(categoriesurl, id)),
        fetchProductsByCategory: (productsurl, id) => dispatch(fetchProductsByCategory(productsurl, id)),
        fetchTotalDepartmentItems: (totalitemsurl, id) => dispatch(fetchTotalDepartmentItems(totalitemsurl, id)),
        fetchTotalCategoryItems: (totalitemsurl, id) => dispatch(fetchTotalCategoryItems(totalitemsurl, id)),
        searchProducts: (searchurl, params) => dispatch(searchProducts(searchurl, params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentList)