class ToDo{
    constructor(title, description/*, dueDate*/, priority/*, projectCreationDatetime*/){
        this.maxPriority = 10;  // dummy number see setter
        this.minPriority = 1;   // dummy number see setter

        this.complete = false;
        this.title = title;
        this.description = description;
        //this._dueDate = dueDate;
        this.priority = priority;
        
        //this._projectCreationDatetime = projectCreationDatetime;
        //this._creationDatetime = ???;

    }

    toggleCompleteStatus(){
        this.complete = !this.complete;
    }

    set maxPriority(newMax){
        this._maxPriority = 10;
    }

    set minPriority(newMin){
        this._minPriority = 1;
    }

    get title(){
        return this._title;
    }

    set title(newTitle){
        if (typeof newTitle !== "string") throw new Error("ToDo title must be a string");
        if (newTitle === "") throw new Error("ToDo Title must not be empty")
        this._title = newTitle;
    }

    get description(){
        return this._description;
    }

    set description(newDesc){
        if (typeof newDesc !== "string") throw new Error("ToDo description must be a string");
        this._description = newDesc;
    }

    get priority(){
        return this._priority;
    }

    set priority(newPriority){
        if (newPriority === ""){
            this._priority = this._maxPriority;
            return;
        }
        if (typeof newPriority !== "number") throw new Error(`ToDo priority must be an integer between ${this._minPriority} and ${this._maxPriority}`);
        if (!Number.isInteger(newPriority)) throw new Error(`ToDo priority must be an integer between ${this._minPriority} and ${this._maxPriority}`);
        if (newPriority > this._maxPriority || newPriority < this._minPriority) throw new Error(`ToDo priority must be an integer between ${this._minPriority} and ${this._maxPriority}`);
        this._priority = newPriority;
    }
}

const desc1 = "Create ToDo Class description";
const todo1 = new ToDo("Create ToDo Class", desc1, 5);
const todo2 = new ToDo("Create ToDo Class", "", 5);
window.testTodo = todo1;
console.log(todo1);
console.log(todo2);
const todo3 = new ToDo("Create ToDo Class", "", 1);
console.log(todo3);
const todo4 = new ToDo("Hi", "", "");
console.log(todo4);

window.a = todo4;