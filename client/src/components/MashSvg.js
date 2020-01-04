import React from 'react';

const MashSvg = (props) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.7 73.44" fill={fill} stroke={stroke} strokeMiterlimit={10} style={{width: "50%"}}>
            <title>MASH OUT</title>
            <g id="mashSvgDiagram">
                <polygon className="cls-1" points="0.5 0.5 0.5 55.98 0.5 72.94 5.72 72.94 5.72 55.98 66.98 55.98 66.98 72.94 72.2 72.94 72.2 55.98 72.2 0.5 0.5 0.5"/>
            </g>
        </svg>
    )
}

export default MashSvg