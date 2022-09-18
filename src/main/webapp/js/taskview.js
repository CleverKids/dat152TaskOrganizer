import TaskList from '../components/tasklist/main.js';
import TaskBox from '../components/taskbox/main.js';
customElements.define('task-list', TaskList);
customElements.define('task-box', TaskBox);

console.log("heiTasksview1");


    console.log("heiTasksview2");
       // let shadow = this.attachShadow({ mode: 'open' });


        console.log("heisann");




        const url = "../TaskServices/api/services";
        const taskbox = document.querySelector("task-box");
        const tasklist = document.querySelector("task-list");
        console.log(taskbox);
        const statuslistResponse = await fetch(url + "/allstatuses", {method: "GET"});
        const statuslistResult = await statuslistResponse.json();
        taskbox.setStatuseslist(statuslistResult);
        tasklist.setStatuseslist(statuslistResult);

        const tasklistResponse = await fetch(url + "/tasklist", {method: "GET"});
        const tasklistResult = await tasklistResponse.json();

        if(tasklistResult.responseStatus === true) {
        //    tasklistResult.tasks.forEach(JSON.parse(tasklist.showTask));
            tasklistResult.tasks.forEach(t => console.log(JSON.stringify(t)));
            tasklistResult.tasks.forEach(t => tasklist.showTask(t));
        }


    //    updateTaskList()

        taskbox.setAddTaskHandler(addTask.bind(this));

        tasklist.setDeleteTaskHandler(deleteTask.bind(this));

//        const tasklistResponse = await fetch(url + "/tasklist", {method: "GET"});
//        const tasklistResult = await tasklistResponse.json();


/*       async function updateTaskList(){
           const tasklistResponse = await fetch(url + "/tasklist", {method: "GET"});
           const tasklistResult = await tasklistResponse.json();

         if(tasklistResult.responseStatus === true) {
               //    tasklistResult.tasks.forEach(JSON.parse(tasklist.showTask));
               tasklistResult.tasks.forEach(t => console.log(JSON.stringify(t)));
               tasklistResult.tasks.forEach(t => tasklist.showTask(t));
           }
        }*/

       async function addTask(task) {
           console.log("hei1");
        const requestSettings = {
            "method": "POST",
            "headers": { "Content-Type": "application/json; charset=utf-8" },
            "body": JSON.stringify(task),
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch(url+ "/task", requestSettings);
            console.log("hei2");
            if (response.ok) {
                const object = await response.json();

                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        const tasklist = document.querySelector("task-list");
                        console.log("hei3");
                    //    updateTaskList();
                    //    document.reload();
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

    async function updateTask(taskId, newStatus) {
        const requestSettings = {
            "method": "PUT",
            "headers": {"Content-Type": "application/json; charset=utf-8"},
            "body": JSON.stringify(newStatus),
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch(url+`/task/${taskId}`, requestSettings);
            if (response.ok) {
                const object = await response.json();

                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        const tasklist = document.querySelector("task-list");
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

    async function deleteTask(taskId)
    {
        try {
            const response = await fetch(url+`/task/${taskId}`, {"method": "DELETE"});
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        const tasklist = document.querySelector("task-list");
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