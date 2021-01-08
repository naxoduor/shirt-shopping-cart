import React from 'react'

export default function cartright(props) {
    const rightFrame = {
        padding: "10px",
        marginLeft: "5px",
        float: "left",
        width: "73%"
    }
    const modalProductDetails = {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        width: "100%"
    }
    const close = {
        marginRight: "160px",
        backgroundColor: "white",
        color: "red",
        fontSize: "100px",
        fontWeight: "600"
    }
    const productTitle = {
        fontSize: "28px",
        fontFamily: "sans-serif",
        marginTop: "5px"
    }
    const productPrice = {
        marginBottom: "3px",
        fontSize: "28px",
        fontFamily: "sans-serif"
    }
    const productDescription = {
        marginBottom: "3px",
        fontSize: "16px",
        fontFamily: "sans-serif"
    }
    const quaInput = {
        width: "30%",
        border: "1px solid grey",
        borderRadius: "3px"
    }
    const cartBtn = {
        marginTop: "15px"
    }
    const cartButton = {
        marginTop: "5px",
        padding: "5px",
        fontSize: "14px",
        backgroundColor: "brown",
        color:"white",
        textAlign: "center",
        borderRadius: "20px",
        display: "inline-block",
        width: "150px",
        height: "50px"
    }
    return (
        <div style={rightFrame}>
            <div style={modalProductDetails}>
                <span style={close} onClick={props.handleClose}>&times;</span>
                <div style={productTitle}>{props.product.name}</div>
                <div style={productPrice}>KSHS {props.product.price}</div>
                <div style={productDescription}>{props.product.description}</div>
                <label>Quantity</label>
                <input style={quaInput} type="number" min={0} max={10} defaultValue={1} step={1} onClick={(e) => this.handleQuantityClick(e)} />
            </div>
            <div style={cartBtn}><button style={cartButton} onClick={(e) => this.handleAddToCart(e, this.props.product)}>Add to Cart</button></div>
        </div>
    )
}
