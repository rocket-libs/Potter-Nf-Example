import Todo from "./Todo";

export default class TodoRepository{
    allTodos: Todo[] = [
        new Todo("Build Awesome App"),
        new Todo("Get Lots Of Users"),
        new Todo("Profit 😊")
    ];
}