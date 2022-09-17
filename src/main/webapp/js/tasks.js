import TaskList from '../components/tasklist/main.js';
import TaskBox from '../components/taskbox/main.js';
customElements.define('task-list', TaskList);
customElements.define('task-box', TaskBox);

const url = "../TaskServices/api/services";
const taskbox = document.querySelector("task-box");
const tasklist = document.querySelector("task-list");

const response = await fetch("../TaskServices/api/services/allstatuses", {method: "GET"});
const result = await response.json();
taskbox.setStatuseslist(result);
