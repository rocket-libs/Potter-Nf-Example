import TodoStrings from "../Data/TodoStrings";

export default class Todo{
    displayLabel: string;
    status: string = TodoStrings.pending;
    addedDate: Date = new Date();

    constructor(displayLabel: string = ""){
        this.displayLabel = displayLabel;
    }
}