import TaskList from '../components/tasklist/main.js';
import TaskBox from '../components/taskbox/main.js';
customElements.define('task-list', TaskList);
customElements.define('task-box', TaskBox);

const url = "../TaskServices/api/services";
const taskbox = document.querySelector("task-box");
const tasklist = document.querySelector("task-list");

const statuslistResponse = await fetch(url + "/allstatuses", {method: "GET"}); 
const statuslistResult = await statuslistResponse.json();
if(statuslistResult.responseStatus === true) {
    taskbox.setStatuseslist(statuslistResult);
    tasklist.setStatuseslist(statuslistResult);
}

const tasklistResponse = await fetch(url + "/tasklist", {method: "GET"});
const tasklistResult = await tasklistResponse.json();
if(tasklistResult.responseStatus === true) {
    tasklistResult.tasks.forEach(tasklist.showTask);
}