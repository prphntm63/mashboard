import React from 'react';

const StillSvg = (props) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.06 71.52" fill={fill} stroke={stroke} strokeMiterlimit={10} style={{width: "35%"}}>
            <title>STILL OUT</title>
            <g id="stillSvgDiagram">
                <path className="cls-1" d="M28.6,19.56V.5H9.46V19.56l-9,5.16V71H37.56V24.72ZM19,33.34a6.66,6.66,0,1,1,6.66-6.66A6.66,6.66,0,0,1,19,33.34Z"/>
            </g>
        </svg>
    )
}

export default StillSvg