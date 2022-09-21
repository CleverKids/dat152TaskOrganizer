export default class extends HTMLElement {
    #shadow
    #statuses
    #callbacks = new Map();
    #callbackId = 0;

    constructor() {
        super();
        this.#shadow = this.attachShadow({mode: 'closed'});
    }

    setAddTaskHandler(method) {
        this.#callbacks.set(this.#callbackId, method);
        const prevId = this.#callbackId;
        ++this.#callbackId;
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
        this.#statuses = list.allstatuses;
        this.#createHTML();

        const form = this.#shadow.getElementById("taskForm");
        form.addEventListener('submit', this.#newtaskCallback.bind(this));
    }

    #newtaskCallback(event) {
        event.preventDefault();
        this.message = "";

        const task = {};
        const formData = new FormData(event.target);

        for (let pair of formData) {
            task[pair[0]] = pair[1].trim();
        }

        this.#callbacks.forEach(method => {
            method(task)
        });
    }

    close() {
        const box = this.#shadow.querySelector("dialog");
        box.close();
    }
}