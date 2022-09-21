export default class extends HTMLElement {
    #shadow;
    #callbacks = new Map();
    #callbackId = 0;
    #addcallbackId = 0;
    #changecallbackId = 0;
    #deletecallbackId = 0;
    #statuses;

    constructor(){
        super();

        this.#shadow = this.attachShadow({mode: 'open'});
        this.#createHTML();
        console.log("hei TaskList");
    }

    setDeleteTaskHandler(method) {
        this.#callbacks.set(this.#callbackId, method);
        const prevId = this.#callbackId;
        ++this.#callbackId;
        this.#deletecallbackId = prevId;
        return prevId;
    }

    setNewTaskHandler(method) {
        this.#callbacks.set(this.#callbackId, method);
        const prevId = this.#callbackId;
        ++this.#callbackId;
        this.#addcallbackId = prevId;
        return prevId;
    }

    setUpdateTaskHandler(method) {
        this.#callbacks.set(this.#callbackId, method);
        const prevId = this.#callbackId;
        ++this.#callbackId;
        this.#changecallbackId = prevId;
        return prevId;
    }

    #createHTML() {
        const wrapper = document.createElement('div');

        const content = `
        <H1>Tasks</H1>
         <p>
            Waiting for server data
        </p>
        <button type="button" id="addTaskBtn" disabled>New task</button>
        `
        wrapper.insertAdjacentHTML('beforeend',content);
        this.#shadow.appendChild(wrapper);

        return wrapper;
    }

    showTask(newtask){
        const table = this.#shadow.getElementById("tasktable");
        const row = table.insertRow(1);


        const remove = document.createElement("button");
        //    `<button id=newtask.id>Remove</button>`;
            remove.textContent = "Remove";
            remove.id = newtask.id;

        //    const tempRemove = this.deletetaskCallback;
            remove.addEventListener('click',() => {this.deletetaskCallback(newtask.id)});
        const statusOptions = document.createElement("select");
        statusOptions.id = newtask.id;

        const opt0 = document.createElement("option");
        const opt1 = document.createElement("option");
        const opt2 = document.createElement("option");
        const opt3 = document.createElement("option");

        opt0.text= "Modify";
        opt1.text = this.#statuses[0];
        opt2.text = this.#statuses[1];
        opt3.text = this.#statuses[2];

        opt0.disabled = true;
        opt0.hidden = true;
        opt0.selected = true;

        console.log(`${newtask.id}`);
        console.log(`${this.#statuses[0]}`);

        const tempStatuses = this.#statuses;
        const change = this.changestatusCallback;

    //    opt1.addEventListener(`click`, () => this.changestatusCallback(newtask.id,this.#statuses[0]));
    //    opt2.addEventListener(`click`, () => this.changestatusCallback(newtask.id,this.#statuses[1]));
    //    opt3.addEventListener(`click`,() => this.changestatusCallback(newtask.id,this.#statuses[2]));

        statusOptions.add(opt0);
        statusOptions.add(opt1);
        statusOptions.add(opt2);
        statusOptions.add(opt3);

        statusOptions.addEventListener('change',
            () => this.changestatusCallback(newtask.id,
                statusOptions.options[statusOptions.selectedIndex].text));

        const idColumn = row.insertCell(0);
        const titleColumn= row.insertCell(1);
        const statusColumn = row.insertCell(2);
        const modifyColumn = row.insertCell(3);
        const buttonColumn = row.insertCell(4);

        idColumn.textContent = newtask.id;
        idColumn.hidden = true;
        titleColumn.textContent = newtask.title;
        statusColumn.textContent= newtask.status;
        modifyColumn.append(statusOptions);
        buttonColumn.append(remove);
    }

    updateTask(status){
        const id = status.id;
        const newStatus = status.status;
        if (table.rows.length > 1){
            for (var i=1;i<table.rows.length;i++){
                if (table.rows[i].cells[0].innerHTML == id){
                    table.rows[i].cells[2].innerHTML = newStatus;
                    break;
                }
            }
        }
    }

    removeTask(id){

        const table = this.#shadow.getElementById("tasktable");
        if (table.rows.length > 1){
            var row_remove = 0,found = 0;

            for (var i=1;i<table.rows.length;i++){
                if (table.rows[i].cells[0].innerHTML == id){
                    row_remove = i;
                    found = 1;
                    break;
                }
            }

            if(found){
                table.deleteRow(row_remove);
                console.log('--for testing-- task with id = ['+id+'] was removed');
            }
            else{
                console.log('task with id = ['+id+'] not found');
            }
        }
    }

    setStatuseslist(statuslist){
        this.#statuses = statuslist.allstatuses;
    }

   enableaddtask(){
       const wrapper = document.createElement('div');
       const content = `
        <form id="taskForm" name = "taskForm">
        <table id = "tasktable">
         <tr>
            <th>Task</th>
            <th>Status</th>
            <th></th>
            <th></th>
         </tr>
        </table>
        </form>
        `
       wrapper.insertAdjacentHTML('beforeend',content);
       this.#shadow.appendChild(wrapper);

       const button = this.#shadow.getElementById("addTaskBtn");
       console.log("heiBox");
       console.log(button);
       button.disabled = false;
       button.addEventListener('click', this.addtaskCallback.bind(this));
   }

    addtaskCallback(event){
        console.log("opening taskbox");
        event.preventDefault();
        this.message = "";

        const met = this.#callbacks.get(this.#addcallbackId);
        met();
        //    this.#callbacks.forEach(method => { method() });

    }

    changestatusCallback(id,newstatus){
        console.log("status change hei");
        const newstatusJSON = {};
        newstatusJSON.status = newstatus;

        const table = this.#shadow.getElementById("tasktable");
        if (table.rows.length > 1){
            var row_find = 0,found = 0;

            for (var i=1;i<table.rows.length;i++){
                if (table.rows[i].cells[0].innerHTML == id){
                    row_find = i;
                    found = 1;
                    break;
                }
            }

            if(found){
                if(confirm("Set \"" + table.rows[row_find].cells[1].innerHTML + "\" to " + newstatus )) {
                    const met = this.#callbacks.get(this.#changecallbackId);
                    met(id, newstatusJSON);
                    console.log("confirmed");
                }
            }
        }


    }

    deletetaskCallback(id){
        console.log("deleting: ?");
        console.log("deleting: " + id);

        const table = this.#shadow.getElementById("tasktable");
        if (table.rows.length > 1){
            var row_find = 0,found = 0;

            for (var i=1;i<table.rows.length;i++){
                if (table.rows[i].cells[0].innerHTML == id){
                    row_find = i;
                    found = 1;
                    break;
                }
            }

            if(found){
                if(confirm("Delete task \'" + table.rows[row_find].cells[1].innerHTML + "\'?")) {
                    const met = this.#callbacks.get(this.#deletecallbackId);
                    met(id);
                    console.log("confirmed");
                }
            }
        }

    }

    noTask() {

        const form = this.#shadow.getElementById("tasktable");
        form.parentNode.removeChild(form);

        this.#shadow.getElementById("taskForm").innerHTML = '<p>No tasks were found.</p>';
    }
}
