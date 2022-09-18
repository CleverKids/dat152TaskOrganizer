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

    #createHTML() {
        const wrapper = document.createElement('div');

        const content = `
        <table id = "tasktable">
         <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Status</th>
            <th></th>
            <th></th>
         </tr>

        </table>
        `
        wrapper.insertAdjacentHTML('beforeend',content);
        this.#shadow.appendChild(wrapper);

        return wrapper;
    }

    showTask(newtask){
        const table = this.#shadow.getElementById("tasktable");
        const row = table.insertRow(1);
        const statusOptions= `<select>
                            <option value="" selected disabled hidden>Modify</option>
                            <option>${this.#statuses[0]}</option>
                            <option>${this.#statuses[1]}</option>
                            <option>${this.#statuses[2]}</option>
                        </select>`;
        const remove = `<button id=newtask.id>Remove</button>`;


        var idRow = row.insertCell(0);
        var titleRow = row.insertCell(1);
        var statusRow = row.insertCell(2);
        var modifyRow = row.insertCell(3);
        var buttonRow = row.insertCell(4);

        idRow.innerHTML = newtask.id;
        titleRow.innerHTML = newtask.title;
        statusRow.innerHTML = newtask.status;
        modifyRow.innerHTML = statusOptions;
        buttonRow.innerHTML = remove;

    }


    
//    #updateTask(status){
//        const content = this.#shadow.querySelector('div')
//    }
//    
//    #removeTask(id){
//        
//    }
//    
    setStatuseslist(statuslist){
        this.#statuses = statuslist.allstatuses;
    }
//    
//    #enableaddtask(){
//        
//    }
//    
//    #addtaskCallback(){
//        
//    }
//    
//    #changestatusCallback(id, newstatus){
//        
//    }
//    
//    #deletetaskCallback(id){
//
//    }
//    
//    #noTask(){
//        
//    }
}