import {Projects, ToDos} from './modules/projects';
import Settings from './modules/settings';
import ProjectsStorage from './modules/storage';

const desc1 = "Create ToDo Class description";
const listSort = "dueDateEarliestFirst";

const myProjectsStorage = new ProjectsStorage(false, true);
const list = myProjectsStorage.getStorage();

const mySettings = new Settings("", "", "", "");
const myProjects = new Projects(myProjectsStorage, mySettings.projectViewProjectSortPref);
const myToDos = new ToDos(mySettings.projectViewToDoSortPref, myProjects)

if (list.length === 0){

myProjects.addProject("My Project", "lol", 4, new Date(2020,11,6), listSort)

myProjects.addToDoToLatestProject("Create ToDo Class1", desc1, 5, new Date(2020,11,6))
myProjects.addToDoToLatestProject("Create ToDo Class2", "sss", 5, new Date(2021,0));
myProjects.addToDoToLatestProject("Create ToDo Class3", "", 1, new Date(2021,11,2));
myProjects.addToDoToLatestProject("Hi", "", "", new Date());

myProjects.addProject("My Project2", "lasdol", 2, new Date(2020,11,9), listSort);
myProjects.addToDoToLatestProject("Hsadi", "ss1", 2, new Date(2021,11,2));

myProjects.addToDoToProject("","Hsadi", "ss", 2, "");

myProjects.addProject("My Project2", "lasdol1", 2, new Date(2020,11,13), listSort)

myProjects.addProject("My Project2", "lasdol2", 2, new Date(2020,11,3), listSort)
myProjects.addProject("My Project2", "lasdol3", 2, new Date(2021,11,3), listSort)
myProjects.addProject("My Project2", "lasdol4", 2, new Date(2021,0,1), listSort)
}

window.b = myProjects;

console.log(myProjects);
console.log(myProjects.getList());
console.log(myToDos.getList());

myProjects._list.forEach(project => console.log(project.dueDate))
console.log("gap")
myToDos._list.forEach(project => console.log(project.dueDate))