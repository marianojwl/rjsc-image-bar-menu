import React from "react";

const ImgDefault = ({title,data}) => {
    const splitLine = (line, n) => {
        var lines = [];
        line.split(" ").forEach((word, index) => {
            if(lines[lines.length-1] === undefined)
                lines.push("");
            if(word.length<=(n - lines[lines.length-1].length)) {
                lines[lines.length-1] += word + " ";
            } else {
                lines.push(word + " ");
            }
        });
        return lines;
    }
    const lineHeigth = 20;
    const padding = 5;
    return (
        <svg data={data} height="125" width="100">
            <text data={data} x={padding} y={lineHeigth}>
                {splitLine(title, 8).map((v,i)=>{ return <tspan  data={data} key={i} x={padding} y={lineHeigth*(i+1)}>{v}</tspan>; })}
            </text>
            Sorry, your browser does not support inline SVG.
        </svg>
    );
};

export default ImgDefault;