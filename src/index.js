import { format } from 'date-fns';
import Projects from './modules/projects';

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