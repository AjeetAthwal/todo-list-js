import parse from 'date-fns/parse'
import parseISO from 'date-fns/parse'
class TasksPageLoader{
    constructor(myProjects){
        this.myProjects = myProjects;
        this.mainDiv = ""
        this._updateSort = this._updateSort.bind(this)
        this._expandProjectListener = this._expandProjectListener.bind(this);
        this._createProjectEditForm = this._createProjectEditForm.bind(this);
        this._closeProjectEditForm = this._closeProjectEditForm.bind(this); 
        this._submitProjectEditForm = this._submitProjectEditForm.bind(this); 
        this._createAddProjectForm = this._createAddProjectForm.bind(this);
    }

    buildProjectCards(){

        const projectsDiv = document.createElement("div");
        projectsDiv.id = "projects"
        this._buildAddNewCard(projectsDiv);
        this.myProjects.getList().forEach(project => this._buildProjectCard(project, projectsDiv))
        this.mainDiv.appendChild(projectsDiv)
    }


    _update(){
        this.deleteProjectsContainer();
        this.buildProjectCards();
    }
    
    _updateSort(e){
        if (e.target.id === "Project-view") this.myProjects.updateSort(e.target.value);
        else if (e.target.id === "Task-view") this.myProjects.updateEachProjectSort(e.target.value)
        this._update();
    }

    deleteProjectsContainer(){
        const projectsDiv = this.mainDiv.querySelector("#projects");
        this.mainDiv.removeChild(projectsDiv);
    }

    buildPage(mainDiv){
        this.mainDiv = mainDiv

        this._buildSortForm("Project");
        this._buildSortForm("Task");
        this.buildProjectCards();
    }

    _createDropdownOption(sortFormSelect, value, text){
        const optionTag = document.createElement("option")
        optionTag.value = value
        optionTag.innerText = text
        sortFormSelect.appendChild(optionTag)
    }

    _createDropdown(sortFormSelect){
        const optionValues = ["dueDateEarliestFirst", "dueDateOldestFirst", "highestPriorityFirst", 
        "lowestPriorityFirst", "oldestFirst", "newestFirst", "Highest Priority"]
        const optionText = ["Most Recent Deadline", "Farthest Deadline", "Highest Priority",
        "Lowest Priority", "Oldest Created", "Most Recent Created"]

        for (let index = 0; index < optionValues.length; index++)
            this._createDropdownOption(sortFormSelect, optionValues[index], optionText[index]);

        sortFormSelect.addEventListener("change", this._updateSort)
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

    _buildAddNewCard(projectsDiv){
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.classList.add("add-new-card");
        
        const form = document.createElement("form")

        const imgDiv = document.createElement("div")
        imgDiv.id = "plus-icon"

        const img = document.createElement("img");
        img.src = "images/plus_icon.png"
        img.alt = "plus icon"
        img.id = "plus-icon-img"

        imgDiv.appendChild(img)
        imgDiv.addEventListener("click", this._createAddProjectForm)

        form.appendChild(imgDiv)
        projectDiv.appendChild(form)

        projectsDiv.appendChild(projectDiv);
    }


    _buildProjectCard(project, projectsDiv){
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        
        this._addProjectSubDivs(project, projectDiv);
    
        projectDiv.dataset.projectId = project.id;
        projectsDiv.appendChild(projectDiv);
    }

    _expandProject(id){
        console.log(id)
    }

    _getProjectId(tag){
        while (tag.dataset.projectId === undefined) tag = tag.parentNode;
        return parseInt(tag.dataset.projectId);
    }

    _expandProjectListener(e){
        const projectId = this._getProjectId(e.target)
        this._expandProject(projectId)
    }

    _addToDosDiv(project, projectDiv){
        const projectTodosDiv = document.createElement("div");
        projectTodosDiv.classList.add("todos");
    
        this._addToDoDivHeader(projectTodosDiv)
        project.getList().forEach(todo => this._addToDoDiv(todo, projectTodosDiv))

        projectDiv.appendChild(projectTodosDiv);
    }
    
    _addExpandDiv(projectDiv){
        const projectExpandDiv = document.createElement("div");
        projectExpandDiv.classList.add("expand");
    
        const projectExpandATag = document.createElement("a");
        projectExpandATag.innerText = "Expand";
        projectExpandATag.addEventListener("click", this._expandProjectListener)
    
        projectExpandDiv.appendChild(projectExpandATag);
    
        projectDiv.appendChild(projectExpandDiv);
    }

    _addProjectSubDivs(project, projectDiv){
        const form = document.createElement("form");
        form.classList.add("project-form-edit")

        projectDiv.appendChild(form)

        this._addProjectDetails(project, form);
        this._addToDosDiv(project, projectDiv);
        this._addExpandDiv(projectDiv);
    }
    
    _addH3Tag(todoDiv, key){
        const tag = document.createElement("h3");
        tag.innerText = key;
        todoDiv.appendChild(tag);
    }

    _addToDoDivHeader(todosDiv){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.classList.add("todo-header");
    
        this._addH3Tag(todoDiv, "Title")
        this._addH3Tag(todoDiv, "Deadline")

        todosDiv.appendChild(todoDiv)
    }

    _addH4Tag(todo, todoDiv, key){
        const h4Tag = document.createElement("h4");
        h4Tag.innerText = todo[key];
        todoDiv.appendChild(h4Tag);
    }

    _addToDoDiv(todo, todosDiv){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        this._addH4Tag(todo, todoDiv, "title")
        this._addH4Tag(todo, todoDiv, "dueDate")
    
        todoDiv.dataset.todoId = todo.id;
        todoDiv.dataset.projectId = todo.projectId;
        todosDiv.appendChild(todoDiv)
    }

    _closeProjectEditForm(e){
        e.preventDefault();
        this._update() 
    }
    
    _submitProjectEditForm(e){
        e.preventDefault();

        const projectId = this._getProjectId(e.target);

        let newTitle = ""
        let newDueDate = ""
        let newPriority = ""

        const formElements = e.target.elements
        for (let index = 0; index < formElements.length; index++){
            if (formElements[index].id === "title") newTitle = formElements[index].value;
            if (formElements[index].id === "dueDate") newDueDate = formElements[index].value === "" ? "" : new Date(formElements[index].value);
            if (formElements[index].id === "priority") newPriority = parseInt(formElements[index].value);
        }

        console.log(newDueDate)

        this.myProjects.updateProjectInfo(projectId, newTitle, "BLANK", newPriority, newDueDate);
        this._update();
    }

    _createAddProjectForm(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.id);
        console.log(e.target.parentNode);
        console.log(e.target.parentNode.parentNode);
    }

    _addEditFormInput(parentDiv, project, key, dataType, required){
        const input = document.createElement("input")
        input.htmlFor = key;
        input.id = key;
        input.name = key;
        input.type = dataType;
        if (key === "dueDate") input.value = project[key] === "" ? "" : parse(project[key],'P',new Date()).toISOString().substring(0, 10);
        else input.value = project[key];
        if (key === "dueDate") input.min = project.minDueDate.toISOString().substring(0, 10);
        else if (key === "priority"){
            input.min = project.minPriority
            input.max = project.maxPriority
        }
        input.required = required
        parentDiv.appendChild(input)
    }

    _addYesNoBtns(parentDiv){
        const formYesBtn = document.createElement("input")
        const formNoBtn = document.createElement("button")

        formYesBtn.htmlFor = "yes-btn"
        formYesBtn.id = "yes-btn"
        formYesBtn.name = "yes-btn"
        formYesBtn.classList.add("yes-btn")
        formYesBtn.classList.add("small-btn")
        formYesBtn.type = "submit"
        formYesBtn.value = "✓"

        formNoBtn.classList.add("no-btn")
        formNoBtn.classList.add("small-btn")
        formNoBtn.innerText = "x"
        formNoBtn.addEventListener("click", this._closeProjectEditForm)

        formBtns.appendChild(formYesBtn);
        formBtns.appendChild(formNoBtn);
        parentDiv.appendChild(formBtns)
    }

    _createProjectEditForm(e){
        console.log(e.target.id === "plus-icon-img")
        console.log(e.target.id)
        const projectId = this._getProjectId(e.target);
        const project = this.myProjects._getProject(projectId)
        const form = e.target.parentNode.parentNode;
        form.addEventListener("submit", this._submitProjectEditForm)
        const projectTitleDiv = form.firstChild
        const projectDetailsDiv = projectTitleDiv.nextSibling;

        projectTitleDiv.removeChild(projectTitleDiv.lastChild)
        projectTitleDiv.removeChild(projectTitleDiv.lastChild)

        this._addEditFormInput(projectTitleDiv, project, "title", "text", true)

        const formBtns = document.createElement("div")
        formBtns.classList.add("project-edit-form-btns")

        this._addYesNoBtns(projectTitleDiv)
        
        const dueDateDiv = projectDetailsDiv.querySelector(".dueDate")
        dueDateDiv.removeChild(dueDateDiv.lastChild);

        this._addEditFormInput(dueDateDiv, project, "dueDate", "date", false)
        
        const priorityDiv = projectDetailsDiv.querySelector(".priority")
        priorityDiv.removeChild(priorityDiv.lastChild);

        this._addEditFormInput(priorityDiv, project, "priority", "number", true)
    }

    _addEditIcon(projectTitleDiv){
        const projectTitleEditIconTag = document.createElement("img");
        projectTitleEditIconTag.src = 'images/edit_icon.png';
        projectTitleEditIconTag.alt = 'edit icon';
        projectTitleEditIconTag.classList.add("edit-icon")
        projectTitleEditIconTag.addEventListener("click", this._createProjectEditForm)

        projectTitleDiv.appendChild(projectTitleEditIconTag);
    }

    _addProjectTitleH1Tag(project, projectTitleDiv){
        const projectTitleH1Tag = document.createElement("h1");
        projectTitleH1Tag.innerText = project.title;

        projectTitleDiv.appendChild(projectTitleH1Tag);
    }

    _addProjectTitleDiv(project, projectDiv){
        const projectTitleDiv = document.createElement("div");
        projectTitleDiv.classList.add("project-title");
    
        this._addProjectTitleH1Tag(project, projectTitleDiv)
        this._addEditIcon(projectTitleDiv);
    
        projectDiv.appendChild(projectTitleDiv);
    }

    _addProjectDetailsSubDiv(project, projectDetailsDiv, innerText, attr){
        const projectPriorityDiv = document.createElement("div");
        projectPriorityDiv.classList.add("project-details-sub");
        projectPriorityDiv.classList.add(attr);
    
        const projectPriorityH2TitleTag = document.createElement("h2");
        projectPriorityH2TitleTag.innerText = innerText;
    
        const projectPriorityH2EntryTag = document.createElement("h2");
        projectPriorityH2EntryTag.innerText = project[attr];
    
        projectPriorityDiv.appendChild(projectPriorityH2TitleTag)
        projectPriorityDiv.appendChild(projectPriorityH2EntryTag)
    
        projectDetailsDiv.appendChild(projectPriorityDiv);
    }

    _addProjectDetailsDiv(project, projectDiv){
        const projectDetailsDiv = document.createElement("div");
        projectDetailsDiv.classList.add("project-details");

        this._addProjectDetailsSubDiv(project, projectDetailsDiv, "Deadline", "dueDate")
        this._addProjectDetailsSubDiv(project, projectDetailsDiv, "Priority", "priority")
    
        projectDiv.appendChild(projectDetailsDiv);
    }

    _addProjectDetails(project, projectDiv){
        this._addProjectTitleDiv(project, projectDiv)
        this._addProjectDetailsDiv(project, projectDiv)
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

export {TasksPageLoader, DisplayController}