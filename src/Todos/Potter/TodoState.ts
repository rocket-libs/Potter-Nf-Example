import { PotterState } from "potter-nf";
import TodoRepository from "./TodoRepository";
import TodoModel from "./TodoModel";

export default class TodoState extends PotterState<TodoRepository,TodoModel>{
    mounted: boolean = false;
    adding: boolean = false;
    todoItemBeingAdded: TodoModel | null = null;
    todoItemBeingEdited: TodoModel | null = null;
    indexOfTodoItemBeingEdited: number | null = null;
}