import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShirtList from '../details/shirt-listing'
import { fetchCatalogueProducts } from '../action/requestActions'
class Home extends Component {
    constructor(props){
        super(props)
    }
    
    componentWillMount() {
        let catalogueurl="http://127.0.0.1:8080/products"
        this.props.fetchCatalogueProducts(catalogueurl)
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
        fetchCatalogueProducts: (catalogueurl) => dispatch(fetchCatalogueProducts(catalogueurl))
    }
}

export default connect(null, mapDispatchToProps)(Home)