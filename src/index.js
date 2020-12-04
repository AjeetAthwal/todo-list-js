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

window.mySettings = mySettings;
window.myProjects = myProjects;
window.myToDos = myToDos;

const mySettingsStorage2 = new SettingsStorage(false, true, "");
window.a = mySettingsStorage2;