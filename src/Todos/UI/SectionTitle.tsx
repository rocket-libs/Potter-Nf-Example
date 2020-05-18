import React, { CSSProperties } from "react";

interface IProps{
    children?: any
}

export default function SectionTitle(props: IProps){
    const style={
        fontSize:"21px",
        borderTop:"solid 3px #FFF",
        borderBottom:"solid 3px #FFF",
        borderRight:"solid 1px #FFF",
        paddingLeft: "10px",
        marginTop:"20px"
    } as CSSProperties;
    return <div style={style}>{props.children}</div>
}