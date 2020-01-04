import React from 'react';

const FermSvg = (props) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.23 83.48" fill={fill} stroke={stroke} strokeMiterlimit={10} style={{width: "50%"}}>
            <title>FERM OUT</title>
            <g id="fermSvgDiagram">
                <polygon className="cls-1" points="0.5 0.5 0.5 28.69 0.5 39.27 0.5 82.98 2.46 82.98 2.46 40.94 30.14 64.41 30.14 82.98 32.1 82.98 32.1 64.41 59.77 40.94 59.77 82.98 61.73 82.98 61.73 39.27 61.73 28.69 61.73 0.5 0.5 0.5"/>
            </g>
        </svg>
    )
}

export default FermSvg