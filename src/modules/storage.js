class Storage{
    constructor(serverStorage, localStorage, defaultEntry){
        this._serverStorageWanted =  serverStorage;
        this._localStorageWanted = localStorage;
        this.storageName = "";
        this.defaultEntry = defaultEntry;
    }

    set storageName(name){
        this._storageName = "";
    }
    _storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }        

    _updateLocalStorage(information){
        if (this._storageAvailable("localStorage")){
            localStorage.setItem(this._storageName, JSON.stringify(information));
        }
    }

    _updateServerStorage(information){
        //
        return;
    }

    _getLocalStorage(){

    }

    _getServerStorage(){
        //
        return;
    }

    updateStorage(information){
        if (this._serverStorageWanted) this._updateServerStorage(information);
        else if (this._localStorageWanted) this._updateLocalStorage(information);
    }

    getStorage(){
        if (this._serverStorageWanted) return this._getServerStorage();
        else if (this._localStorageWanted) {
            return this._getLocalStorage();}
    }
}

class ProjectsStorage extends Storage{
    constructor(serverStorage, localStorage, projects){
        super(serverStorage, localStorage, projects);
        this.storageName = "";
    }

    set storageName(name){
        this._storageName = "myProjects"
    }

    _getLocalStorage(){
        if (this._storageAvailable("localStorage")){
            const newProjects = JSON.parse(localStorage.getItem(this._storageName));
            if (newProjects === null) return this.defaultEntry;
            return newProjects;
        }
        return [];
    }
}

export default ProjectsStorage;