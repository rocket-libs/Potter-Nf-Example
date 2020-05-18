import { PotterState } from "potter-nf";
import TodoRepository from "./TodoRepository";
import Todo from "./Todo";

export default class TodoState extends PotterState<TodoRepository,Todo>{
    mounted: boolean = false;
    adding: boolean = false;
    todoBeingAdded: Todo | null = null;
    todoBeingEdited: Todo | null = null;
    todoBeingEditedIndex: number | null = null;
}