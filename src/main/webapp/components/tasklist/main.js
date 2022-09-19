export default class extends HTMLElement {
    #shadow;
    #callbacks = new Map();
    #callbackId = 0;
    #statuses;
    
    constructor(){
        super();
        
        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#createHTML();
        console.log("hei TaskList");
//        const newtask = {
//            "id": 5,
//            "title": "Do DAT152 homework",
//            "status": "ACTIVE"
//        };
//        this.#showTask(newtask);
//        
//        const status = {
//            "id": 1,
//            "status": "ACTIVE"
//        };
//        this.#updateTask(status);

    }

    setDeleteTaskHandler(method) {
        this.#callbacks.set(this.#callbackId, method);
        const prevId = this.#callbackId;
        ++this.#callbackId;
        return prevId;
    }

    setNewTaskHandler(method) {
        this.#callbacks.set(this.#callbackId, method);
        const prevId = this.#callbackId;
        ++this.#callbackId;
        return prevId;
    }

    setUpdateTaskHandler(method) {
        this.#callbacks.set(this.#callbackId, method);
        const prevId = this.#callbackId;
        ++this.#callbackId;
        return prevId;
    }

    #createHTML() {
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

        return wrapper;
    }

    showTask(newtask){
        const table = this.#shadow.getElementById("tasktable");
        const row = table.insertRow(1);
      /*  const statusOptions= `<select>
                            <option value="" selected disabled hidden>Modify</option>
                            <option>${this.#statuses[0]}</option>
                            <option>${this.#statuses[1]}</option>
                            <option>${this.#statuses[2]}</option>
                        </select>`;*/

        const remove = document.createElement("button");
        //    `<button id=newtask.id>Remove</button>`;
            remove.innerText = "Remove";
            remove.id = newtask.id;

        const statusOptions = document.createElement("select");
        statusOptions.id = newtask.id;
        
        statusOptions.addEventListener(`change`, this.changestatusCallback.bind(this))

        statusOptions.add(new Option("Modify","",true,true));
        statusOptions.add(new Option(`${this.#statuses[0]}`,`${newtask.id},${this.#statuses[0]}`,false,false));
        statusOptions.add(new Option(`${this.#statuses[1]}`,`${newtask.id},${this.#statuses[1]}`,false,false));
        statusOptions.add(new Option(`${this.#statuses[2]}`,`${newtask.id},${this.#statuses[2]}`,false,false));


        const idRow = row.insertCell(0);
        const titleRow = row.insertCell(1);
        const statusRow = row.insertCell(2);
        const modifyRow = row.insertCell(3);
        const buttonRow = row.insertCell(4);


        idRow.textContent = newtask.id;
        idRow.hidden = true;
        titleRow.textContent = newtask.title;
        statusRow.textContent= newtask.status;
        modifyRow.append(statusOptions);
        buttonRow.append(remove);

    }


    
   #updateTask(status){
        const content = this.#shadow.querySelector('div')
    }
//    
//    #removeTask(id){
//        
//    }
//    
    setStatuseslist(statuslist){
        this.#statuses = statuslist.allstatuses;
    }

   enableaddtask(){
       const button = document.querySelector("button");
       console.log("heiBox");
       console.log(button);
       button.addEventListener('click', this.addtaskCallback.bind(this));
   }

    addtaskCallback(event){

        event.preventDefault();
        this.message = "";

        const id = event.target.id;
        const value = event.target.value;


        if (window.confirm("Set " +  id + " to " + value + " ?")) {
            this.#callbacks.forEach(method => { method() });
        }

    }
//    
    changestatusCallback(id, newstatus){

    }
//    
//    #deletetaskCallback(id){
//
//    }
//    
//    #noTask(){
//        
//    }
}