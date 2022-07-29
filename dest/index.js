// Eliminar una tarea
// Editar la descripcion de una tarea
import Utils from "./utils.js";
import Task from "./task.js";
export default class IndexPage {
    constructor() {
        this.addButtonElement = document.getElementById('add_button');
        this.taskInputElement = document.getElementById('new-task-title');
        this.ulTaskContainerEl = document.getElementById('list');
        this.utilsObj = new Utils();
        this.addButtonElement.addEventListener('click', this.addTask.bind(this));
        this.ulTaskContainerEl.addEventListener('click', this.completeTask.bind(this));
        this.renderTasks();
    }
    addTask(e) {
        let taskName = this.taskInputElement.value;
        if (taskName !== '') {
            let task = new Task(taskName);
            this.utilsObj.addTask(task);
            this.renderTasks();
        }
        else {
            alert('Debes ingresar un titulo valido para la tarea');
        }
    }
    renderTasks() {
        this.clearCointainer();
        const tasks = this.utilsObj.getTasks();
        tasks.forEach(task => {
            const labelElement = document.createElement('label');
            const inputElement = Object.assign(document.createElement('input'), { type: 'checkbox', value: task.taskId, checked: task.taskIsCompleted });
            const liElement = Object.assign(document.createElement('li'), { className: `${task.taskIsCompleted ? 'completed' : null}` });
            labelElement.appendChild(inputElement);
            labelElement.insertAdjacentText('beforeend', task.taskName);
            liElement.appendChild(labelElement);
            this.ulTaskContainerEl.appendChild(liElement);
        });
    }
    clearCointainer() {
        this.ulTaskContainerEl.innerHTML = '';
    }
    completeTask(e) {
        const clickedElement = e.target;
        if (clickedElement.tagName === 'INPUT') {
            this.utilsObj.toggleTaskStatus(+clickedElement.value);
        }
        this.renderTasks();
    }
}
