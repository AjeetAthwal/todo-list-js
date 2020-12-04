import {Projects, ToDos} from './modules/projects';
import Settings from './modules/settings';
import ProjectsStorage from './modules/storage';
import defaultEntry from './modules/defaultEntry'

const mySettingsStorage = ""
const myProjectsStorage = new ProjectsStorage(false, true, defaultEntry);
const mySettings = new Settings(mySettingsStorage, "", "", "", "");
const myProjects = new Projects(myProjectsStorage, mySettings);
const myToDos = new ToDos(mySettings, myProjects)

console.log(myProjects);
console.log(myProjects.getList());
console.log(myToDos.getList());

window.mySettings = mySettings;
window.myProjects = myProjects;
window.myToDos = myToDos;