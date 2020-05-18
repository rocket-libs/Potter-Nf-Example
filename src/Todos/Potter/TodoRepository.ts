import TodoModel from "./TodoModel";

export default class TodoRepository{
    allTodos: TodoModel[] = [
        new TodoModel("Build Awesome App"),
        new TodoModel("Get Lots Of Users"),
        new TodoModel("Profit 😊")
    ];
}