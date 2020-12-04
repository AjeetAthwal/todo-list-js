class Settings{
    constructor(view, toDoViewSortPref, projectViewProjectSortPref, projectViewToDoSortPref){
        this.defaultListSort = "dueDateEarliestFirst";  // dummy value see setter
        this.defaultSortView = "project";
        this.view = view;
        this.toDoViewSortPref = toDoViewSortPref;
        this.projectViewProjectSortPref = projectViewProjectSortPref;
        this.projectViewToDoSortPref = projectViewToDoSortPref;
    }

    set defaultListSort(listSort){
        this._defaultListSort = "dueDateEarliestFirst";
    }

    set defaultSortView(view){
        this._defaultSortView = "project";
    }

    _isNotSortValue(listSort){
        return listSort !== "dueDateEarliestFirst" && listSort !== "dueDateOldestFirst" &&
        listSort !== "highestPriorityFirst" && listSort !== "lowestPriorityFirst" &&
        listSort !== "oldestFirst" && listSort !== "newestFirst";
    }

    get view(){
        return this._view;
    }

    set view(view){
        if (view !== "todo" && view !== "project") this._view = this._defaultSortView;
        else this._view = view;
    }

    get toDoViewSortPref(){
        return this._toDoViewSortPref;
    }

    set toDoViewSortPref(newListSort){
        if (this._isNotSortValue(newListSort)) this._toDoViewSortPref = this._defaultListSort;
        else this._toDoViewSortPref = newListSort;
    }

    get projectViewProjectSortPref(){
        return this._projectViewProjectSortPref;
    }

    set projectViewProjectSortPref(newListSort){
        if (this._isNotSortValue(newListSort)) this._projectViewProjectSortPref = this._defaultListSort;
        else this._projectViewProjectSortPref = newListSort;
    }

    get projectViewToDoSortPref(){
        return this._projectViewToDoSortPref;
    }

    set projectViewToDoSortPref(newListSort){
        if (this._isNotSortValue(newListSort)) this._projectViewToDoSortPref = this._defaultListSort;
        else this._projectViewToDoSortPref = newListSort;
    }
}

export default Settings;