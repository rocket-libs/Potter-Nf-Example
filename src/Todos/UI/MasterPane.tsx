import React, { CSSProperties } from "react";
import TodoPotter from "../Potter/TodoPotter";
import Todo from "../Potter/Todo";

interface IProps{
    potter: TodoPotter;
}

let potter: TodoPotter;

export default function MasterPane(props: IProps){
    potter = props.potter;
    const listStyle={
        margin:"0px",
        borderTop:"3px",
        border:"solid 1px #DFDFDF",
        backgroundColor:"#FFF"
    }
    return  <div>
                {dataEntryFields()}
                <div style={listStyle}>
                    {todoList()}
                </div>
            </div>
}


const dataEntryFields = () => {
    if(potter.state.adding){
        return inputFields();
    }else{
        return addTodoButton();
    }
}

const addTodoButton = () => {
    const addButtonStyle={
        width:"100%"
    };
    return <input 
                type="button" 
                value="Add Todo" style={addButtonStyle}
                onClick={() => {
                     potter.pushToState({adding: true, todoBeingAdded: new Todo()})} 
                }/>
}

const todoList = () => {
    if(potter.context.repository.allTodos.length === 0){
        return <div className="card">No Todos yet. Please click the 'Add Todo' button above, to add your first one</div>
    }else{
        const displayLabelStyle={
            fontSize: "24px"
        } as CSSProperties;
        const secondaryTextStyle={
            color: "#AAA"
        } as CSSProperties;
        
        const getCardStyle = (index: number) : CSSProperties | undefined => {
            if(potter.state.todoBeingEditedIndex !== index){
                return undefined;
            }else{
                return {
                    backgroundColor:"#4287f5",
                    color: "#FFF"
                } as CSSProperties;
            }
        }


        return  <div>
                    {potter.context.repository.allTodos.map((currentTodo,index) => {
                        return  <div style={getCardStyle(index)} key={index} className="card" onClick={() => {
                            potter.pushToState({todoBeingEditedIndex: index, todoBeingEdited: currentTodo});
                        }}>
                                    <div style={displayLabelStyle}>
                                        {currentTodo.displayLabel}
                                    </div>
                                    <div style={secondaryTextStyle}>
                                         Added: {currentTodo.addedDate.toLocaleTimeString()}
                                    </div>
                                    <div style={secondaryTextStyle}>
                                         Status: {currentTodo.status}
                                    </div>
                                </div>
                    })}
                </div>
    }
    
}

const inputFields = () => {
    

    return  <div className="flex-grid" style={{marginTop: "10px"}}>
                <div className="flex-col-8">
                    <input 
                        type="text" 
                        placeholder="Enter Todo's Title"
                        autoFocus={true}
                        onChange={(e) => {
                            const activeTodo = potter.state.todoBeingAdded;
                            if(activeTodo){
                                activeTodo.displayLabel = e.target.value;
                                potter.pushToState({todoBeingAdded: activeTodo});
                            }
                        }}
                        className="inputFieldsStyle" />
                </div>
                <div className="flex-col-2">
                    <input 
                        type="button" 
                        className="inputFieldsStyle" value="Cancel"
                        onClick={() => potter.pushToState({adding: false, todoBeingAdded: null})} />
                </div>
                <div className="flex-col-2">
                <input 
                    type="button" 
                    className="inputFieldsStyle" value="Add"
                    disabled={(!potter.state.todoBeingAdded || !potter.state.todoBeingAdded.displayLabel) ? true : false}
                    onClick={() => {
                        const activeTodo = potter.state.todoBeingAdded;
                        if(activeTodo){
                            if(!activeTodo.displayLabel){
                                alert("Type in a display label for your todo");
                                return;
                            }else{
                                activeTodo.addedDate = new Date();
                                const allTodos = potter.context.repository.allTodos;
                                allTodos.push(activeTodo);
                                potter.pushToRepository({allTodos: allTodos});
                                potter.pushToState({adding: false, todoBeingAdded: null})}
                            }
                        }
                     }/>
                </div>
            </div>
}