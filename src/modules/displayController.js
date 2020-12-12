import parse from 'date-fns/parse'
import parseISO from 'date-fns/parse'

class SortFormLoader{
    constructor(myProjects){
        this.myProjects = myProjects;
        this.mainDiv = ""
        this._updateSort = this._updateSort.bind(this)

        this.tasksPageLoader = ""
    }

    _updateSort(e){
        if (e.target.id === "Project-view") this.myProjects.updateSort(e.target.value);
        else if (e.target.id === "Task-view") this.myProjects.updateEachProjectSort(e.target.value)
        this.tasksPageLoader._update();
    }

    _createDropdown(sortFormSelect){
        const optionValues = ["dueDateEarliestFirst", "dueDateOldestFirst", "highestPriorityFirst", 
        "lowestPriorityFirst", "oldestFirst", "newestFirst"]
        const optionText = ["Most Recent Deadline", "Farthest Deadline", "Highest Priority",
        "Lowest Priority", "Oldest Created", "Most Recent Created"]

        for (let index = 0; index < optionValues.length; index++)
            this._createDropdownOption(sortFormSelect, optionValues[index], optionText[index]);

        sortFormSelect.addEventListener("change", this._updateSort)
    }


    _createDropdownOption(sortFormSelect, value, text){
        const optionTag = document.createElement("option")
        optionTag.value = value
        optionTag.innerText = text
        sortFormSelect.appendChild(optionTag)
    }

    _buildSortForm(view){
        const sortDiv = document.createElement("div")
        sortDiv.classList = "sort"
        const sortForm = document.createElement("form")
        const sortFormLabel = document.createElement("label")
        sortFormLabel.htmlFor = view + "-view";
        sortFormLabel.innerText = view + " Sort:  "
        const sortFormSelect = document.createElement("select")
        sortFormSelect.id = view + "-view";
        sortFormSelect.name = view + "-view";

        this._createDropdown(sortFormSelect)

        sortForm.appendChild(sortFormLabel);
        sortForm.appendChild(sortFormSelect);
        sortDiv.appendChild(sortForm)
        this.mainDiv.appendChild(sortDiv)
    }

    buildSortForms(mainDiv){
        this.mainDiv = mainDiv

        this._buildSortForm("Project");
        this._buildSortForm("Task");
    }
}

class AddItemMethods{
    constructor(myProjects){
        this.myProjects = myProjects;

        this._createEditForm = this._createEditForm.bind(this);
        this._createDelete = this._createDelete.bind(this);
        this._closeEditForm = this._closeEditForm.bind(this); 
        this._submitEditForm = this._submitEditForm.bind(this); 
    }

    buildNewPlus(projectsDiv, size){
        const projectDiv = document.createElement("div");
        if (size === "large"){
            projectDiv.classList.add("project");
            projectDiv.classList.add("add-new-card");
        } else if (size === "small"){
            projectDiv.classList.add("todo");
            projectDiv.classList.add("add-new-task");
        }

        const form = document.createElement("form")
        form.classList.add("form")
        form.classList.add("form-new")

        const imgDiv = document.createElement("div")
        imgDiv.id = "plus-icon-" + size

        const img = document.createElement("img");
        img.src = "images/plus_icon.png"
        img.alt = "plus icon"
        img.id = "plus-icon-img-" + size

        imgDiv.appendChild(img)
        imgDiv.addEventListener("click", this._createAddForm)

        form.appendChild(imgDiv)
        projectDiv.appendChild(form)

        projectsDiv.appendChild(projectDiv);
    }

    _submitEditForm(e){
        e.preventDefault()
        throw new Error("_submitEditForm function has not been created")
    }

    _getProjectId(tag){
        while (tag.dataset.projectId === undefined) tag = tag.parentNode;
        return parseInt(tag.dataset.projectId);
    }

    _getTodoId(tag){
        while (tag.dataset.projectId === undefined) tag = tag.parentNode;
        return parseInt(tag.dataset.todoId);
    }

    _addIcon(projectTitleDiv, view){
        const tag = document.createElement("img");
        tag.src = 'images/' + view + '_icon.png';
        tag.alt = view + ' icon';
        tag.classList.add("icon")

        if (view === "edit") tag.addEventListener("click", this._createEditForm)
        if (view === "delete") tag.addEventListener("click", this._createDelete)

        projectTitleDiv.appendChild(tag);
    }

    _createEditForm(e){
        throw new Error("_createEditForm function has not been created")
    }

    _createDelete(e){
        throw new Error("_createDelete function has not been created")
    }

    _createForm(form, item){
        throw new Error("_createForm function has not been created")
    }

    _addEditFormInput(parentDiv, project, key, dataType, required){
        const input = document.createElement("input")
        const randomProject = this.myProjects.getList()[0];
        input.htmlFor = key;
        input.id = key;
        input.name = key;
        input.type = dataType;
        if (project !== ""){
            if (key === "dueDate") input.value = project[key] === "" ? "" : parse(project[key],'P',new Date()).toISOString().substring(0, 10);
            else input.value = project[key];
        }
        if (key === "dueDate") input.min = randomProject.minDueDate.toISOString().substring(0, 10);
        else if (key === "priority"){
            input.min = randomProject.minPriority
            input.max = randomProject.maxPriority
        }
        if (key !== "dueDate") input.required = required
        parentDiv.appendChild(input)
    }

    _addYesNoBtns(parentDiv){
        const formBtns = document.createElement("div")
        formBtns.classList.add("edit-form-btns")

        const formYesBtn = document.createElement("input")
        const formNoBtn = document.createElement("button")

        formYesBtn.htmlFor = "yes-btn"
        formYesBtn.name = "yes-btn"
        formYesBtn.classList.add("yes-btn")
        formYesBtn.classList.add("small-btn")
        formYesBtn.type = "submit"
        formYesBtn.value = "✓"

        formNoBtn.classList.add("no-btn")
        formNoBtn.classList.add("small-btn")
        formNoBtn.innerText = "x"
        formNoBtn.addEventListener("click", this._closeEditForm)

        formBtns.appendChild(formYesBtn);
        formBtns.appendChild(formNoBtn);
        parentDiv.appendChild(formBtns)
    }

    _closeEditForm(e){
        e.preventDefault();
        this._update() 
    }
}

class AddProjectMethods extends AddItemMethods{
    constructor(myProjects){
        super(myProjects)
        this.cardsLoader = ""
    }

    _update(){
        this.cardsLoader._update()
    }

    _submitEditForm(e){
        e.preventDefault();
        let projectId = ""
        try {
            projectId = this._getProjectId(e.target);
        } catch (e){
        }
        let newTitle = ""
        let newDueDate = ""
        let newPriority = ""

        const formElements = e.target.elements
        for (let index = 0; index < formElements.length; index++){
            if (formElements[index].id === "title") newTitle = formElements[index].value;
            if (formElements[index].id === "dueDate") newDueDate = formElements[index].value === "" ? "" : new Date(formElements[index].value);
            if (formElements[index].id === "priority") newPriority = parseInt(formElements[index].value);
        }

        if (projectId !== "") this.myProjects.updateProjectInfo(projectId, newTitle, "BLANK", newPriority, newDueDate);
        else this.myProjects.addProject(newTitle, "", newPriority, newDueDate);
        this._update();
    }

    _addProjectDetails(project, projectDiv){
        this._addProjectTitleDiv(project, projectDiv)
        this._addProjectDetailsDiv(project, projectDiv)
    } 

    _addProjectTitleDiv(project, projectDiv){
        const projectTitleDiv = document.createElement("div");
        projectTitleDiv.classList.add("project-title");
    
        this._addIcon(projectTitleDiv, "delete");
        this._addProjectTitleH1Tag(project, projectTitleDiv)
        this._addIcon(projectTitleDiv, "edit");
    
        projectDiv.appendChild(projectTitleDiv);
    }

    _createEditForm(e){
        const projectId = this._getProjectId(e.target);
        const project = this.myProjects._getProject(projectId);
        const form = e.target.parentNode.parentNode;
        form.addEventListener("submit", this._submitEditForm);
        this._createForm(form, project)
    }

    _createDelete(e){
        try {
            const projectId = this._getProjectId(e.target);
            this.myProjects.removeProject(projectId);
        } catch (e){
        }
        
        this._update();
    }

    _addProjectTitleH1Tag(project, projectTitleDiv){
        const projectTitleH1Tag = document.createElement("h1");
        if (project !== "") projectTitleH1Tag.innerText = project.title;

        projectTitleDiv.appendChild(projectTitleH1Tag);
    }


    _addProjectDetailsDiv(project, projectDiv){
        const projectDetailsDiv = document.createElement("div");
        projectDetailsDiv.classList.add("project-details");

        this._addProjectDetailsSubDiv(project, projectDetailsDiv, "Deadline", "dueDate")
        this._addProjectDetailsSubDiv(project, projectDetailsDiv, "Priority", "priority")
    
        projectDiv.appendChild(projectDetailsDiv);
    }

    _addProjectDetailsSubDiv(project, projectDetailsDiv, innerText, attr){
        const projectPriorityDiv = document.createElement("div");
        projectPriorityDiv.classList.add("project-details-sub");
        projectPriorityDiv.classList.add(attr);
    
        const projectPriorityH2TitleTag = document.createElement("h2");
        projectPriorityH2TitleTag.innerText = innerText;
    
        const projectPriorityH2EntryTag = document.createElement("h2");
        if (project !== "") projectPriorityH2EntryTag.innerText = project[attr];
    
        projectPriorityDiv.appendChild(projectPriorityH2TitleTag)
        projectPriorityDiv.appendChild(projectPriorityH2EntryTag)
    
        projectDetailsDiv.appendChild(projectPriorityDiv);
    }


    _createForm(form, project){
        const projectTitleDiv = form.firstChild;
        const projectDetailsDiv = projectTitleDiv.nextSibling;

        projectTitleDiv.removeChild(projectTitleDiv.lastChild);
        projectTitleDiv.removeChild(projectTitleDiv.lastChild);

        const dueDateDiv = projectDetailsDiv.querySelector(".dueDate");
        dueDateDiv.removeChild(dueDateDiv.lastChild);

        const priorityDiv = projectDetailsDiv.querySelector(".priority");
        priorityDiv.removeChild(priorityDiv.lastChild);

        this._addEditFormInput(projectTitleDiv, project, "title", "text", true);
        this._addYesNoBtns(projectTitleDiv);
        this._addEditFormInput(dueDateDiv, project, "dueDate", "date", false);
        this._addEditFormInput(priorityDiv, project, "priority", "number", true);
    }
}
class NewCardLoader extends AddProjectMethods{
    constructor(myProjects){
        super(myProjects)

        this._createAddForm = this._createAddForm.bind(this);
    }

    _createAddForm(e){
        const project = ""
        const form = e.target.parentNode.parentNode;
        form.removeChild(form.firstChild)
        form.classList.remove("form-new")
        form.classList.add("form-edit")
        form.addEventListener("submit", this._submitEditForm);
        this._addProjectDetails(project, form)
        this._createForm(form, project)
    }
}
class AddTaskMethods extends AddItemMethods{
    constructor(myProjects){
        super(myProjects)
        this.projectCardTasksLoader = ""
    }

    _update(){
        this.projectCardTasksLoader._update()
    }

    addToDoFormEntries(todo, form){
        this._addIcon(form, "delete")
        this._addIcon(form, "edit")
        this._addTaskEntry(todo, form, "title")
        this._addTaskEntry(todo, form, "dueDate")
        this._addTaskEntry(todo, form, "priority")
        
    }

    addToDoDiv(todo, todosDiv){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        const form = document.createElement("form");
        form.classList.add("task-form-edit")

        this.addToDoFormEntries(todo, form)
        todoDiv.appendChild(form)

        if (todo !== "") this._addCheckedForm(todo, todoDiv, "isComplete");
        else {
            const tag = document.createElement("h4");
            tag.classList.add("todo-iscomplete")
            todoDiv.appendChild(tag)
        }
    
        if (todo !== ""){
            todoDiv.dataset.todoId = todo.id;
            todoDiv.dataset.projectId = todo.projectId;
        }
        
        todosDiv.appendChild(todoDiv)        
    }

    _addTaskEntry(todo, todoDiv, key){
        const div = document.createElement("div");
        div.classList.add("todo-"+key.toLowerCase())

        const tag = document.createElement("h4");
        if (todo !== "") tag.innerText = todo[key];
        
        div.appendChild(tag);
        todoDiv.appendChild(div);
    }

    _createForm(form, todo){
        form.classList.add("task-form")
        form.classList.remove("task-form-edit")
        
        const titleDiv = form.querySelector(".todo-title");
        titleDiv.removeChild(titleDiv.firstChild)
        const dueDateDiv = titleDiv.nextSibling
        dueDateDiv.removeChild(dueDateDiv.firstChild)
        const priorityDiv = dueDateDiv.nextSibling
        priorityDiv.removeChild(priorityDiv.firstChild)

        const isCompleteDiv = document.createElement("div");
        isCompleteDiv.classList.add("todo-iscomplete")

        const formParent = priorityDiv.parentNode.parentNode
        while (formParent.childElementCount > 1) formParent.removeChild(formParent.lastChild)

        form.appendChild(isCompleteDiv);

        this._addEditFormInput(titleDiv, todo, "title", "text", true);
        this._addYesNoBtns(isCompleteDiv);
        this._addEditFormInput(dueDateDiv, todo, "dueDate", "date", false);
        this._addEditFormInput(priorityDiv, todo, "priority", "number", true);
    }

    _createDelete(e){
        try {
            const projectId = this._getProjectId(e.target);
            const toDoId = this._getTodoId(e.target);
            this.myProjects.removeToDoFromProject(projectId, toDoId);
        } catch (e){
        }
        
        this._update();
    }

    _createEditForm(e){
        const projectId = this._getProjectId(e.target);
        const toDoId = this._getTodoId(e.target);
        const toDo = this.myProjects._getProject(projectId)._getToDo(toDoId);
        const form = e.target.parentNode;
        form.addEventListener("submit", this._submitEditForm);
        this._createForm(form, toDo)
    }


    _submitEditForm(e){
        e.preventDefault();
        let projectId = ""
        let toDoId = ""
        try {
            projectId = this._getProjectId(e.target);
            toDoId = this._getTodoId(e.target)
        } catch (e){
        }

        let newTitle = ""
        let newDueDate = ""
        let newPriority = ""

        const formElements = e.target.elements
        for (let index = 0; index < formElements.length; index++){
            if (formElements[index].id === "title") newTitle = formElements[index].value;
            if (formElements[index].id === "dueDate") newDueDate = formElements[index].value === "" ? "" : new Date(formElements[index].value);
            if (formElements[index].id === "priority") newPriority = parseInt(formElements[index].value);
        }

        if (!Number.isNaN(toDoId)) this.myProjects.updateToDoInfo(projectId, toDoId, newTitle, "BLANK", newPriority, newDueDate);
        else this.myProjects.addToDoToProject(projectId, newTitle, "", newPriority, newDueDate);
        this._update();
    }
}

class NewTaskLoader extends AddTaskMethods{
    constructor(myProjects){
        super(myProjects)

        this._createAddForm = this._createAddForm.bind(this);
    }

    _createAddForm(e){
        const todo = ""
        const form = e.target.parentNode.parentNode;

        form.removeChild(form.firstChild)
        form.classList.remove("form-new")
        form.classList.remove("form")
        form.classList.add("task-form-edit")
        form.addEventListener("submit", this._submitEditForm);
        this.addToDoFormEntries(todo, form)
        this._createForm(form, todo)
    }
}

class ProjectCardTaskLoader extends AddTaskMethods{
    constructor(myProjects){
        super(myProjects)
        this._toggleComplete = this._toggleComplete.bind(this)
    }

    _toggleComplete(e){
        const checkboxTag = e.target;
        const todoDiv = checkboxTag.parentNode.parentNode
        const projectId = this._getProjectId(checkboxTag);
        const todoId = this._getTodoId(checkboxTag);

        this.myProjects.toggleCompleteStatus(projectId, todoId)

        checkboxTag.checked = !checkboxTag.checked
        if (todoDiv.dataset.checked === "off") todoDiv.dataset.checked = "on"
        else todoDiv.dataset.checked = "off"
        this._update();
    }

    _addCheckedForm(todo, todoDiv, key){
        const tag = document.createElement("form");
        const inputTag  = document.createElement("input");
        inputTag.type = "checkbox"
        inputTag.checked = todo[key]
        inputTag.addEventListener("click", this._toggleComplete)
        if (todo[key]) todoDiv.dataset.checked = "on"
        else todoDiv.dataset.checked = "off"
        tag.classList.add("todo-"+key.toLowerCase())
        tag.appendChild(inputTag);
        todoDiv.appendChild(tag);
    }
}

class ProjectCardTasksLoader{
    constructor(myProjects, projectCardTaskLoader, newTaskLoader) {
        this.myProjects = myProjects;
        
        newTaskLoader.projectCardTasksLoader = this
        this.newTaskLoader = newTaskLoader

        projectCardTaskLoader.projectCardTasksLoader = this
        this.projectCardTaskLoader = projectCardTaskLoader

        this.projectCardsLoader = ""
        
    }
    _update(){
        this.projectCardsLoader._update()
    }

    addToDosDiv(project, projectDiv){
        const projectTodosDiv = document.createElement("div");
        projectTodosDiv.classList.add("todos");
    
        this._addToDoDivHeader(projectTodosDiv)
        project.getList().forEach(todo => this.projectCardTaskLoader.addToDoDiv(todo, projectTodosDiv))

        this.newTaskLoader.buildNewPlus(projectTodosDiv, "small")

        projectDiv.appendChild(projectTodosDiv);
    }

    _addToDoDivHeader(todosDiv){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.classList.add("todo-header");
    
        this._addHeaders(todoDiv, "Title")
        this._addHeaders(todoDiv, "Deadline")
        this._addHeaders(todoDiv, "Priority")
        this._addHeaders(todoDiv, "isComplete")

        todosDiv.appendChild(todoDiv)
    }

    _addHeaders(todoDiv, key){
        const div = document.createElement("div");

        const tag = document.createElement("h3");
        if (key !== "isComplete")tag.innerText = key;
        div.classList.add("todo-"+key.toLowerCase())
        div.appendChild(tag);

        todoDiv.appendChild(div);
    }
}


class ProjectCardExpandLoader{
    constructor(myProjects){
        this.myProjects = myProjects;

        this.projectCardsLoader = "";

        this._expandProjectListener = this._expandProjectListener.bind(this);
    }

    _update(){
        this.projectCardsLoader._update()
    }

    addExpandDiv(projectDiv){
        const projectExpandDiv = document.createElement("div");
        projectExpandDiv.classList.add("expand");
    
        const projectExpandATag = document.createElement("a");
        projectExpandATag.innerText = "Expand";
        projectExpandATag.addEventListener("click", this._expandProjectListener)
    
        projectExpandDiv.appendChild(projectExpandATag);
    
        projectDiv.appendChild(projectExpandDiv);
    }

    _expandProjectListener(e){
        const projectId = this._getProjectId(e.target)
        this._expandProject(projectId)
    }

    _expandProject(id){
        console.log(id)
    }

    _getProjectId(tag){
        while (tag.dataset.projectId === undefined) tag = tag.parentNode;
        return parseInt(tag.dataset.projectId);
    }
}

class ProjectCardsLoader extends AddProjectMethods{
    constructor(myProjects, projectCardTasksLoader, projectCardExpandLoader){
        super(myProjects)

        projectCardExpandLoader.projectCardsLoader = this;
        this.projectCardExpandLoader = projectCardExpandLoader;

        projectCardTasksLoader.projectCardsLoader = this;
        this.projectCardTasksLoader = projectCardTasksLoader;
    }

    buildProjectCard(project, projectsDiv){
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        
        this._addProjectSubDivs(project, projectDiv);
    
        projectDiv.dataset.projectId = project.id;
        projectsDiv.appendChild(projectDiv);
    }

    _addProjectSubDivs(project, projectDiv){
        const form = document.createElement("form");
        form.classList.add("project-form")
        form.classList.add("project-form-edit")

        projectDiv.appendChild(form)

        this._addProjectDetails(project, form);
        this.projectCardTasksLoader.addToDosDiv(project, projectDiv);
        this.projectCardExpandLoader.addExpandDiv(projectDiv);
    }
}

class CardsLoader{
    constructor(myProjects, newCardLoader, projectCardsLoader){
        newCardLoader.cardsLoader = this;
        this.newCardLoader = newCardLoader

        projectCardsLoader.cardsLoader = this;
        this.projectCardsLoader = projectCardsLoader

        this.myProjects = myProjects;
        this.mainDiv = ""

        this.tasksPageLoader = ""
    }

    _update(){
        this.tasksPageLoader._update()
    }

    buildCards(mainDiv){
        this.mainDiv = mainDiv

        const projectsDiv = document.createElement("div");
        projectsDiv.id = "projects"
        this.newCardLoader.buildNewPlus(projectsDiv, "large");
        this.myProjects.getList().forEach(project => this.projectCardsLoader.buildProjectCard(project, projectsDiv))
        this.mainDiv.appendChild(projectsDiv)
    }
}
class TasksPageLoader{
    constructor(myProjects, sortFormLoader, cardsLoader){
        cardsLoader.tasksPageLoader = this;
        this.cardsLoader = cardsLoader;

        sortFormLoader.tasksPageLoader = this;
        this.sortFormLoader = sortFormLoader;

        this.myProjects = myProjects;
        this.mainDiv = ""
    }

    _update(){
        this.deleteProjectsContainer();
        this.cardsLoader.buildCards(this.mainDiv);
    }
    
    deleteProjectsContainer(){
        const projectsDiv = this.mainDiv.querySelector("#projects");
        this.mainDiv.removeChild(projectsDiv);
    }

    buildPage(mainDiv){
        this.mainDiv = mainDiv

        this.sortFormLoader.buildSortForms(this.mainDiv)
        this.cardsLoader.buildCards(this.mainDiv);
    }
}

class DisplayController{
    constructor(TasksPageLoader, SettingsPageLoader){
        this.myProjects = TasksPageLoader.myProjects;
        this.body = document.querySelector("body");
        this.tasksPage = TasksPageLoader;
        this.settingsPage = SettingsPageLoader;

        this.loadTasksPage = this.loadTasksPage.bind(this);
        this.loadSettingsPage = this.loadSettingsPage.bind(this);
        
        this._createHtmlSkeleton();
        this.loadTasksPage();
    }

    deleteContainer(){
        while (this.mainDiv.firstChild) this.mainDiv.removeChild(this.mainDiv.lastChild);
    }

    loadTasksPage(){
        this.myProjects.updateSettings()
        this.deleteContainer();
        this.tasksLiTag.classList.add("active");
        this.settingsLiTag.classList.remove("active");
        this.settingsLiTag.addEventListener("click", this.loadSettingsPage)
        this.tasksLiTag.removeEventListener("click", this.loadTasksPage)
        this.tasksPage.buildPage(this.mainDiv)
    }

    loadSettingsPage(){
        this.deleteContainer();
        this.settingsLiTag.classList.add("active");
        this.tasksLiTag.classList.remove("active");
        this.settingsLiTag.removeEventListener("click", this.loadSettingsPage)
        this.tasksLiTag.addEventListener("click", this.loadTasksPage)
    }

    _createHtmlSkeleton(){
        this._addHeaderItems();
        this._createContainer();
        this._addFooterItems();
    }

    _addHeaderItems(){
        this.headerTag = document.createElement("header");
        this.ulTag = document.createElement("ul");
        this.ulTag.id = "nav"
        this.tasksLiTag = document.createElement("li")
        this.tasksATag = document.createElement("a")
        this.tasksATag.innerText = "Tasks";
    
        this.tasksLiTag.appendChild(this.tasksATag);
    
        this.settingsLiTag = document.createElement("li")
        this.settingsATag = document.createElement("a")
        this.settingsATag.innerText = "Settings";
    
        this.tasksLiTag.appendChild(this.tasksATag);
        this.settingsLiTag.appendChild(this.settingsATag);
    
        this.ulTag.appendChild(this.tasksLiTag);
        this.ulTag.appendChild(this.settingsLiTag);
    
        this.headerTag.appendChild(this.ulTag);
    
        this.body.appendChild(this.headerTag)
    }
    
    _addFooterItems(){
        this.footerTag = document.createElement("footer");
        this.aTag = document.createElement("a")
        this.aTag.innerText = "Back To Top";
    
        this.footerTag.appendChild(this.aTag);
    
        this.body.appendChild(this.footerTag)
    }
    
    _createContainer(){
        this.mainDiv = document.createElement("div")
        this.mainDiv.id = "container";
        this.body.appendChild(this.mainDiv)
    }
}

export {NewCardLoader, NewTaskLoader, ProjectCardTaskLoader, ProjectCardTasksLoader, ProjectCardExpandLoader, ProjectCardsLoader, CardsLoader, SortFormLoader, TasksPageLoader, DisplayController}