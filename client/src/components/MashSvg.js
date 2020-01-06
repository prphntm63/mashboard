import React from 'react';

const MashSvg = (props) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.7 73.44"  strokeMiterlimit={10} style={{ height: "60%", maxHeight : "200px", marginTop: "50px"}}>
            <title>MASH OUT</title>
            <g id="mashSvgDiagram">
                <polygon fill={fill} stroke={stroke} className="cls-1" points="0.5 0.5 0.5 55.98 0.5 72.94 5.72 72.94 5.72 55.98 66.98 55.98 66.98 72.94 72.2 72.94 72.2 55.98 72.2 0.5 0.5 0.5"/>
                <text x="10%" y="20" width="90%" style={{fontSize : "45%", fill : "black"}}>{warningText}</text>
                {props.connected ? (<image href={impeller} x="25%" y="2%" height="130%" width="50%"/>) 
                : (<image href="/img/no-connection.png" x="35%" y="2%" height="100%" width="30%"/>)}
            </g>
        </svg>
    )
}

export default MashSvg

// was width:50%