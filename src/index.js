import { format } from 'date-fns';
import Projects from './modules/projects';

const desc1 = "Create ToDo Class description";

const myProjects = new Projects("dueDateEarliestFirst", "dueDateEarliestFirst");

myProjects.addProject("My Project", "lol", 4, new Date(2020,11,6))

myProjects.addToDoToLatestProject("Create ToDo Class", desc1, 5, new Date(2020,11,6))
myProjects.addToDoToLatestProject("Create ToDo Class", "", 5, new Date(2021,0));
myProjects.addToDoToLatestProject("Create ToDo Class", "", 1, new Date(2021));
myProjects.addToDoToLatestProject("Hi", "", "", new Date());

myProjects.addProject("My Project2", "lasdol", 2, new Date(2020,11,9))
myProjects.addToDoToLatestProject("Hsadi", "ss", 2, new Date(2021));



window.b = myProjects;

myProjects.addToDoToProject("","Hsadi", "ss", 2, new Date(2021));

console.log(myProjects);
console.log(myProjects.getList());
console.log(myProjects.getToDoList());

// function compareDueDate(first, second){
//     if (first.dueDate === second.dueDate) return 0;
//     if (first.dueDate === "") return 1;
//     if (second.dueDate === "") return -1;
//     if (first.dueDate < second.dueDate) return -1;
//     else return 1;
// }

// function comparePriority(first, second){
//     if (first.priority === second.priority) return 0;
//     if (first.priority < second.priority) return -1;
//     else return 1;
// }

// function compareCreationDate(first, second){
//     if (first.creationDatetime === second.creationDatetime) return 0;
//     if (first.creationDatetime < second.creationDatetime) return -1;
//     else return 1;
// }

// myProjects._list.sort(compareDueDate) // earliest first

// console.log(myProjects);
// console.log(myProjects.getList());
// console.log(myProjects.getToDoList());

// myProjects._list.sort(compareDueDate).reverse() // oldest first

// console.log(myProjects);
// console.log(myProjects.getList());
// console.log(myProjects.getToDoList());

// myProjects._list.sort(comparePriority)  // lower priority number first (ie highest priority)

// console.log(myProjects);
// console.log(myProjects.getList());
// console.log(myProjects.getToDoList());

// myProjects._list.sort(comparePriority).reverse()   // higher priority number first (ie lowest priority)

// console.log(myProjects);
// console.log(myProjects.getList());
// console.log(myProjects.getToDoList());

// myProjects._list.sort(compareCreationDate) // oldest first

// console.log(myProjects);
// console.log(myProjects.getList());
// console.log(myProjects.getToDoList());

// myProjects._list.sort(compareCreationDate).reverse() // newest first

// console.log(myProjects);
// console.log(myProjects.getList());
// console.log(myProjects.getToDoList());