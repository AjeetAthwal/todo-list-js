import Projects from './modules/projects';

const desc1 = "Create ToDo Class description";

const myProjects = new Projects("dueDateEarliestFirst", "dueDateEarliestFirst");

myProjects.addProject("My Project", "lol", 4, new Date(2020,11,6))

myProjects.addToDoToLatestProject("Create ToDo Class1", desc1, 5, new Date(2020,11,6))
myProjects.addToDoToLatestProject("Create ToDo Class2", "sss", 5, new Date(2021,0));
myProjects.addToDoToLatestProject("Create ToDo Class3", "", 1, new Date(2021,11,2));
myProjects.addToDoToLatestProject("Hi", "", "", new Date());

myProjects.addProject("My Project2", "lasdol", 2, new Date(2020,11,9))
myProjects.addToDoToLatestProject("Hsadi", "ss1", 2, new Date(2021,11,2));



window.b = myProjects;

myProjects.addToDoToProject("","Hsadi", "ss", 2, "");

myProjects.addProject("My Project2", "lasdol1", 2, new Date(2020,11,13))

myProjects.addProject("My Project2", "lasdol2", 2, new Date(2020,11,3))
myProjects.addProject("My Project2", "lasdol3", 2, new Date(2021,11,3))
myProjects.addProject("My Project2", "lasdol4", 2, new Date(2021,0,1))

console.log(myProjects);
console.log(myProjects.getList());
console.log(myProjects.getToDoList());

myProjects._list.forEach(project => console.log(project.dueDate))
console.log("gap")
myProjects._toDoList.forEach(project => console.log(project.dueDate))

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