import { format } from 'date-fns'
class ToDo{
    constructor(id, projectId, title, description, priority, dueDate){
        this.maxPriority = 10;  // dummy number see setter
        this.minPriority = 1;   // dummy number see setter

        this.id = id;
        this.projectId = projectId;

        this.isComplete = false;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;

        this.creationDatetime = new Date();

    }

    _isValidDate(date) {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    }

    set dueDate(dateTime){
        if (!this._isValidDate(dateTime)) throw new Error("Please Enter a valid date");
        this._dueDate = dateTime;
        
    }

    get dueDate (){
        if (dateTime === ""){
            this._dueDate = "";
            return;
        }
        if (!this._isValidDate(dateTime)) throw new Error("Please Enter a valid date");
        this._dueDate = dateTime;
    }


    set creationDatetime(dateTime){
        if (this._creationDatetime === undefined) this._creationDatetime = dateTime;
        
    }

    get creationDatetime (){
        return format(this._creationDatetime, 'P');
    }

    set id(id){
        if (this._id === undefined) this._id = id;
        
    }

    get id (){
        return this._id;
    }

    set projectId(projectId){
        if (projectId === ""){
            // projectId = 0 reserved for "Other"
            this._projectId = 0;
            return;
        }
        if (typeof projectId !== "number") throw new Error("Project ID must be a positive Integer");
        if (!Number.isInteger(projectId)) throw new Error("Project ID must be a positive Integer");
        if (projectId <= 0) throw new Error("Project ID must be a positive Integer");
        if (this._projectId === undefined) this._projectId = projectId;
        
    }

    get projectId (){
        return this._projectId;
    }

    toggleCompleteStatus(){
        this.isComplete = !this.isComplete;
    }

    set isComplete(newComplete){
        if (typeof newComplete !== "boolean") throw new Error("ToDo isComplete must be a boolean");
        this._isComplete = newComplete;
    }

    get isComplete(){
        return this._isComplete;
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

// To add to Project Class
// automatically assigns id to ToDo
// changes dueDate to larger value if toDO DueDate is larger
class Project{
    constructor(id, title, description, priority, dueDate){
        this.maxPriority = 10;  // dummy number see setter
        this.minPriority = 1;   // dummy number see setter

        this.id = id;

        this.title = title;
        this.isComplete = false;        
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.list = [];

        this.creationDatetime = new Date();

        this._toDoIDCounter = 1;
    }

    set maxPriority(newMax){
        this._maxPriority = 10;
    }

    set minPriority(newMin){
        this._minPriority = 1;
    }

    _isValidDate(date) {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    }

    set dueDate(dateTime){
        if (dateTime === ""){
            this._dueDate = "";
            return;
        }
        if (!this._isValidDate(dateTime)) throw new Error("Please Enter a valid date");
        this._dueDate = dateTime;
    }

    get dueDate (){
        if (this._dueDate === "") return "";
        return format(this._dueDate, 'P');
    }


    set creationDatetime(dateTime){
        if (this._creationDatetime === undefined) this._creationDatetime = dateTime;
        
    }

    get creationDatetime (){
        return format(this._creationDatetime, 'P');
    }

    set id(id){
        if (this._id === undefined) this._id = id;
        
    }

    get id (){
        return this._id;
    }

    toggleCompleteStatus(){
        this.isComplete = !this.isComplete;
    }

    set isComplete(newComplete){
        if (typeof newComplete !== "boolean") throw new Error("ToDo isComplete must be a boolean");
        this._isComplete = newComplete;
    }

    get isComplete(){
        return this._isComplete;
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

    addToDo(title, description, priority, dueDate){
        this.list.push(new ToDo(this._toDoIDCounter, this.id, title, description, priority, dueDate));
        this._toDoIDCounter++;
    }

    removeToDo(toDoId){
        const toDoIndex = this.list.findIndex(toDo => toDo.id === toDoId);
        if (toDoIndex === -1) throw new Error("To Do ID does not exist");
        return this.list.splice(toDoIndex, 1);
    }
}

class Projects{
    constructor(){
        this.list = [];
        this._toDoIDCounter = 1;
        this.toDoArray = [];
    }

    _update(){
        this._updateToDoArray();
    }

    _updateToDoArray(){
        const arr = [];
        for (let projectIndex = 0; projectIndex < this.list.length; projectIndex++)
            for (let toDoIndex = 0; toDoIndex < this.list[projectIndex].list.length; toDoIndex++)
                arr.push(this.list[projectIndex].list[toDoIndex]);
        this.toDoArray = arr;
        return arr;
    }

    addProject(title, description, priority, dueDate){
        this.list.push(new Project(this._toDoIDCounter, title, description, priority, dueDate));
        this._toDoIDCounter++;
        this._update();
    }

    removeProject(projectId){
        const projectIndex = this.list.findIndex(project => project.id === projectId);
        if (projectIndex === -1) throw new Error("To Do ID does not exist");
        this._update();
        return this.list.splice(projectIndex, 1);
    }

    addToDoToLatestProject(title, description, priority, dueDate){
        const projectIndex = this.list.findIndex(project => project.id === this._toDoIDCounter - 1);
        this.list[projectIndex].addToDo(title, description, priority, dueDate);
        this._update();
    }
}

const desc1 = "Create ToDo Class description";

const myProjects = new Projects();

myProjects.addProject("My Project", "lol", 4, new Date(2020,11,6))

myProjects.addToDoToLatestProject("Create ToDo Class", desc1, 5, new Date(2020,11,6))
myProjects.addToDoToLatestProject("Create ToDo Class", "", 5, new Date(2021,0));
myProjects.addToDoToLatestProject("Create ToDo Class", "", 1, new Date(2021));
myProjects.addToDoToLatestProject("Hi", "", "", new Date());

myProjects.addProject("My Project2", "lasdol", 2, new Date(2020,11,9))
myProjects.addToDoToLatestProject("Hsadi", "ss", 2, new Date(2021));

window.b = myProjects;
console.log(myProjects);
console.log(myProjects.list);
console.log(myProjects.toDoArray);