import React from "react";
import TodoPotter from "../Potter/TodoPotter";
import TodoStrings from "../Data/TodoStrings";

interface IProps{
    potter: TodoPotter;
}

let potter: TodoPotter;

export default function DetailsPane(props: IProps){
    potter = props.potter;
    return  <div style={{backgroundColor:"#FFF"}}>{body()}</div>
}

const body = () => {
    if(potter.state.todoItemBeingEdited){
        return todoBeingEditedUI();
    }else{
        return <div className="card">When you click on a todo on the left pane, you'll be able to edit it here</div>
    }
}

const todoBeingEditedUI = () => {
    return  <div>
                <div>
                    <input 
                        type="text"
                        autoFocus={true} 
                        className="inputFieldsStyle" 
                        placeholder="Enter Todo's Display Label"
                        onChange={(e) => {
                            const todoBeingEdited = potter.state.todoItemBeingEdited;
                            if(todoBeingEdited){
                                todoBeingEdited.displayLabel = e.target.value;
                                potter.pushToState({todoItemBeingEdited: todoBeingEdited});
                            }
                        }}
                        value={potter.state.todoItemBeingEdited?.displayLabel} />
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        value={potter.state.todoItemBeingEdited?.status === TodoStrings.done ? 1 : 0}
                        onChange={(_) => {
                            const todoBeingEdited = potter.state.todoItemBeingEdited;
                            if(todoBeingEdited){
                                todoBeingEdited.status = todoBeingEdited.status === TodoStrings.done ? TodoStrings.pending : TodoStrings.done;
                                potter.pushToState({todoItemBeingEdited: todoBeingEdited});
                            }
                        }} /> 
                        Done
                </div>
            </div>
}