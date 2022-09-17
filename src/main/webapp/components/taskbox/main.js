export default class extends HTMLElement {
    #shadow
    #statuses

    constructor() {
        super();
        
        this.#shadow = this.attachShadow({ mode: 'open' });

        const button = document.querySelector("button");
        button.addEventListener('click', this.#show.bind(this));
    }

    #createHTML() {
        const wrapper = document.createElement('div');

        const content = `
        <dialog>
            <form method="dialog">
                <p><label for="title">Title:
                        <input type="text" id="title" name="title">
                    </label>
                    <label for="status">Status:      
                        <select>
                            <option>${this.#statuses[0]}</option>
                            <option>${this.#statuses[1]}</option>
                            <option>${this.#statuses[2]}</option>
                        </select>
                    </label>
                </p>
                <div>
                    <button id="addB">Add task</button>
                </div>
            </form>
        </dialog>
        `

        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);

        return wrapper;
    }

    #show() {
        const box = this.#shadow.querySelector("dialog");
        box.showModal();
    }

    setStatuseslist(list) {
//      responsestatus sjekk  
//        this.#statuses = JSON.stringify(list);
        this.#statuses = list.allstatuses;    
        console.log(this.#statuses);
        this.#createHTML();
    }

    #newtaskCallback(callback) {
        const addTB = this.#shadow.getElementById("addB");
        addTB.addEventListener('click', callback.bind(this));
        //sikkert ikke helt rett
    }

    #close() {
        const box = this.#shadow.querySelector("dialog");
        box.close();
    }
}