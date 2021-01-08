import React from 'react'

export default function cartleft(props) {
    const leftFrame = {
        width: "25%",
        float: "left",
        textAlign: "center"
    }
    const rightImages = {

    }
    const modalImage = {
        textAlign: "center"
    }
    const modalImage2 = {
        textAlign: "center"
    }
    return (
        <div style={leftFrame}>
            <div style={rightImages}>
                <div style={modalImage}>
                    <img
                        height={300}
                        width={350}
                        title={props.product.name}
                        src={`/energy/${props.product.image}`}
                    />
                </div>
                <div style={modalImage2}>
                    <img
                        height={80}
                        width={80}
                        title={props.product.name}
                        src={`/energy/${props.product.image}`}
                    />
                </div>
            </div>
        </div>
    )
}
