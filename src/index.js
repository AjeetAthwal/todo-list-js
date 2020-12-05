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



function buildProjectCards(myProjects, mainDiv){
    const projectsDiv = document.createElement("div");
    projectsDiv.id = "projects"
    myProjects.getList().forEach(project => buildProjectCard(project, projectsDiv))
    mainDiv.appendChild(projectsDiv)
}

function buildProjectCard(project, projectsDiv){
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    
    addProjectSubDivs(project, projectDiv);

    projectDiv.dataset.projectId = project.id;
    projectsDiv.appendChild(projectDiv);
}

function addProjectSubDivs(project, projectDiv){

    addProjectDetails(project, projectDiv);

    const projectTodosDiv = document.createElement("div");
    projectTodosDiv.classList.add("todos");

    project.getList().forEach(todo => addToDoDiv(todo, projectTodosDiv))

    const projectExpandDiv = document.createElement("div");
    projectExpandDiv.classList.add("expand");

    const projectExpandATag = document.createElement("a");
    projectExpandATag.innerText = "Expand";

    projectExpandDiv.appendChild(projectExpandATag);

    projectDiv.appendChild(projectTodosDiv);
    projectDiv.appendChild(projectExpandDiv);
}

function addToDoDiv(todo, todosDiv){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const projectToDoH3TitleTag = document.createElement("h3");
    projectToDoH3TitleTag.innerText = todo.title;

    todoDiv.appendChild(projectToDoH3TitleTag);

    todoDiv.dataset.todoId = todo.id;
    todoDiv.dataset.projectId = todo.projectId;
    todosDiv.appendChild(todoDiv)
}

function addProjectDetails(project, projectDiv){
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

function addHeaderItems(){
    const headerTag = document.createElement("header");
    const ulTag = document.createElement("ul");
    ulTag.id = "nav"
    const tasksLiTag = document.createElement("li")
    tasksLiTag.classList.add("active");
    const tasksATag = document.createElement("a")
    tasksATag.innerText = "Tasks";

    tasksLiTag.appendChild(tasksATag);

    const settingsLiTag = document.createElement("li")
    const settingsATag = document.createElement("a")
    settingsATag.innerText = "Settings";

    tasksLiTag.appendChild(tasksATag);
    settingsLiTag.appendChild(settingsATag);

    ulTag.appendChild(tasksLiTag);
    ulTag.appendChild(settingsLiTag);

    headerTag.appendChild(ulTag);

    document.querySelector("body").appendChild(headerTag)
}

function addFooterItems(){
    const footerTag = document.createElement("footer");
    const aTag = document.createElement("a")
    aTag.innerText = "Back To Top";

    footerTag.appendChild(aTag);

    document.querySelector("body").appendChild(footerTag)
}

function createContainer(){
    const mainDiv = document.createElement("div")
    mainDiv.id = "container";
    document.querySelector("body").appendChild(mainDiv)
    return mainDiv
}

addHeaderItems();
const mainDiv = createContainer();
addFooterItems();

buildProjectCards(myProjects, mainDiv)