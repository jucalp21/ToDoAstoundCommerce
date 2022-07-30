// Eliminar una tarea
// Editar la descripcion de una tarea

import Utils from "./utils.js";
import Task from "./task.js";
export default class IndexPage {

	private addButtonElement: HTMLButtonElement;
	private taskInputElement: HTMLInputElement;
	private ulTaskContainerEl: HTMLUListElement;
	private utilsObj: Utils;

	constructor() {
		this.addButtonElement = document.getElementById('add_button') as HTMLButtonElement;
		this.taskInputElement = document.getElementById('new-task-title') as HTMLInputElement;
		this.ulTaskContainerEl = document.getElementById('list') as HTMLUListElement;
		this.utilsObj = new Utils();

		this.addButtonElement.addEventListener('click', this.addTask.bind(this));
		this.ulTaskContainerEl.addEventListener('click', this.completeTask.bind(this));
		this.renderTasks();
	}

	private addTask(e: Event): void {

		let taskName = this.taskInputElement.value;

		if(taskName !== '') {
			let task = new Task(taskName);
			this.utilsObj.addTask(task);
			this.renderTasks();
		} else {
			alert('Debes ingresar un titulo valido para la tarea')
		}


	}

	private renderTasks(): void {
		
		this.clearCointainer();
		const tasks: Array<Task> = this.utilsObj.getTasks();

		tasks.forEach(task => {

			const labelElement: HTMLLabelElement = document.createElement('label');
			const inputElement: HTMLInputElement = Object.assign(document.createElement('input'), { type: 'checkbox', value: task.taskId, checked: task.taskIsCompleted });
			inputElement.className = 'toggleTask';
			const liElement: HTMLLIElement = Object.assign(document.createElement('li'), { className: `${task.taskIsCompleted ? 'completed' : null}` });


			labelElement.appendChild(inputElement);
			labelElement.insertAdjacentText('beforeend', task.taskName);
			liElement.appendChild(labelElement);
			liElement.innerHTML += `
			<button style="margin-right: 20px; margin-top: 20px;" class="btn-delete" id="${task.taskId}">
			🗑 Delete
			</button>
			<button style="margin-right: 20px; margin-top: 20px;" class="btn-edit" id="${task.taskId}" style>
			🖉 Edit
			</button>			
			`
			this.ulTaskContainerEl.appendChild(liElement);
			
		});

	};

	private clearCointainer():void {
		this.ulTaskContainerEl.innerHTML = '';
	};

	private completeTask(e: Event): void {

		const clickedElement: any = e.target;
		if(clickedElement.tagName === 'INPUT') {
			if(clickedElement.className === 'toggleTask'){
				console.log('toggleTask');
				this.utilsObj.toggleTaskStatus(+clickedElement.value);
			};
		};
		
		if(clickedElement.tagName === 'BUTTON'){
			if(clickedElement.className === 'btn-delete'){
				let idOfTask: number = clickedElement.id;
				this.utilsObj.deleteTask(idOfTask);
				this.renderTasks();
			}

			if(clickedElement.className === 'btn-edit'){
				let idOfTask: number = clickedElement.id;
				let newText = this.taskInputElement.value;
				if(newText){
					this.utilsObj.editTask(idOfTask,newText);
					this.renderTasks();

				} else {
					alert('The edit field is empty');
				}
			}
		};

		this.renderTasks();

	};


}