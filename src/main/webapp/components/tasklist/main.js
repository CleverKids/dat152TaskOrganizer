export default class extends HTMLElement {
    #shadow;
    #callbacks = new Map();
    #callbackId = 0;
    #statuses;
    
    constructor(){
        super();
        
        this.#shadow = this.attachShadow({mode: 'open'});
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

//        const f = confirm("ff");
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
            remove.textContent = "Remove";
            remove.id = newtask.id;

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



/*        opt0.value= "";
        opt1.value = `${this.#statuses[0]}`,`${newtask.id},${this.#statuses[0]}`;
        opt1.value = `${this.#statuses[0]}`,`${newtask.id},${this.#statuses[0]}`;
        opt1.value = `${this.#statuses[0]}`,`${newtask.id},${this.#statuses[0]}`;
*/
        console.log(`${newtask.id}`);
        console.log(`${this.#statuses[0]}`);

        const tempStatuses = this.#statuses;
        const change = this.changestatusCallback;

        opt1.onchange = function(){change(1,"tull");};

    /*    opt1.addEventListener(`click`,function(){
            console.log("opt1");
            change(1,"tull");
        });
    */    opt2.addEventListener(`click`, this.testWindow);
        opt3.addEventListener(`click`,function(){
            console.log("opt3");
            change(newtask.id,tempStatuses[2]);
        });

        statusOptions.add(opt0);
        statusOptions.add(opt1);
        statusOptions.add(opt2);
        statusOptions.add(opt3);

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


    
   #updateTask(status){
        const content = this.#shadow.querySelector('div')
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
       const button = document.querySelector("button");
       console.log("heiBox");
       console.log(button);
       button.addEventListener('click', this.addtaskCallback.bind(this));
   }

    addtaskCallback(event){

        event.preventDefault();
        this.message = "";

        this.#callbacks.forEach(method => { method() });

    }

    testWindow(){
        window.confirm("heisann");
    }

    changestatusCallback(id,newstatus){
        console.log("status change hei");
        const conf = window.confirm("something");

    //   if (
      //     window.confirm("Set " +  + " to " +  + " ?")){
     //   if(conf){
           this.#callbacks.forEach(method => { method(id,newstatus) });
           console.log("confirmed");
    //    }
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
function func(){
    console.log("hei")
}
