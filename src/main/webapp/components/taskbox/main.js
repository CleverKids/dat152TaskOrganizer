export default class extends HTMLElement {
    #shadow
    #statuses
    #callbacks = new Map();
    #callbackId = 0;

    constructor() {
        super();

        this.#shadow = this.attachShadow({ mode: 'open' });

    //    const button = document.querySelector("button");
        console.log("heiBox");
    //    console.log(button);
    //    button.addEventListener('click', this.show.bind(this));

    }

    setAddTaskHandler(method) {
        this.#callbacks.set(this.#callbackId, method);
        const prevId = this.#callbackId;
        ++this.#callbackId;
        console.log("set handler hei")
        return prevId;
    }


    #createHTML() {
        const wrapper = document.createElement('div');

        const content = `
        <dialog>
            <form  id="taskForm" method="dialog">
            <fieldset>
            <div>
                <p><label for="title">Title:
                        <input type="text" id="title" name="title">
                    </label>
                    <label for="status">Status:</label>      
                        <select id="status" name="status">
                            <option value=${this.#statuses[0]}>${this.#statuses[0]}</option>
                            <option value=${this.#statuses[1]}>${this.#statuses[1]}</option>
                            <option value=${this.#statuses[2]}>${this.#statuses[2]}</option>
                        </select>
                    
                   
                    <button type="submit" id="addB">Add task</input>
                </p>
                </div>  
                </fieldset>
            </form>
        </dialog>
        `

        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);

        return wrapper;
    }

    show() {
        const box = this.#shadow.querySelector("dialog");
        box.showModal();
    }

    setStatuseslist(list) {
//      responsestatus sjekk  
//        this.#statuses = JSON.stringify(list);
        this.#statuses = list.allstatuses;    
        console.log(this.#statuses);
        this.#createHTML();

        const form = this.#shadow.getElementById("taskForm");
        console.log(form.toString);
        console.log("form hei");
        form.addEventListener('submit', this.#newtaskCallback.bind(this));

/*
        const submit = this.#shadow.getElementById("addB");
        submit.addEventListener('click', this.#newtaskCallback.bind(this));
        */

    }
/*
    #newtaskCallback(callback) {
        const addTB = this.#shadow.getElementById("addB");
        addTB.addEventListener('click', callback.bind(this));
        //sikkert ikke helt rett
    }
*/

    #newtaskCallback(event) {
        event.preventDefault();
        this.message = "";

        console.log("newtask hei")
        console.log(event.target);

        const task = {};
        const formData = new FormData(event.target);

        for (let pair of formData) {
            task[pair[0]] = pair[1].trim();
        }


        console.log(JSON.stringify(task));
        console.log(task.title);
        console.log(task.status);

        this.#callbacks.forEach(method => { method(task) });
    }




    close() {
        const box = this.#shadow.querySelector("dialog");
        box.close();
    }
}