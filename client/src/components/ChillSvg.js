import React from 'react';

const ChillSvg = (props) => {
    let fill = !props.selected ? "#ffffff" : "#fbb040"
    let stroke = "#000000"
    let warningText =""

    if (props.mode === "heat") {
        stroke = "#ff0000"
    } else if (props.mode === "cool") {
        stroke = "#0000ff"
    } else if (props.mode === "run") {
        stroke = "#0000ff"
    }

    if (!props.connected) {
        warningText = "NO CONNECTION"
        stroke = "#333333"
        fill = "#dddddd"
    }
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.97 57.37" strokeMiterlimit={10} style={{ height: "60%", maxHeight : "150px", marginTop : "100px"}}>
            <title>CHILL OUT</title>
            <g id="chillSvgDiagram">
                <rect fill={fill} stroke={stroke} className="cls-1" x="0.5" y="0.5" width="58.97" height="56.37"/>
                <text x="5%" y="20" width="90%" style={{fontSize : "43%", fill : "black"}}>{warningText}</text>
                {props.connected ? (<></>) 
                : (<image href="/img/no-connection.png" x="35%" y="2%" height="100%" width="30%"/>)}
            </g>
        </svg>
    )
}

export default ChillSvg

//was width:40%