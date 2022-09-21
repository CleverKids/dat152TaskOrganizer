import TaskList from '../components/tasklist/main.js';
import TaskBox from '../components/taskbox/main.js';
customElements.define('task-list', TaskList);
customElements.define('task-box', TaskBox);

console.log("heiTasksview1");

        const url = "../TaskServices/api/services";

        const taskbox = document.querySelector("task-box");
        const tasklist = document.querySelector("task-list");
        console.log("box:" + taskbox);
        const statuslistResponse = await fetch(url + "/allstatuses", {method: "GET"});
        const statuslistResult = await statuslistResponse.json();

        taskbox.setStatuseslist(statuslistResult);
        tasklist.setStatuseslist(statuslistResult);

        tasklist.enableaddtask();
        taskbox.setAddTaskHandler(addTask.bind(this));
        tasklist.setDeleteTaskHandler(deleteTask.bind(this));
        tasklist.setNewTaskHandler(showTaskBox.bind(this));
        tasklist.setUpdateTaskHandler(updateTask.bind(this));

        const tasklistResponse = await fetch(url + "/tasklist", {method: "GET"});
        const tasklistResult = await tasklistResponse.json();

        if(tasklistResult.responseStatus === true) {
            tasklistResult.tasks.forEach(t => tasklist.showTask(t));
        }

function showTaskBox(){
    taskbox.show();
}

        async function addTask(task) {
        const requestSettings = {
            "method": "POST",
            "headers": { "Content-Type": "application/json; charset=utf-8" },
            "body": JSON.stringify(task),
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch(url+"/task", requestSettings);
            if (response.ok) {
                const object = await response.json();

                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        taskbox.close();
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

    async function updateTask(taskId,newStatus) {
        const requestSettings = {
            "method": "PUT",
            "headers": {"Content-Type": "application/json; charset=utf-8"},
            "body": JSON.stringify(newStatus),
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch(url+"/task/" + taskId, requestSettings);
            if (response.ok) {
                const object = await response.json();

                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                       tasklist.updateTask(object);
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

    async function deleteTask(taskId)

    {
        console.log("about to delete:" + taskId + "!");

        const requestSettings = {
            "method": 'DELETE',
            "headers": {"Content-Type": "application/json; charset=utf-8"},
            "body": "",
            "cache": "no-cache",
            "redirect": "error"
        };
        try {
            const response = await fetch(url+"/task/" + taskId, requestSettings);
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        tasklist.removeTask(object.id);
                        console.log("deleted task: " + taskId);
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