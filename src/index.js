import {Projects, ToDos} from './modules/projects';
import Settings from './modules/settings';
import {ProjectsStorage, SettingsStorage} from './modules/storage';
import {defaultProjectsEntry, defaultSettingsEntry} from './modules/defaultEntry'
import {NewCardLoader, NewTaskLoader, ProjectCardTaskLoader, ProjectCardTasksLoader, ProjectCardExpandLoader, ProjectCardsLoader, CardsLoader, SortFormLoader, TasksPageLoader, DisplayController} from './modules/displayController'

const serverStorageExists = false;
const localStorageExists = true;

const mySettingsStorage = new SettingsStorage(serverStorageExists, localStorageExists, defaultSettingsEntry);
const myProjectsStorage = new ProjectsStorage(serverStorageExists, localStorageExists, defaultProjectsEntry);

const mySettings = new Settings(mySettingsStorage, "", "", "", "");
const myProjects = new Projects(myProjectsStorage, mySettings);
const myToDos = new ToDos(mySettings, myProjects)

console.log(myProjects);
console.log(myProjects.getList());
console.log(myToDos.getList());

const newCardLoader = new NewCardLoader(myProjects)

const projectCardExpandLoader = new ProjectCardExpandLoader(myProjects)

const newTaskLoader = new NewTaskLoader(myProjects)
const projectCardTaskLoader = new ProjectCardTaskLoader(myProjects)
const projectCardTasksLoader = new ProjectCardTasksLoader(myProjects, projectCardTaskLoader, newTaskLoader)
const projectCardsLoader = new ProjectCardsLoader(myProjects, projectCardTasksLoader, projectCardExpandLoader)

const cardsLoader = new CardsLoader(myProjects, newCardLoader, projectCardsLoader)

const sortFormLoader = new SortFormLoader(myProjects)

const tasksPageLoader = new TasksPageLoader(myProjects, sortFormLoader, cardsLoader)

const displayController = new DisplayController(tasksPageLoader)