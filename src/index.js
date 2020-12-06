import {Projects, ToDos} from './modules/projects';
import Settings from './modules/settings';
import {ProjectsStorage, SettingsStorage} from './modules/storage';
import {defaultProjectsEntry, defaultSettingsEntry} from './modules/defaultEntry'

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
    }

    buildProjectCards(mainDiv){
        this.projectsDiv = document.createElement("div");
        this.projectsDiv.id = "projects"
        this.myProjects.getList().forEach(project => this._buildProjectCard(project))
        mainDiv.appendChild(this.projectsDiv)
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

        this._createHtmlSkeleton();
        this.loadTasksPage();
    }

    loadTasksPage(){
        this.tasksLiTag.classList.add("active");
        this.tasksPage.buildProjectCards(this.mainDiv)
    }

    loadSettingsPage(){
        this.settingsLiTag.classList.add("active");
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