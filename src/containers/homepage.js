import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShirtList from '../details/shirt-listing'
import { fetchCatalogueProducts, fetchDepartments, fetchCategories } from '../action/requestActions'
class Home extends Component {
    constructor(props){
        super(props)
    }
    
    componentWillMount() {
        let catalogueurl="http://127.0.0.1:8080/products"
        let departmentsurl="http://127.0.0.1:8080/departments"
        let categoriesurl="http://127.0.0.1:8080/categories"
        this.props.fetchCatalogueProducts(catalogueurl)
        this.props.fetchDepartments(departmentsurl)
        this.props.fetchCategories(categoriesurl)
    }

render(){
    return (
     <div>
        <h>Loading The HomePage</h>
        <ShirtList />
    </div>
    );
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCatalogueProducts: (catalogueurl) => dispatch(fetchCatalogueProducts(catalogueurl)),
        fetchDepartments: (departmentsurl) => dispatch(fetchDepartments(departmentsurl)),
        fetchCategories: (categoriesurl) => dispatch(fetchCategories(categoriesurl))
    }
}

export default connect(null, mapDispatchToProps)(Home)