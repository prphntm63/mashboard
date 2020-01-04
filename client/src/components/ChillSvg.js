import React from 'react';

const ChillSvg = (props) => {
    let fill = !props.selected ? "#ffffff" : "#fbb040"
    let stroke = "#000000"

    if (props.mode === "heat") {
        stroke = "#ff0000"
    } else if (props.mode === "cool") {
        stroke = "#0000ff"
    } else if (props.mode === "run") {
        stroke = "#00ff00"
    }
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.97 57.37" fill={fill} stroke={stroke} strokeMiterlimit={10} style={{width: "40%"}}>
            <title>CHILL OUT</title>
            <g id="chillSvgDiagram">
                <rect className="cls-1" x="0.5" y="0.5" width="58.97" height="56.37"/>
            </g>
        </svg>
    )
}

export default ChillSvg