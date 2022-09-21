export default class extends HTMLElement {
    #shadow;
    #callbacks = new Map();
    #callbackId = 0;
    #addcallbackId = 0;
    #changecallbackId = 0;
    #deletecallbackId = 0;
    #statuses;

    constructor() {
        super();

        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#createHTML();
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
         <p id="waitingMsg">
            Waiting for server data
        </p>
        <button type="button" id="addTaskBtn" disabled>New task</button>
        `
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);

        return wrapper;
    }

    showTask(newtask) {
        const table = this.#shadow.getElementById("tasktable");
        if (table.hidden === true) {
            table.hidden = false;
            this.#shadow.getElementById("noTaskMsg").hidden = true;
        }

        const row = table.insertRow(1);


        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.id = newtask.id;
        remove.addEventListener('click', () => {
            this.deletetaskCallback(newtask.id)
        });

        const statusOptions = document.createElement("select");
        statusOptions.id = newtask.id;

        const opt0 = document.createElement("option");
        const opt1 = document.createElement("option");
        const opt2 = document.createElement("option");
        const opt3 = document.createElement("option");

        opt0.text = "Modify";
        opt1.text = this.#statuses[0];
        opt2.text = this.#statuses[1];
        opt3.text = this.#statuses[2];

        opt0.disabled = true;
        opt0.hidden = true;
        opt0.selected = true;

        const tempStatuses = this.#statuses;
        const change = this.changestatusCallback;

        statusOptions.add(opt0);
        statusOptions.add(opt1);
        statusOptions.add(opt2);
        statusOptions.add(opt3);

        statusOptions.addEventListener('change',
            () => this.changestatusCallback(newtask.id,
                statusOptions.options[statusOptions.selectedIndex].text));

        const idColumn = row.insertCell(0);
        const titleColumn = row.insertCell(1);
        const statusColumn = row.insertCell(2);
        const modifyColumn = row.insertCell(3);
        const buttonColumn = row.insertCell(4);

        idColumn.textContent = newtask.id;
        idColumn.hidden = true;
        titleColumn.textContent = newtask.title;
        statusColumn.textContent = newtask.status;
        modifyColumn.append(statusOptions);
        buttonColumn.append(remove);
    }

    updateTask(status) {
        const id = status.id;
        const newStatus = status.status;
        const table = this.#shadow.getElementById("tasktable");

        if (table.rows.length > 1) {
            for (let i = 1; i < table.rows.length; i++) {
                if (table.rows[i].cells[0].innerHTML == id) {
                    table.rows[i].cells[2].innerHTML = newStatus;
                    break;
                }
            }
        }
    }

    removeTask(id) {

        const table = this.#shadow.getElementById("tasktable");
        if (table.rows.length > 1) {
            let row_remove = 0, found = 0;

            for (let i = 1; i < table.rows.length; i++) {
                if (table.rows[i].cells[0].innerHTML == id) {
                    row_remove = i;
                    found = 1;
                    break;
                }
            }

            if (found) {
                table.deleteRow(row_remove);
                if (table.rows.length < 1) {
                    noTask();
                }
            }
        }
    }

    setStatuseslist(statuslist) {
        this.#statuses = statuslist.allstatuses;
    }

    enableaddtask() {
        let deleteWaitMsg = this.#shadow.getElementById("waitingMsg");
        deleteWaitMsg.hidden = true;

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
        <div id="noTaskMsg" hidden><p>No tasks were found.</p></div>
        </form>
        `
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);

        const button = this.#shadow.getElementById("addTaskBtn");
        button.disabled = false;
        button.addEventListener('click', this.addtaskCallback.bind(this));
    }

    addtaskCallback(event) {
        event.preventDefault();
        this.message = "";

        const met = this.#callbacks.get(this.#addcallbackId);
        met();
    }

    changestatusCallback(id, newstatus) {
        const newstatusJSON = {};
        newstatusJSON.status = newstatus;

        const table = this.#shadow.getElementById("tasktable");
        if (table.rows.length > 1) {
            let row_find = 0, found = 0;

            for (let i = 1; i < table.rows.length; i++) {
                if (table.rows[i].cells[0].innerHTML == id) {
                    row_find = i;
                    found = 1;
                    break;
                }
            }

            if (found) {
                if (confirm("Set \"" + table.rows[row_find].cells[1].innerHTML + "\" to " + newstatus)) {
                    const met = this.#callbacks.get(this.#changecallbackId);
                    met(id, newstatusJSON);
                }
            }
        }


    }

    deletetaskCallback(id) {
        const table = this.#shadow.getElementById("tasktable");
        if (table.rows.length > 1) {
            let row_find = 0, found = 0;

            for (let i = 1; i < table.rows.length; i++) {
                if (table.rows[i].cells[0].innerHTML == id) {
                    row_find = i;
                    found = 1;
                    break;
                }
            }

            if (found) {
                if (confirm("Delete task \'" + table.rows[row_find].cells[1].innerHTML + "\'?")) {
                    const met = this.#callbacks.get(this.#deletecallbackId);
                    met(id);
                }
            }
        }
    }

    noTask() {
        const table = this.#shadow.getElementById("tasktable");
        table.hidden = true;

        this.#shadow.getElementById("noTaskMsg").hidden = false;
    }
}
