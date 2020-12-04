import { format } from 'date-fns'
import compareAsc from 'date-fns/compareAsc'
import parse from 'date-fns/parse'

class Sorter{
    constructor(listSort){
        this._list = [];
        this.listSort = listSort;
    }
    _compareDueDate(first, second){
        const firstDueDate = first.dueDate;
        const secondDueDate = second.dueDate;
        if (firstDueDate === secondDueDate) return 0;
        if (firstDueDate === "") return 1;
        if (secondDueDate === "") return -1;
        return compareAsc(parse(firstDueDate,'P',new Date()), parse(secondDueDate,'P',new Date()));
    }
    
    _comparePriority(first, second){
        if (first.priority === second.priority) return 0;
        if (first.priority < second.priority) return -1;
        else return 1;
    }
    
    _compareCreationDate(first, second){
        if (first.creationDatetime === second.creationDatetime) return 0;
        if (first.creationDatetime < second.creationDatetime) return -1;
        else return 1;
    }

    _isNotSortValue(listSort){
        return listSort !== "dueDateEarliestFirst" && listSort !== "dueDateOldestFirst" &&
        listSort !== "highestPriorityFirst" && listSort !== "lowestPriorityFirst" &&
        listSort !== "oldestFirst" && listSort !== "newestFirst";
    }

    get listSort(){
        return this._listSort;
    }

    set listSort(newListSort){
        if (this._isNotSortValue(newListSort)) throw new Error("Pick a valid sort mode (listSort)");
        this._listSort = newListSort;
    }

    getList(){
        return this._list;
    }

    _sortList(){
        switch(this._listSort){
            case "dueDateEarliestFirst":
                this._list.sort(this._compareDueDate);
                break;
            case "dueDateOldestFirst":
                this._list.sort(this._compareDueDate).reverse();
                break;
            case "highestPriorityFirst":
                this._list.sort(this._comparePriority);
                break;
            case "lowestPriorityFirst":
                this._list.sort(this._comparePriority).reverse();
                break;
            case "oldestFirst":
                this._list.sort(this._compareCreationDate);
                break;
            case "newestFirst":
                this._list.sort(this._compareCreationDate).reverse();
                break;                
        }
    }

    _update(){
        this._sortList();
    }
}

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
        if (dateTime === ""){
            this._dueDate = "";
            return;
        }
        if (!this._isValidDate(dateTime)) throw new Error("Please Enter a valid date");
        if (dateTime < new Date(2020, 0, 1)) throw new Error("Please enter a date from 2020 onwards")
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

    set projectId(projectId){
        if (projectId === ""){
            // projectId = 0 reserved for "Other"
            this._projectId = 0;
            return;
        }
        if (typeof projectId !== "number") throw new Error("Project ID must be a non-negative Integer");
        if (!Number.isInteger(projectId)) throw new Error("Project ID must be a non-negative Integer");
        if (projectId < 0) throw new Error("Project ID must be a non-negative Integer");
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
class Project extends Sorter{
    constructor(id, title, description, priority, dueDate, listSort){
        super(listSort);
        this.maxPriority = 10;  // dummy number see setter
        this.minPriority = 1;   // dummy number see setter

        this.id = id;

        this.title = title;
        this.isComplete = false;        
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;

        this.creationDatetime = new Date();

        this._toDoIDCounter = 1;
    }

    getToDoNumber(){
        return this._list.length;
    }

    _getToDoIndex(id){
        const index = this._list.findIndex(todo => todo.id === id);
        if (index === -1) throw new Error(`To Do ID ${id} does not exist`);
        return index;
    }

    _getToDo(id){
        const index = this._getToDoIndex(id);
        return this._list[index];
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
        if (dateTime < new Date(2020, 0, 1)) throw new Error("Please enter a date from 2020 onwards")
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

    _addToDo(id, title, description, priority, dueDate){
        this._list.push(new ToDo(id, this.id, title, description, priority, dueDate));
    }

    addToDo(title, description, priority, dueDate){
        this._list.push(new ToDo(this._toDoIDCounter, this.id, title, description, priority, dueDate));
        this._toDoIDCounter++;
        this._update();
    }

    removeToDo(toDoId){
        const toDoIndex = this._list.findIndex(toDo => toDo.id === toDoId);
        if (toDoIndex === -1) throw new Error("To Do ID does not exist");
        const removedToDo = this._list.splice(toDoIndex, 1);
        this._update();
        return removedToDo;
    }
}

class Projects extends Sorter{
    constructor(projectsStorage, listSort){
        super(listSort);
        this.projectsStorage = projectsStorage;
        const myProjects = projectsStorage.getStorage();
        console.log("123")
        console.log(myProjects)
        if (myProjects.length === 0){
            this._toDoIDCounter = 1;
            this._toDoList = [];

            this._toDosListener = "";
            this._addMiscProject();
        } else {
            this._init(myProjects);
            this._toDoList = [];

            this._toDosListener = "";
            this._update();
        }

    }

    _init(myProjects){
        myProjects.list.forEach(project => {
            this._addProject(project._id, project._title, project._description, project._priority, 
            project._dueDate === "" ? "" : new Date(project._dueDate), 
            project._listSort);
            project._list.forEach(todo => this._addToDoToProject(todo._id, todo._projectId, todo._title, todo._description, todo._priority, 
                todo._dueDate === "" ? "" : new Date(todo._dueDate)));
        })

        this._toDoIDCounter = myProjects.toDoIDCounter
    }

    _update(){
        this._updateToDoList();
        this._sortList();
        if (this._toDosListener !== "" && this._toDosListener !== undefined) this._toDosListener._update();
        this.projectsStorage.updateStorage(this);
    }

    _updateToDoList(){
        const arr = [];
        for (let projectIndex = 0; projectIndex < this._list.length; projectIndex++)
            for (let toDoIndex = 0; toDoIndex < this._list[projectIndex]._list.length; toDoIndex++)
                arr.push(this._list[projectIndex]._list[toDoIndex]);
        this._toDoList = arr;
    }

    _getProjectIndex(projectId){
        const projectIndex = this._list.findIndex(project => project.id === projectId);
        if (projectIndex === -1) throw new Error(`Project ID ${projectId} does not exist`);
        return projectIndex;
    }

    _getProject(projectId){
        const projectIndex = this._getProjectIndex(projectId);
        return this._list[projectIndex];
    }

    getList(){
        return this._list.filter(project => project.id !== 0 || project.getToDoNumber() !== 0);
    }

    getToDoList(){
        return this._toDoList;
    }

    _addProject(id, title, description, priority, dueDate, listSort){
        this._list.push(new Project(id, title, description, priority, dueDate, listSort));
    }

    _addToDoToProject(id, projectId, title, description, priority, dueDate){
        if (projectId === "") projectId = 0;
        const projectIndex = this._getProjectIndex(projectId)
        this._list[projectIndex]._addToDo(id, title, description, priority, dueDate);
        this._update();
    }

    addProject(title, description, priority, dueDate, listSort){
        this._list.push(new Project(this._toDoIDCounter, title, description, priority, dueDate, listSort));
        this._toDoIDCounter++;
        this._update();
    }

    _addMiscProject(){
        this._list.push(new Project(0, "Other", "", "", "", "dueDateEarliestFirst"));
        this._update();
    }

    removeProject(projectId){
        if (projectId === 0) throw new Error("Cannot Remove Misc Project");
        const projectIndex = this._getProjectIndex(projectId);
        const removedProject = this._list.splice(projectIndex, 1);
        this._update();
        return removedProject;
    }

    addToDoToLatestProject(title, description, priority, dueDate){
        const projectIndex = this._getProjectIndex(this._toDoIDCounter - 1);
        this._list[projectIndex].addToDo(title, description, priority, dueDate);
        this._update();
    }

    addToDoToProject(projectId, title, description, priority, dueDate){
        if (projectId === "") projectId = 0;
        const projectIndex = this._getProjectIndex(projectId)
        this._list[projectIndex].addToDo(title, description, priority, dueDate);
        this._update();
    }

    removeToDoFromProject(projectId, toDoId){
        if (projectId === "") projectId = 0;
        const projectIndex = this._getProjectIndex(projectId)
        this._list[projectIndex].removeToDo(toDoId);
        this._update();
    }

    toJSON(){
        return{
            list: this.getList(),
            toDoIDCounter: this._toDoIDCounter
        }
    }
}

class ToDos extends Sorter{
    constructor(listSort, projects){
        super(listSort);
        this._list = projects.getToDoList();
        this.projects = projects;
        projects._toDosListener = this;
    }

    _update(){
        this._list = this.projects.getToDoList();
        this._sortList();
    }
}

export {Projects, ToDos};