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

const projectsDiv = document.querySelector("#projects");

function buildProjectCards(myProjects){
    console.log(myProjects)
    myProjects.getList().forEach(project => buildProjectCard(project))
}

function buildProjectCard(project){
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    
    addProjectSubDivs(project, projectDiv);

    projectDiv.dataset.projectId = project.id;
    projectsDiv.appendChild(projectDiv);
}

function addProjectSubDivs(project, projectDiv){
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

    const projectTodosDiv = document.createElement("div");
    projectTodosDiv.classList.add("todos");

    project.getList().forEach(todo => addToDoDiv(todo, projectTodosDiv))

    const projectExpandDiv = document.createElement("div");
    projectExpandDiv.classList.add("expand");

    const projectExpandATag = document.createElement("a");
    projectExpandATag.innerText = "Expand";

    projectExpandDiv.appendChild(projectExpandATag);

    projectDiv.appendChild(projectTitleDiv);
    projectDiv.appendChild(projectDetailsDiv);
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

buildProjectCards(myProjects)