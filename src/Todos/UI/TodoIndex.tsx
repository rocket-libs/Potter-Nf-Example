import React, { useState, useEffect, CSSProperties } from "react";
import TodoPotter from "../Potter/TodoPotter";
import TodoRepository from "../Potter/TodoRepository";
import Todo from "../Potter/Todo";
import TodoState from "../Potter/TodoState";
import "../../flex-grid.css";
import "../../ui.css";
import SectionTitle from "./SectionTitle";
import MasterPane from "./MasterPane";
import DetailsPane from "./DetailsPane";


interface IProps{
    
}

let potter: TodoPotter;

export default function TodoIndex(props: IProps){
    const [potterChangeId, setPotterChangeId] = useState(0);
    potter = potter ?? new TodoPotter(new TodoRepository(), new Todo(), new TodoState());
    useEffect(() => {
        const initializeShuttlerFx = () : () => void => {
            const potterCleanup = potter.subscribe(() => setPotterChangeId(potter.context.changeId));
            if(!potter.state.mounted){
                potter.pushToState({mounted: true});
            }
            return function cleanup() {
                potterCleanup();
            }
        }
        return initializeShuttlerFx();
    },[potterChangeId])
    
    return render(props);
}

const render = (props: IProps) => {
    const containerStyle = {
        width:"100%", 
        border:"solid 1px #DDD", 
        background:"#e6eefa"
    } as CSSProperties;

    const titleStyle={
        fontSize:"27px"
    };

    return <div style={containerStyle}>
                <div style={titleStyle}>Potter NF Todo Example</div>
                <div className="flex-grid">
                    <div className="flex-col-2">
                        <SectionTitle>Master Pane</SectionTitle>
                        <MasterPane
                            potter={potter} />
                    </div>
                    <div className="flex-col-8">
                        <SectionTitle>Details Pane</SectionTitle>
                        <DetailsPane
                            potter={potter} />
                    </div>
                </div>
            </div>
}
