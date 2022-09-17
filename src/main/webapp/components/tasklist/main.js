export default class extends HTMLElement {
    #shadow;
    
    constructor(){
        super();
        
        this.#shadow = this.attachShadow({mode: 'closed'});
        this.#createHTML();
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
    }
    
    #createHTML() {
        const wrapper = document.createElement('div');
        
        const content = `
        <table id = "tasktable">
            <th>Task</th>
            <th>Status</th>
        </table>
        `
        wrapper.insertAdjacentHTML('beforeend',content);
        this.#shadow.appendChild(wrapper);
        
        return wrapper;
    }
//    #showTask(newtask){
//        const wrapper = document.createElement('div');
//        const content = `
//            <p>
//                new task ${JSON.stringify(newtask)}
//            </p>
//        `;
//        
//        wrapper.insertAdjacentHTML('beforebegin', content);
//        this.#shadow.appendChild(wrapper);
//        return wrapper;
//    }
    
//    #updateTask(status){
//        const content = this.#shadow.querySelector('div')
//    }
//    
//    #removeTask(id){
//        
//    }
//    
//    #setStatuseslist(statuslist){
//        
//    }
//    
//    #enableaddtask(){
//        
//    }
//    
//    #addtaskCallback(){
//        
//    }
//    
//    #changestatusCallback(id, newstatus){
//        
//    }
//    
//    #deletetaskCallback(id){
//        
//    }
//    
//    #noTask(){
//        
//    }
}