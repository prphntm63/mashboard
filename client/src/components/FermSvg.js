import React from 'react';

const FermSvg = (props) => {
    let fill = !props.selected ? "#ffffff" : "#fbb040"
    let stroke = "#000000"
    let impeller = "/img/impeller-black"
    let warningText =""

    if (props.mode === "heat") {
        stroke = "#ff0000"
        impeller = "/img/impeller-red"
    } else if (props.mode === "cool") {
        stroke = "#0000ff"
        impeller = "/img/impeller-blue"
    } else if (props.mode === "run") {
        stroke = "#00ff00"
        impeller = "/img/impeller-blue"
    }

    if (props.stir) {
        impeller += ".gif"
    } else {
        impeller += ".png"
    }

    if (!props.connected) {
        warningText = "NO CONNECTION"
        stroke = "#333333"
        fill = "#dddddd"
    }
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.23 83.48"  strokeMiterlimit={10} style={{height: "60%", maxHeight: "250px"}}>
            <title>FERM OUT</title>
            <g id="fermSvgDiagram">
                <polygon fill={fill} stroke={stroke} className="cls-1" points="0.5 0.5 0.5 28.69 0.5 39.27 0.5 82.98 2.46 82.98 2.46 40.94 30.14 64.41 30.14 82.98 32.1 82.98 32.1 64.41 59.77 40.94 59.77 82.98 61.73 82.98 61.73 39.27 61.73 28.69 61.73 0.5 0.5 0.5"/>
                <text x="10%" y="20" style={{fontSize : "40%", fill : "black"}}>{warningText}</text>
                {props.connected ? (<image href={impeller} x="25%" y="2%" height="110%" width="50%"/>) 
                : (<image href="/img/no-connection.png" x="35%" y="2%" height="70%" width="30%"/>)}
            </g>
        </svg>
    )
}

export default FermSvg