import TaskList from '../components/tasklist/main.js';
import TaskBox from '../components/taskbox/main.js';
customElements.define('task-list', TaskList);
customElements.define('task-box', TaskBox);

console.log("heiTasks1");


export default class extends HTMLElement {

    #shadow

    constructor(){
    super();
        this.#shadow = this.attachShadow({ mode: 'open' });


    console.log("heiTasks2");

      this.#shadow.querySelector("task-box").setAddTaskHandler(this.#addTask.bind(this));
      this.#shadow.querySelector("task-list").setDeleteTaskHandler(this.#deleteTask.bind(this));
}


    async #init() {
        const url = "../TaskServices/api/services";
        const taskbox = this.#shadow.querySelector("task-box");
        const tasklist = this.#shadow.querySelector("task-list");

        const statuslistResponse = await fetch(url + "/allstatuses", {method: "GET"});
        const statuslistResult = await statuslistResponse.json();
        taskbox.setStatuseslist(statuslistResult);

        const tasklistResponse = await fetch(url + "/tasklist", {method: "GET"});
        const tasklistResult = await tasklistResponse.json();
        tasklist.setStatuseslist(tasklistResult);
}


async #addTask(task) {
    console.log(JSON.stringify(task));
    const requestSettings = {
        "method": "POST",
        "headers": { "Content-Type": "application/json; charset=utf-8" },
        "body": JSON.stringify(task),
        "cache": "no-cache",
        "redirect": "error"
    };

    try {
        const response = await fetch("http://localhost:8080/TaskServices/api/services/task", requestSettings);
        if (response.ok) {
            const object = await response.json();

            if (typeof object.responseStatus != "undefined") {
                if (object.responseStatus) {
                    const tasklist = this.#shadow.querySelector("task-list");
                    tasklist.showTask(object.task);
                } else {
                    console.log("Could not connect to server");
                }
            } else {
                console.log("Could not connect to server");
            }
        }
    } catch (e) {
        console.log("Could not connect to server");
    }
}

async #updateTask(taskId, newStatus) {
    const requestSettings = {
        "method": "PUT",
        "headers": {"Content-Type": "application/json; charset=utf-8"},
        "body": JSON.stringify(newStatus),
        "cache": "no-cache",
        "redirect": "error"
    };

    try {
        const response = await fetch(`http://localhost:8080/TaskServices/api/services/task/${taskId}`, requestSettings);
        if (response.ok) {
            const object = await response.json();

            if (typeof object.responseStatus != "undefined") {
                if (object.responseStatus) {
                    const tasklist = this.#shadow.querySelector("task-list");
                    tasklist.updateTask(object.task);
                } else {
                    console.log("Could not connect to server");
                }
            } else {
                console.log("Could not connect to server");
            }
        }
    } catch (e) {
        console.log("Could not connect to server");
    }
}

    async #deleteTask(taskId)
    {
        try {
            const response = await fetch(`http://localhost:8080/TaskServices/api/services/task/${taskId}`, {"method": "DELETE"});
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        const tasklist = this.#shadow.querySelector("task-list");
                        tasklist.removeTask(object.id);
                    } else {
                        console.log("Could not connect to server");
                    }
                } else {
                    console.log("Could not connect to server");
                }
            }
        } catch (e) {
            console.log("Could not connect to server");
        }
    }
}