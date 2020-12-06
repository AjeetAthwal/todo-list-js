import {Projects, ToDos} from './modules/projects';
import Settings from './modules/settings';
import {ProjectsStorage, SettingsStorage} from './modules/storage';
import {defaultProjectsEntry, defaultSettingsEntry} from './modules/defaultEntry'
import { formatRFC3339WithOptions } from 'date-fns/fp';

const mySettingsStorage = new SettingsStorage(false, true, defaultSettingsEntry);
const myProjectsStorage = new ProjectsStorage(false, true, defaultProjectsEntry);
const mySettings = new Settings(mySettingsStorage, "", "", "", "");
const myProjects = new Projects(myProjectsStorage, mySettings);
const myToDos = new ToDos(mySettings, myProjects)

console.log(myProjects);
console.log(myProjects.getList());
console.log(myToDos.getList());

// build project cards

class TasksPageLoader{
    constructor(myProjects){
        this.myProjects = myProjects;
        this.mainDiv = ""
        this.update = this.update.bind(this)
    }

    buildProjectCards(){

        this.projectsDiv = document.createElement("div");
        this.projectsDiv.id = "projects"
        this.myProjects.getList().forEach(project => this._buildProjectCard(project))
        this.mainDiv.appendChild(this.projectsDiv)
    }
    
    update(e){
        this.myProjects.updateSort(e.target.value)
        this.deleteProjectsContainer();
        this.buildProjectCards();
    }

    deleteProjectsContainer(){
        this.mainDiv.removeChild(this.projectsDiv);
    }

    buildPage(mainDiv){
        this.mainDiv = mainDiv

        this._buildSortForm();
        this.buildProjectCards();
    }

    _buildSortForm(){
        this.sortDiv = document.createElement("div")
        this.sortDiv.classList = "sort"
        this.sortForm = document.createElement("form")
        this.sortFormLabel = document.createElement("label")
        this.sortFormLabel.htmlFor = "view";
        this.sortFormLabel.innerText = "Sort: "
        this.sortFormSelect = document.createElement("select")
        this.sortFormSelect.id = "view";
        this.sortFormSelect.name = "view";

        this.selectDueDateEarliestOption = document.createElement("option")
        this.selectDueDateEarliestOption.value = "dueDateEarliestFirst"
        this.selectDueDateEarliestOption.innerText = "Most Recent Deadline"

        this.selectDueDateLatestOption = document.createElement("option")
        this.selectDueDateLatestOption.value = "dueDateOldestFirst"
        this.selectDueDateLatestOption.innerText = "Farthest Deadline"

        this.selectHighestPriorityFirstOption = document.createElement("option")
        this.selectHighestPriorityFirstOption.value = "highestPriorityFirst"
        this.selectHighestPriorityFirstOption.innerText = "Highest Priority"

        this.selectLowestPriorityFirstOption = document.createElement("option")
        this.selectLowestPriorityFirstOption.value = "lowestPriorityFirst"
        this.selectLowestPriorityFirstOption.innerText = "Lowest Priority"

        this.selectOldestCreatedOption = document.createElement("option")
        this.selectOldestCreatedOption.value = "oldestFirst"
        this.selectOldestCreatedOption.innerText = "Oldest Created"

        this.selectNewestCreatedOption = document.createElement("option")
        this.selectNewestCreatedOption.value = "newestFirst"
        this.selectNewestCreatedOption.innerText = "Most Recent Created"

        this.sortFormSelect.appendChild(this.selectDueDateEarliestOption)
        this.sortFormSelect.appendChild(this.selectDueDateLatestOption)
        this.sortFormSelect.appendChild(this.selectHighestPriorityFirstOption)
        this.sortFormSelect.appendChild(this.selectLowestPriorityFirstOption)
        this.sortFormSelect.appendChild(this.selectOldestCreatedOption)
        this.sortFormSelect.appendChild(this.selectNewestCreatedOption)

        this.sortFormSelect.addEventListener("change", this.update)

        this.sortForm.appendChild(this.sortFormLabel);
        this.sortForm.appendChild(this.sortFormSelect);
        this.sortDiv.appendChild(this.sortForm)
        this.mainDiv.appendChild(this.sortDiv)
    }

    _buildProjectCard(project){
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        
        this._addProjectSubDivs(project, projectDiv);
    
        projectDiv.dataset.projectId = project.id;
        this.projectsDiv.appendChild(projectDiv);
    }
    
    _addProjectSubDivs(project, projectDiv){
    
        this._addProjectDetails(project, projectDiv);
    
        const projectTodosDiv = document.createElement("div");
        projectTodosDiv.classList.add("todos");
    
        project.getList().forEach(todo => this._addToDoDiv(todo, projectTodosDiv))
    
        const projectExpandDiv = document.createElement("div");
        projectExpandDiv.classList.add("expand");
    
        const projectExpandATag = document.createElement("a");
        projectExpandATag.innerText = "Expand";
    
        projectExpandDiv.appendChild(projectExpandATag);
    
        projectDiv.appendChild(projectTodosDiv);
        projectDiv.appendChild(projectExpandDiv);
    }
    
    _addToDoDiv(todo, todosDiv){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        const projectToDoH3TitleTag = document.createElement("h3");
        projectToDoH3TitleTag.innerText = todo.title;
    
        todoDiv.appendChild(projectToDoH3TitleTag);
    
        todoDiv.dataset.todoId = todo.id;
        todoDiv.dataset.projectId = todo.projectId;
        todosDiv.appendChild(todoDiv)
    }
    
    _addProjectDetails(project, projectDiv){
        const projectTitleDiv = document.createElement("div");
        projectTitleDiv.classList.add("project-title");
    
        const projectTitleH1Tag = document.createElement("h1");
        projectTitleH1Tag.innerText = project.title;
    
        projectTitleDiv.appendChild(projectTitleH1Tag);
    
        const projectDetailsDiv = document.createElement("div");
        projectDetailsDiv.classList.add("project-details");
    
        const projectDueDateDiv = document.createElement("div");
        projectDueDateDiv.classList.add("project-details-sub");
        projectDueDateDiv.classList.add("dueDate");
    
        projectDiv.appendChild(projectTitleDiv);
        projectDiv.appendChild(projectDetailsDiv);
    
        const projectDueDateH2TitleTag = document.createElement("h2");
        projectDueDateH2TitleTag.innerText = "Deadline";
    
        const projectDueDateH2EntryTag = document.createElement("h2");
        projectDueDateH2EntryTag.innerText = project.dueDate;
    
        projectDueDateDiv.appendChild(projectDueDateH2TitleTag)
        projectDueDateDiv.appendChild(projectDueDateH2EntryTag)
    
        const projectPriorityDiv = document.createElement("div");
        projectPriorityDiv.classList.add("project-details-sub");
        projectPriorityDiv.classList.add("priority");
    
        const projectPriorityH2TitleTag = document.createElement("h2");
        projectPriorityH2TitleTag.innerText = "Priority";
    
        const projectPriorityH2EntryTag = document.createElement("h2");
        projectPriorityH2EntryTag.innerText = project.priority;
    
        projectPriorityDiv.appendChild(projectPriorityH2TitleTag)
        projectPriorityDiv.appendChild(projectPriorityH2EntryTag)
    
        projectDetailsDiv.appendChild(projectDueDateDiv);
        projectDetailsDiv.appendChild(projectPriorityDiv);
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
        console.log("1")
        this.deleteContainer();
        this.tasksLiTag.classList.add("active");
        this.settingsLiTag.classList.remove("active");
        this.settingsLiTag.addEventListener("click", this.loadSettingsPage)
        this.tasksLiTag.removeEventListener("click", this.loadTasksPage)
        this.tasksPage.buildPage(this.mainDiv)
    }

    loadSettingsPage(){
        console.log("2")
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

const tasksPageLoader = new TasksPageLoader(myProjects)
const displayController = new DisplayController(tasksPageLoader)