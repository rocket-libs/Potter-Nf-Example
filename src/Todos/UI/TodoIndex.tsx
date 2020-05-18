import React, { useState, useEffect, CSSProperties } from "react";
import TodoPotter from "../Potter/TodoPotter";
import TodoRepository from "../Potter/TodoRepository";
import TodoModel from "../Potter/TodoModel";
import TodoState from "../Potter/TodoState";
import "../../flex-grid.css";
import "../../ui.css";
import SectionTitle from "./SectionTitle";
import MasterPane from "./MasterPane";
import DetailsPane from "./DetailsPane";


/** A global instance of our Potter object. This is the work-horse that'll carry all our data
 *  and allow us to read and write state variables.
 * We've made it global and as it encapsulates all our data, this minimizes parameter passing.
 */
let potter: TodoPotter;

export default function TodoIndex(){
    const [potterChangeId, setPotterChangeId] = useState(0);
    potter = potter ?? new TodoPotter(new TodoRepository(), new TodoModel(), new TodoState());
    useEffect(() => {
        const initializePotter = () : () => void => {
            const potterCleanup = potter.subscribe(() => setPotterChangeId(potter.context.changeId));
            if(!potter.state.mounted){
                potter.pushToState({mounted: true});
            }
            return function cleanup() {
                potterCleanup();
            }
        }
        return initializePotter();
    },[potterChangeId])
    
    return render();
}

const render = () => {
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
